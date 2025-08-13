const authHeader = () => {
  const token = localStorage.getItem('auth-token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const api = {
  async signUp({ name, email, password }) { const r = await fetch('/api/auth/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password})}); if(!r.ok) throw new Error(); return r.json() },
  async signIn({ email, password }) { const r = await fetch('/api/auth/signin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); if(!r.ok) throw new Error(); return r.json() },

  async getProducts() { const r=await fetch('/api/products'); if(!r.ok) throw new Error(); return r.json() },
  async createProduct(payload) { const r=await fetch('/api/products',{method:'POST',headers:{'Content-Type':'application/json',...authHeader()},body:JSON.stringify(payload)}); if(!r.ok) throw new Error(); return r.json() },
  async updateProduct(id, payload) { const r=await fetch(`/api/products/${id}`,{method:'PUT',headers:{'Content-Type':'application/json',...authHeader()},body:JSON.stringify(payload)}); if(!r.ok) throw new Error(); return r.json() },
  async deleteProduct(id) { const r=await fetch(`/api/products/${id}`,{method:'DELETE',headers:{...authHeader()}}); if(!r.ok) throw new Error(); return r.json() },
  async fetchFromSource(sourceUrl) { const r=await fetch('/api/products/fetch',{method:'POST',headers:{'Content-Type':'application/json',...authHeader()},body:JSON.stringify({sourceUrl})}); if(!r.ok) throw new Error(); return r.json() },

  // Banners
  async getBanners() { const r=await fetch('/api/banners'); if(!r.ok) throw new Error(); return r.json() },
  async createBanner(payload) { const r=await fetch('/api/banners',{method:'POST',headers:{'Content-Type':'application/json',...authHeader()},body:JSON.stringify(payload)}); if(!r.ok) throw new Error(); return r.json() },
  async updateBanner(id, payload) { const r=await fetch(`/api/banners/${id}`,{method:'PUT',headers:{'Content-Type':'application/json',...authHeader()},body:JSON.stringify(payload)}); if(!r.ok) throw new Error(); return r.json() },
  async deleteBanner(id) { const r=await fetch(`/api/banners/${id}`,{method:'DELETE',headers:{...authHeader()}}); if(!r.ok) throw new Error(); return r.json() },

  // User wishlist
  async getMyWishlist() { const r=await fetch('/api/me/wishlist',{headers:{...authHeader()}}); if(!r.ok) throw new Error(); return r.json() },
  async addToMyWishlist(productId) { const r=await fetch('/api/me/wishlist',{method:'POST',headers:{'Content-Type':'application/json',...authHeader()},body:JSON.stringify({productId})}); if(!r.ok) throw new Error(); return r.json() },
  async removeFromMyWishlist(productId) { const r=await fetch(`/api/me/wishlist/${productId}`,{method:'DELETE',headers:{...authHeader()}}); if(!r.ok) throw new Error(); return r.json() },
}
