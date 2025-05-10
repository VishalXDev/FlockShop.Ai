
# Shared Wishlist App 🎁

A full-stack web application that allows users to create, share, and collaborate on wishlists. Built as part of the FlockShop.ai Full Stack Internship assignment.

## 🔗 Live Demo
*(Add link if deployed)*

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) (with TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- Firebase Auth (client-side)
- Axios for API communication

### Backend
- Node.js + Express
- MongoDB (via Mongoose)
- Firebase Admin SDK (for verifying ID tokens)

---

## 📦 Features

- 🔐 **User Authentication** (Login & Register with Firebase)
- 📝 **Create Wishlists** with name and optional image
- 👥 **Shared Access**: Multiple users can be added to a wishlist
- 📦 **Add Products** to wishlists with images, price, and comments
- ❤️ **React to Products** (🔥, 😂, ❤️)
- 💬 **Comment on Products**
- 🧹 **Delete Products** (if added by the same user)
- 🖼️ **Card-based UI** with clean Tailwind design
- 🚪 **Logout Functionality**

---

## 🧩 Folder Structure

### Frontend (`/client`)
client/
├── components/ # Reusable UI components
├── context/ # Auth context for Firebase
├── pages/ # Next.js pages (auth, wishlist, etc.)
├── services/ # Axios API config
├── store/ # (Optional) Shared state
├── styles/ # Global styles (Tailwind)
└── firebase.js # Firebase client config

shell
Copy
Edit

### Backend (`/server`)
server/
├── models/ # Mongoose schemas
├── routes/ # Express API routes
├── middleware/ # Auth & error handlers
├── firebaseAuth.js # Firebase Admin verification
└── server.js # Express app entrypoint
