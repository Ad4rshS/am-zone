import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../lib/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      async signIn(email, password) {
        const res = await api.signIn({ email, password })
        localStorage.setItem('auth-token', res.token)
        set({ user: res.user, token: res.token, isAuthenticated: true, isAdmin: res.user.role === 'admin' })
        try { await useWishlistStore.getState().loadWishlist() } catch {}
      },
      async signUp(name, email, password) { await api.signUp({ name, email, password }) },
      logout() {
        localStorage.removeItem('auth-token')
        set({ user: null, token: null, isAuthenticated: false, isAdmin: false })
        useWishlistStore.getState().reset()
      },
      updateProfile(userData) { set({ user: { ...get().user, ...userData } }) }
    }),
    { name: 'auth-storage' }
  )
)

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addToCart: (product, quantity = 1) => { const items=[...get().items]; const i=items.findIndex(x=>x.id===product.id); if(i>=0) items[i]={...items[i],quantity:items[i].quantity+quantity}; else items.push({...product,quantity}); set({items}); get().calculateTotal() },
      removeFromCart: (id) => { set({ items: get().items.filter(i=>i.id!==id) }); get().calculateTotal() },
      updateQuantity: (id, q) => { if (q<=0) return get().removeFromCart(id); set({ items: get().items.map(i=>i.id===id?{...i,quantity:q}:i) }); get().calculateTotal() },
      clearCart: () => set({ items: [], total: 0 }),
      calculateTotal: () => { set({ total: get().items.reduce((s,i)=>s+(i.price*i.quantity),0) }) },
      getCartCount: () => get().items.reduce((s,i)=>s+i.quantity,0)
    }),
    { name: 'cart-storage' }
  )
)

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      async loadWishlist() {
        const list = await api.getMyWishlist()
        set({ items: list })
      },
      async addToWishlist(product) {
        await api.addToMyWishlist(product.id)
        set({ items: [...get().items, product].filter((v,i,a)=>a.findIndex(x=>x.id===v.id)===i) })
      },
      async removeFromWishlist(productId) {
        await api.removeFromMyWishlist(productId)
        set({ items: get().items.filter(i=>i.id!==productId) })
      },
      reset() { set({ items: [] }) },
      isInWishlist: (id) => get().items.some(i=>i.id===id),
      getWishlistCount: () => get().items.length
    }),
    { name: 'wishlist-storage' }
  )
)

export const useProductsStore = create(
  persist(
    (set, get) => ({
      products: [],
      heroBanners: [],

      async loadProducts() {
        const list = await api.getProducts()
        // De-duplicate features entries
        const cleaned = list.map(p => ({ ...p, features: Array.isArray(p.features) ? Array.from(new Set(p.features.map(f=>f.trim()).filter(Boolean))) : [] }))
        set({ products: cleaned })
      },
      async loadBanners() { const list = await api.getBanners(); set({ heroBanners: list }) },

      async addProduct(p) { const res = await api.createProduct({ ...p, isActive: p.isActive !== false }); await get().loadProducts(); return res },
      async updateProduct(id, p) { await api.updateProduct(id, { ...p }); await get().loadProducts() },
      async deleteProduct(id) { await api.deleteProduct(id); await get().loadProducts() },
      async toggleProductStatus(id) { const p = get().products.find(x=>x.id===id); await api.updateProduct(id, { ...p, isActive: !p.isActive }); await get().loadProducts() },
      getActiveProducts: () => get().products.filter(p=>p.isActive),
      getProductsByCategory: (cat) => get().products.filter(p=>p.isActive && p.category===cat),

      async addHeroBanner(b) { await api.createBanner({ ...b, isActive: true }); await get().loadBanners() },
      async updateHeroBanner(id, updates) { await api.updateBanner(id, updates); await get().loadBanners() },
      async deleteHeroBanner(id) { await api.deleteBanner(id); await get().loadBanners() },
      getActiveHeroBanners: () => get().heroBanners.filter(b=>b.isActive)
    }),
    { name: 'products-storage' }
  )
)
