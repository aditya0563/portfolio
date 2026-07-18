# 🚀 Interactive Apple Ecosystem Web Portfolio
### Real-Time macOS & iOS Operating System Portfolio (React + Tailwind + Framer Motion)

An interactive, web-based operating system simulation that presents a developer portfolio through a dual-interface experience—featuring a full **macOS Desktop workspace** for desktop views and an authentic **iOS iPhone simulator** with hardware bezels for mobile screens.

---

## 🧠 Overview

This project reimagines the classic portfolio website by turning it into a living, tactile operating system. Visitors can drag and resize desktop windows, launch apps, interact with a dynamic top status bar, check real-time system battery metrics, and switch between macOS and iOS views depending on their screen size.

---

## ✨ Features

### 🎯 Viewport Adaptability
* **Desktop View:** Full-screen macOS workstation complete with menu bar, floating widgets, window management, and dock magnification.
* **Mobile View:** Realistic iPhone hardware enclosure with side volume/power buttons, rounded corner bezels, and native iOS layouts.

### 🖥️ macOS Desktop Experience
* **Window Manager:** Draggable, resizable, and focus-layered windows powered by `react-rnd`.
* **TopBar & Dynamic Island:** Live system clock, light/dark mode switcher, and status indicators.
* **Desktop Widgets:** Interactive Weather, Calendar, and Notes widgets.
* **Dock Magnification:** Smooth spring-physics hover animations powered by Framer Motion.

### 📱 iOS Mobile Experience
* **Hardware Frame:** Side physical button accents, rounded screen radii, and realistic depth shadows.
* **Real-Time Battery API:** Syncs directly with `navigator.getBattery()` for live charge levels, lightning bolt charging animations, and low-battery warnings.
* **Interactive Dynamic Island:** Functional status centerpiece and tactile screen locking mechanism with simulated microphone indicator.
* **iOS Home Screen & Dock:** Clean app grid, glassmorphism search pill, notification badges, and smooth app modals (`AnimatePresence`).

### 🔐 Boot & Lock Workflows
* Authentic Apple boot screen loader sequence.
* Swipe-to-unlock and passcode screen interactions.

---

## 🛠️ Tech Stack

### Frontend
* **React.js** (Hooks, `useReducer`, `useCallback`, `useRef`)
* **JavaScript (ES6+)**

### Styling & UI
* **Tailwind CSS** (Glassmorphism, backdrop blurs, custom scrollbars)
* **Lucide React** & Custom SVG Icons

### Animations & Layouts
* **Framer Motion** (Spring physics, layout animations, `AnimatePresence`)
* **react-rnd** (Desktop window dragging & resizing)

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/bikashdalapati-09/ios-portfolio.git
cd ios-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
# or
npm start
```

### 4. Build for Production
```bash
npm run build
```

---


## 🎥 Demo

* **Live Demo:** https://ios-portfolio-chi.vercel.app/ *(Best experienced on a desktop/laptop browser!)*

---

## 🚀 Future Improvements

* Adaptive terminal with working CLI commands (`cat resume`, `ls projects`)
* Custom audio feedback for bootup, window closing, and screen locking
* Multiple high-resolution wallpaper presets
* PWA (Progressive Web App) support for home screen installation

---

## 🤝 Contributing

Feel free to fork this repository and submit a pull request for new apps, widgets, or UI optimizations!

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Biaksh Dalapati**
* **GitHub:** https://github.com/bikashdalapati-09
* **LinkedIn:** https://www.linkedin.com/in/bikashdalapati09/

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
