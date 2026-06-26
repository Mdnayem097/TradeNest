# 🛍️ TradeNest

TradeNest is a modern multi-vendor marketplace platform where buyers can browse products, sellers can manage their own stores, and administrators can monitor the entire marketplace through a powerful dashboard. The platform provides secure authentication, role-based authorization, Stripe payment integration, and a responsive user experience.

---

## 🚀 Live Website

**Live URL:** https://trade-nest-eosin.vercel.app

---

## 🎯 Project Purpose

The purpose of TradeNest is to create a secure and scalable online marketplace that connects buyers and sellers on a single platform. It includes complete e-commerce functionality such as product management, shopping cart, secure checkout, payment processing, order management, and role-based dashboards.

---

## ✨ Key Features

* 🔐 Secure Authentication using Better Auth & JWT
* 👤 Role-based Dashboard (Admin, Seller, Buyer)
* 🛒 Shopping Cart with Quantity Management
* 💳 Secure Stripe Payment Integration
* 📦 Product CRUD Operations
* 📊 Admin Analytics Dashboard
* 👥 User Profile Update
* ❤️ Wishlist Support
* 🔎 Product Search & Category Filtering
* 📱 Fully Responsive Design
* ⚡ Modern UI with Tailwind CSS
* 🛡️ Protected Routes using Private Route
* ☁️ Image Upload Support (Base64/Image URL)

---

## 🛠️ Technologies Used

### Frontend

* Next.js 15
* React 19
* Tailwind CSS
* Axios
* Better Auth Client
* React Icons
* Recharts
* React Hot Toast
* framer motion

### Backend

* Node.js
* Express.js
* MongoDB
* JWT
* Stripe API
* CORS
* Dotenv

---

## 📦 NPM Packages Used

### Client

```bash
next
react
react-dom
axios
better-auth
react-icons
recharts
react-hot-toast
tailwindcss
framer-motion
```

### Server

```bash
express
mongodb
jsonwebtoken
stripe
cors
dotenv
nodemon
```

---

## ⚙️ Installation

### Clone the repositories

```bash
git clone https://github.com/Mdnayem097/TradeNest

git clone https://github.com/Mdnayem097/TradeNest-Server
```

### Client

```bash
cd tradenest-client

npm install

npm run dev
```

### Server

```bash
cd tradenest-server

npm install

nodemon index.js
```

---

## 🔑 Environment Variables

### Client (.env.local)

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGODB_URI=
BASE_URL=
NEXT_PUBLIC_IMGBB_KEY=
NEXT_PUBLIC_SERVER_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Server (.env)

```env
PORT=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
CLIENT_URL=
NEXT_PUBLIC_BASE_URL=
```

---

## 📁 Project Structure

```plaintext
src/
│
├── app/
│   ├── main/
│   │   ├── about/
│   │   │   └── page.jsx
│   │   ├── cart/
│   │   │   └── page.jsx
│   │   ├── categories/
│   │   │   └── page.jsx
│   │   ├── checkout/
│   │   │   └── page.jsx
│   │   ├── content/
│   │   │   └── page.jsx
│   │   ├── 
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   │   ├── orders/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── platformAnalyze/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── products/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── users/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── page.jsx
│   │   │   ├── buyer/
│   │   │   │   ├── myOrders/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── payments/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── wishlist/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── page.jsx
│   │   │   ├── seller/
│   │   │   │   ├── addProduct/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── analyze/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── displayCard/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── editProduct/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── manageOrder/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── myProducts/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── page.jsx
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── payment-success
│   │   │   └── page.jsx
│   │   ├── products/
│   │   │   └── page.jsx
│   │   ├── profile
│   │   │   └── page.jsx
│   │   ├── register/
│   │       └── page.jsx
│   │   
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...all]/
│   │   │   │   └── route.js
│   │   └── ...
│   │
│   ├── global.css
│   └── not-found.jsx
│   └── page.js
│   └── layout.js
│
├── component/
│   ├── banner.jsx
│   ├── cartContent.jsx
│   ├── featuredProducts.jsx
│   ├── footer.jsx
│   ├── marketplaceStructure.jsx
│   ├── navbar.jsx
│   ├── popularCategories.jsx
│   ├── privateRoute.jsx
│   ├── successStories.jsx
│   └── syntax.jsx
│   ├── dashboard/
│   │   ├── dashboardNavbar.jsx
│   │   ├── dashboardSidebar.jsx
│   │   └── productsCard.jsx
│
├── lib/
│   ├── authClient.js
│   ├── auth.js
│   ├── imageUpload.js
│   └── api/
│       ├── addProduct.js
│       ├── deleteProduct.js
│       ├── getMyProduct.js
│       ├── getSingleProduct.js
│       └── updateProduct.js
```

---

## 👨‍💻 Developed By

**MD Nayem**

Thank you for visiting TradeNest! ⭐ If you like this project, don't forget to give it a star on GitHub.
