const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const products = [
  { id: 1, name: "Nike Air Max 270", price: 8999, originalPrice: 12999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", rating: 4.8, category: "Shoes", description: "Lightweight cushioning with Max Air unit for all-day comfort.", badge: "Best Seller", inStock: true },
  { id: 2, name: "Sony WH-1000XM5", price: 24999, originalPrice: 34999, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80", rating: 4.9, category: "Headphones", description: "Industry-leading noise cancellation with 30-hour battery life.", badge: "Top Rated", inStock: true },
  { id: 3, name: "Casio G-Shock GA-2100", price: 9499, originalPrice: 11999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", rating: 4.7, category: "Watches", description: "Carbon core guard structure, shock and vibration resistant.", badge: "Trending", inStock: true },
  { id: 4, name: "Samsung Galaxy S24 Ultra", price: 124999, originalPrice: 139999, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80", rating: 4.8, category: "Mobiles", description: "200MP camera, S Pen included, titanium frame.", badge: "New", inStock: true },
  { id: 5, name: "Apple MacBook Air M3", price: 114900, originalPrice: 124900, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", rating: 4.9, category: "Laptops", description: "18-hour battery, 15.3-inch Liquid Retina display.", badge: "Best Seller", inStock: true },
  { id: 6, name: "Oversized Streetwear Hoodie", price: 2499, originalPrice: 3999, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500&q=80", rating: 4.5, category: "Hoodies", description: "Premium fleece, relaxed fit, perfect for all seasons.", badge: "Offer", inStock: true },
  { id: 7, name: "Kanjivaram Silk Saree", price: 8999, originalPrice: 13999, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80", rating: 4.7, category: "Sarees", description: "Pure silk, handwoven with gold zari borders.", badge: "Trending", inStock: true },
  { id: 8, name: "Leather Crossbody Bag", price: 3499, originalPrice: 5999, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", rating: 4.6, category: "Bags", description: "Genuine leather, multiple compartments, adjustable strap.", badge: "Offer", inStock: true },
  { id: 9, name: "JBL Flip 6 Speaker", price: 11999, originalPrice: 14999, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", rating: 4.7, category: "Speakers", description: "IP67 waterproof, 12-hour playtime, bold JBL Original Pro Sound.", badge: "Popular", inStock: true },
  { id: 10, name: "Dior Sauvage EDP 100ml", price: 8999, originalPrice: 11999, image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&q=80", rating: 4.8, category: "Perfumes", description: "Radiant, wild, and powerfully fresh. A strong and noble woody fragrance.", badge: "Luxury", inStock: true },
  { id: 11, name: "Oversized Graphic T-Shirt", price: 899, originalPrice: 1499, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", rating: 4.4, category: "T-shirts", description: "100% cotton, relaxed fit, screen-printed graphic.", badge: "Offer", inStock: true },
  { id: 12, name: "Canon EOS R50 Camera", price: 61990, originalPrice: 74990, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80", rating: 4.8, category: "Cameras", description: "24.2MP APS-C sensor, 4K video, dual-pixel autofocus.", badge: "New", inStock: true },
  { id: 13, name: "Adidas Ultraboost 23", price: 14999, originalPrice: 17999, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80", rating: 4.7, category: "Shoes", description: "Responsive Boost midsole for energy return with every stride.", badge: "Trending", inStock: true },
  { id: 14, name: "Apple AirPods Pro 2", price: 24900, originalPrice: 26900, image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&q=80", rating: 4.9, category: "Headphones", description: "Active noise cancellation, Adaptive Audio, personalized spatial audio.", badge: "Best Seller", inStock: true },
  { id: 15, name: "OnePlus 12 5G", price: 64999, originalPrice: 74999, image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&q=80", rating: 4.7, category: "Mobiles", description: "Snapdragon 8 Gen 3, Hasselblad cameras, 100W charging.", badge: "Offer", inStock: true },
  { id: 16, name: "Dell XPS 15 OLED", price: 179990, originalPrice: 199990, image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&q=80", rating: 4.8, category: "Laptops", description: "OLED touch display, Intel Core Ultra 9, RTX 4070.", badge: "Premium", inStock: true },
];

let cart = [];
const users = [{ id: 1, email: "demo@store.com", password: "demo123", name: "Demo User" }];

app.get("/api/products", (req, res) => {
  const { category, search, sort } = req.query;
  let result = [...products];
  if (category && category !== "All") result = result.filter(p => p.category === category);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  res.json({ success: true, products: result, total: result.length });
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  res.json({ success: true, product });
});

app.get("/api/categories", (req, res) => {
  const categories = ["All", ...new Set(products.map(p => p.category))];
  res.json({ success: true, categories });
});

app.get("/api/cart", (req, res) => res.json({ success: true, cart, total: cart.reduce((s, i) => s + i.price * i.quantity, 0) }));

app.post("/api/cart/add", (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.quantity += quantity;
  else cart.push({ ...product, quantity });
  res.json({ success: true, cart, message: "Added to cart" });
});

app.put("/api/cart/update", (req, res) => {
  const { productId, quantity } = req.body;
  if (quantity < 1) { cart = cart.filter(i => i.id !== productId); }
  else { const item = cart.find(i => i.id === productId); if (item) item.quantity = quantity; }
  res.json({ success: true, cart, total: cart.reduce((s, i) => s + i.price * i.quantity, 0) });
});

app.delete("/api/cart/remove/:id", (req, res) => {
  cart = cart.filter(i => i.id !== parseInt(req.params.id));
  res.json({ success: true, cart, message: "Removed from cart" });
});

app.delete("/api/cart/clear", (req, res) => { cart = []; res.json({ success: true, message: "Cart cleared" }); });

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
  res.json({ success: true, user: { id: user.id, email: user.email, name: user.name }, token: "demo_token_" + Date.now() });
});

app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ success: false, message: "Email already exists" });
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.json({ success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name }, token: "demo_token_" + Date.now() });
});

app.post("/api/checkout", (req, res) => {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const orderId = "ORD" + Date.now();
  cart = [];
  res.json({ success: true, message: "Order placed successfully!", orderId, total });
});

app.listen(PORT, () => console.log(`🚀 NexShop server running at http://localhost:${PORT}`));
