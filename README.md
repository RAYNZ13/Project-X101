# Project-X101

A **modern, full-stack web application** designed to foster a **global community for thoughtful discussion and learning**, built with **React**, **Vite**, and **Supabase**.

Project-X101 aims to create a seamless user experience by combining **real-time authentication**, **dynamic content rendering**, and a **responsive design**. Users can browse posts, create content, join or explore communities, and interact with other users through comments and likes.

The project is structured for scalability and maintainability, featuring a modular component-based architecture and modern web development practices.

---

## 🚀 Features

- **Authentication & Authorization**

  - Sign in using Google OAuth via Supabase.
  - User session persistence across refreshes.
  - Toast notifications for login/logout events.

- **Post Management**

  - Create, read, and view individual posts.
  - Dynamic rendering of posts using React components.
  - Real-time vote (like) and comment tracking.

- **Community Management**

  - Explore communities or create new ones.
  - Each community has its own posts and discussion threads.

- **Search Functionality**

  - Debounced search to filter posts in real-time.
  - Search results dynamically displayed without page reloads.

- **Responsive & Interactive UI**

  - Mobile-first design with smooth animations.
  - Hero section with animated gradients and Framer Motion effects.
  - Interactive action buttons with hover and focus states.

- **Modern Development Tools**
  - Fast development environment with Vite.
  - Tailwind CSS for rapid styling and responsiveness.
  - Framer Motion for smooth animations.

---

## 📠 Technologies Used

| Layer      | Technology    | Purpose                                     |
| ---------- | ------------- | ------------------------------------------- |
| Frontend   | React         | Component-based UI                          |
| Frontend   | Tailwind CSS  | Responsive, modern styling                  |
| Frontend   | Framer Motion | Smooth animations                           |
| Backend    | Supabase      | Database, authentication, real-time updates |
| Deployment | Vercel        | Hosting and CI/CD                           |

---

## 💾 Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Supabase account and project

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/RAYNZ13/Project-X101.git
   cd Project-X101
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root directory and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📔 Usage

- **Home Page**  
  Displays a hero section with an animated title, search bar, and recent posts.

- **Authentication**  
  Users can sign in via Google OAuth. Once logged in, they can create posts or communities.

- **Posts & Communities**  
  Users can create posts, explore communities, and comment or like other posts.

- **Search**  
  Dynamic search allows filtering posts without page reloads.

---

## 🖼️ Screenshots

**Homepage**  
![Homepage](https://project-x101.vercel.app/)

**Community Page**  
![Community](https://project-x101.vercel.app/communities)

**Post Page**  
![Post](https://project-x101.vercel.app/allPosts)

---

## 🚀 Deployment

- The project is deployed on **Vercel**.
- Make sure to add your Supabase credentials in the **Vercel Environment Variables** section.
- Any changes pushed to the main branch will trigger an automatic redeployment.

---

## 🛠️ Configuration

- **Vite**: Optimized for fast development and production builds.
- **Tailwind CSS**: Utility-first styling framework.
- **React Context API**: Handles authentication and global state.
- **Framer Motion**: Animates page transitions and UI elements.

---

## 🤚 Testing

- Run tests using:
  ```bash
  npm run test
  ```
- Ensure your test environment is correctly set up.

---

## 📚 Documentation & References

- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Vite Docs](https://vitejs.dev/guide/)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Description"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICEN
