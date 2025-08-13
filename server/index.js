import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'
import { load as cheerioLoad } from 'cheerio'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { nanoid } from 'nanoid'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

const adapter = new JSONFile('amzone.json')
const db = new Low(adapter, { users: [], products: [], banners: [], userData: [] })
await db.read()
if (!db.data) db.data = { users: [], products: [], banners: [], userData: [] }

if (!db.data.users.find(u => u.email === 'adarsh@amzone.com')) {
  db.data.users.push({ id: nanoid(), name: 'Adarsh Sukumar', email: 'adarsh@amzone.com', password_hash: bcrypt.hashSync('password123',10), role: 'admin' })
  await db.write()
}

const SECRET = 'amzone-secret'

function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' })
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, SECRET)
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

function publicUser(u) { return { id: u.id, name: u.name, email: u.email, role: u.role || 'user' } }

function signToken(u) {
  return jwt.sign({ id: u.id, email: u.email, role: u.role || 'user', name: u.name }, SECRET, { expiresIn: '7d' })
}

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body || {}
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' })
  await db.read()
  const exists = db.data.users.find(u => u.email.toLowerCase() === String(email).toLowerCase())
  if (exists) return res.status(409).json({ error: 'Email already registered' })
  const user = { id: nanoid(), name, email, password_hash: bcrypt.hashSync(password, 10), role: 'user' }
  db.data.users.push(user)
  // initialize per-user data container
  ensureUserData(user.id)
  await db.write()
  const token = signToken(user)
  res.json({ token, user: publicUser(user) })
})

app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'email, password required' })
  await db.read()
  const user = db.data.users.find(u => u.email.toLowerCase() === String(email).toLowerCase())
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = bcrypt.compareSync(password, user.password_hash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const token = signToken(user)
  res.json({ token, user: publicUser(user) })
})

app.get('/api/auth/me', auth, async (req, res) => {
  await db.read()
  const user = db.data.users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).json({ error: 'Not found' })
  res.json({ user: publicUser(user) })
})

function ensureUserData(userId) {
  // Ensure base structure exists even if older DB file lacks userData
  if (!db.data) db.data = { users: [], products: [], banners: [], userData: [] }
  if (!Array.isArray(db.data.userData)) db.data.userData = []
  let ud = db.data.userData.find(u => u.userId === userId)
  if (!ud) {
    ud = { userId, wishlist: [], cart: [] }
    db.data.userData.push(ud)
  }
  return ud
}

function toAbsoluteUrl(url, base) { try { return new URL(url, base).toString() } catch { return url } }
function uniq(arr) { return Array.from(new Set(arr.filter(Boolean))) }

function parseRamRomFromText(text) {
  const ram = []
  const storage = []
  const ramMatches = text.match(/(\d{1,2})\s*GB\s*RAM/gi) || text.match(/RAM\s*(\d{1,2})\s*GB/gi)
  const storageMatches = text.match(/(\d{2,3})\s*GB(?!\s*RAM)/gi) || text.match(/(\d)\s*TB/gi)
  if (ramMatches) ramMatches.forEach(m => { const n=(m.match(/\d+/)||[])[0]; if(n) ram.push(n+'GB') })
  if (storageMatches) storageMatches.forEach(m => { const tb = m.match(/(\d)\s*TB/i); if (tb) storage.push((parseInt(tb[1],10)*1024)+'GB'); else { const n=(m.match(/\d+/)||[])[0]; if(n) storage.push(n+'GB') } })
  return { ram: uniq(ram), storage: uniq(storage) }
}

const defaultHeaders = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36',
  'accept-language': 'en-IN,en;q=0.9',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'upgrade-insecure-requests': '1'
}

async function fetchHtml(url) {
  const resp = await fetch(url, { headers: defaultHeaders, redirect: 'follow' })
  return await resp.text()
}

function extractAmazonImages($, baseUrl) {
  let images = []
  // data-a-dynamic-image JSON map
  const dynAttr = $('#landingImage').attr('data-a-dynamic-image') || $('img[data-a-dynamic-image]').attr('data-a-dynamic-image')
  if (dynAttr) {
    try {
      const jsonStr = dynAttr.replace(/&quot;/g, '"')
      const obj = JSON.parse(jsonStr)
      images = images.concat(Object.keys(obj || {}))
    } catch {}
  }
  // Thumbnails and alt images
  images = images.concat($('#altImages img').map((_,el)=>$(el).attr('src')||$(el).attr('data-src')).get())
  // Script JSON: look for hiRes/large
  $('script').each((_, el) => {
    const txt = $(el).html() || ''
    const hiRes = [...txt.matchAll(/"hiRes"\s*:\s*"(https:[^"]+)"/g)].map(m=>m[1])
    const large = [...txt.matchAll(/"large"\s*:\s*"(https:[^"]+)"/g)].map(m=>m[1])
    images = images.concat(hiRes, large)
  })
  // OG image fallback
  images.push($('meta[property="og:image"]').attr('content'))
  // Normalize
  images = images.map(u => toAbsoluteUrl(u, baseUrl)).filter(u => u && !u.endsWith('_.jpg'))
  return uniq(images)
}

async function fetchProductFromSource(url) {
  // Try desktop first
  let html = await fetchHtml(url)
  let $ = cheerioLoad(html)

  // If interstitial like Continue shopping, attempt mobile URL fallback
  const hasInterstitial = /Continue shopping/i.test(html)
  if (hasInterstitial) {
    const asin = (url.match(/\/dp\/([A-Z0-9]{8,})/i) || [])[1]
    if (asin) {
      const mUrl = `https://www.amazon.in/gp/aw/d/${asin}`
      html = await fetchHtml(mUrl)
      $ = cheerioLoad(html)
    }
  }

  // Base details
  let title = $('meta[property="og:title"]').attr('content') || $('#productTitle').text().trim() || $('span.B_NuCI').text().trim() || $('title').text().trim() || $('h1').first().text().trim()
  if (!title) title = $('h1, h2').first().text().trim()
  let description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || ''

  // Price
  let priceText = $('#corePrice_feature_div .a-price-whole').first().text() || $('#priceblock_ourprice').text() || $('._30jeq3._16Jk6d').first().text() || $('[class*="price"], [id*="price"]').first().text()
  let price = parseInt((priceText && priceText.match(/\d[\d,]*/)||['0'])[0].replace(/,/g,'')) || 0

  // Features
  const rawFeatures = uniq([
    ...$('#feature-bullets li').map((_,el)=>$(el).text().trim()).get(),
    ...$('div._2418kt ul li').map((_,el)=>$(el).text().trim()).get(),
    ...$('ul li').slice(0,20).map((_,el)=>$(el).text().trim()).get()
  ]).filter(Boolean)
  const stopPhrases = [
    'main content','about this item','buying options','compare with similar items','videos','reviews',
    'search','home','orders','add to cart','show/hide shortcuts','keyboard shortcuts','cart','delivery options'
  ]
  const features = rawFeatures
    .map(f=>f.replace(/\s+/g,' ').trim())
    .filter(f => f.length >= 4 && f.length <= 220)
    .filter(f => !stopPhrases.some(s => f.toLowerCase().includes(s)))
    .filter(f => !/(alt\s*\+|shift\s*\+|keyboard|shortcuts)/i.test(f))
    .slice(0,12)

  // Images
  let images = extractAmazonImages($, url)
  if (images.length < 3) {
    // Generic image fallback on any page
    images = uniq(images.concat($('img').slice(0,12).map((_,el)=>$(el).attr('src')).get().map(u=>toAbsoluteUrl(u, url))))
  }

  // Rating and reviews
  let ratingVal = NaN
  const ratingAlt = $('span.a-icon-alt').first().text() || $('#acrPopover').attr('title') || $('div._3LWZlK').first().text()
  if (ratingAlt) {
    const m = ratingAlt.match(/(\d+(?:\.\d+)?)/)
    if (m) ratingVal = parseFloat(m[1])
  }
  if (!ratingVal || isNaN(ratingVal)) ratingVal = 4.5
  // Reviews count: Amazon
  let reviewsCount = 0
  const revText = $('#acrCustomerReviewText').text() || $('#acrCustomerReviewLink').text()
  if (revText) {
    const m = revText.match(/(\d[\d,]*)/)
    if (m) reviewsCount = parseInt(m[1].replace(/,/g,''),10)
  }
  // Flipkart style: "XX,XXX Ratings & X,XXX Reviews"
  if (!reviewsCount) {
    const fx = $('span._2_R_DZ').first().text()
    if (fx) {
      const nums = fx.match(/(\d[\d,]*)/g)
      if (nums && nums.length) {
        const last = nums[nums.length-1]
        reviewsCount = parseInt(last.replace(/,/g,''),10)
      }
    }
  }

  // Variants
  let colorCandidates = uniq([
    ...$('#variation_color_name li img').map((_,el)=>$(el).attr('alt')||$(el).attr('title')).get(),
    ...$('#variation_color_name li').map((_,el)=>$(el).attr('title')||$(el).text().trim()).get(),
    ...$('div:contains("Colour"), div:contains("Color")').find('li, a, button').map((_,el)=>$(el).attr('title')||$(el).text().trim()).get()
  ]).filter(Boolean)
  colorCandidates = colorCandidates
    .map(c=>c.replace(/\s+/g,' ').trim())
    .filter(c => c.length > 1 && c.length < 40)
    .filter(c => !stopPhrases.some(s => c.toLowerCase().includes(s)))
  const sizeCandidates = uniq([
    ...$('#variation_size_name li').map((_,el)=>$(el).attr('title')||$(el).text().trim()).get(),
    ...$('#variation_memory_size_name li').map((_,el)=>$(el).attr('title')||$(el).text().trim()).get(),
    ...$('div:contains("Size"), div:contains("Storage"), div:contains("Memory")').find('li, a, button').map((_,el)=>$(el).attr('title')||$(el).text().trim()).get()
  ]).filter(Boolean)
  const parsed = parseRamRomFromText(title + ' ' + features.join(' '))
  const variants = {
    colors: colorCandidates.slice(0,12),
    ram: parsed.ram.length ? parsed.ram : sizeCandidates.filter(s=>/GB\s*RAM/i.test(s)).map(s=>s.replace(/[^\d]/g,'')+'GB'),
    storage: parsed.storage.length ? parsed.storage : sizeCandidates.filter(s=>/(GB|TB)/i.test(s)).map(s=>s.toUpperCase())
  }
  if (variants.ram.length) variants.ram = uniq(variants.ram)
  if (variants.storage.length) variants.storage = uniq(variants.storage)
  if (variants.colors.length) variants.colors = uniq(variants.colors)

  // Clean description
  if (description) {
    const lines = description.split(/\n|\.\s+/).map(s=>s.trim()).filter(Boolean)
    const filtered = lines.filter(l => !stopPhrases.some(s=>l.toLowerCase().includes(s)) && !/(alt\s*\+|shift\s*\+|keyboard|shortcuts)/i.test(l))
    description = filtered.join('. ')
  }

  return { name: title, image: images[0], images, price, description, features, variants, rating: ratingVal, reviews: reviewsCount }
}

app.post('/api/products/fetch', auth, async (req,res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error:'Forbidden' })
  const { sourceUrl } = req.body
  try { res.json(await fetchProductFromSource(sourceUrl)) }
  catch (e) { res.status(500).json({ error:'Failed to fetch product details' }) }
})

app.get('/api/products', async (req,res) => { await db.read(); res.json(db.data.products) })
app.post('/api/products', auth, async (req,res) => { if (req.user.role!=='admin') return res.status(403).json({ error: 'Forbidden' }); const p=req.body; const newP={ id:nanoid(), ...p }; db.data.products.push(newP); await db.write(); res.json({ id:newP.id }) })
app.put('/api/products/:id', auth, async (req,res) => { if (req.user.role!=='admin') return res.status(403).json({ error: 'Forbidden' }); const id=req.params.id; const i=db.data.products.findIndex(p=>p.id===id); if(i===-1) return res.status(404).json({ error:'Not found' }); db.data.products[i]={...db.data.products[i], ...req.body}; await db.write(); res.json({ ok:true }) })
app.delete('/api/products/:id', auth, async (req,res) => { if (req.user.role!=='admin') return res.status(403).json({ error: 'Forbidden' }); const id=req.params.id; db.data.products=db.data.products.filter(p=>p.id!==id); await db.write(); res.json({ ok:true }) })

// Wishlist (per-user)
app.get('/api/me/wishlist', auth, async (req,res) => {
  await db.read()
  const ud = ensureUserData(req.user.id)
  const products = db.data.products.filter(p => ud.wishlist.includes(p.id))
  res.json(products)
})
app.post('/api/me/wishlist', auth, async (req,res) => {
  const { productId } = req.body
  if (!productId) return res.status(400).json({ error: 'productId required' })
  await db.read()
  const ud = ensureUserData(req.user.id)
  if (!ud.wishlist.includes(productId)) ud.wishlist.push(productId)
  await db.write()
  res.json({ ok: true })
})
app.delete('/api/me/wishlist/:productId', auth, async (req,res) => {
  const { productId } = req.params
  await db.read()
  const ud = ensureUserData(req.user.id)
  ud.wishlist = ud.wishlist.filter(id => id !== productId)
  await db.write()
  res.json({ ok: true })
})

app.get('/api/banners', async (req,res)=>{ await db.read(); res.json(db.data.banners) })
app.post('/api/banners', auth, async (req,res)=>{ if (req.user.role!=='admin') return res.status(403).json({error:'Forbidden'}); const b={ id:nanoid(), ...req.body }; db.data.banners.push(b); await db.write(); res.json({ id:b.id }) })
app.put('/api/banners/:id', auth, async (req,res)=>{ if (req.user.role!=='admin') return res.status(403).json({error:'Forbidden'}); const id=req.params.id; const i=db.data.banners.findIndex(x=>x.id===id); if(i===-1) return res.status(404).json({error:'Not found'}); db.data.banners[i]={...db.data.banners[i],...req.body}; await db.write(); res.json({ok:true}) })
app.delete('/api/banners/:id', auth, async (req,res)=>{ if (req.user.role!=='admin') return res.status(403).json({error:'Forbidden'}); const id=req.params.id; db.data.banners=db.data.banners.filter(x=>x.id!==id); await db.write(); res.json({ok:true}) })

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('API running on http://localhost:'+PORT))
