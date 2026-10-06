# Codebase Analysis & Feature Checklist

## Stack and Versions
- **Framework:** React 18 (`react`, `react-dom` ^18.2.0) with Vite (`vite` ^4.4.5)
- **3D Library:**
  - `three` (^0.157.0)
  - `@react-three/fiber` (^8.14.5)
  - `@react-three/drei` (^9.88.2)
  - `@react-spring/three` (^9.7.3)
- **Routing:** `react-router-dom` (^6.17.0)
- **Styling:** Tailwind CSS (^3.3.3), PostCSS, custom CSS (`index.css`)
- **State Management:** React local state (`useState`, `useEffect`, `useRef`)
- **Other Dependencies:**
  - `react-vertical-timeline-component` (^3.6.0) for experience timeline
  - `@emailjs/browser` (^3.11.0) for contact form

## Folder Structure
- `public/`: Static assets (favicon, Vite SVG).
- `src/`: Main source code.
  - `assets/`: Images, icons, 3D models (`.glb`), audio (`sakura.mp3`).
  - `components/`: Reusable React components (`Alert`, `CTA`, `Footer`, `HomeInfo`, `Loader`, `Navbar`).
  - `constants/`: Hardcoded data arrays for skills, experiences, projects, socials (`index.js`).
  - `hooks/`: Custom React hooks (`useAlert.js`).
  - `models/`: 3D model components (`Bird`, `Fox`, `Island`, `Plane`, `Sky`).
  - `pages/`: Page-level components (`About`, `Contact`, `Home`, `Projects`).
  - `App.jsx`, `main.jsx`, `index.css`: App entry points and global styling.

## 3D Features
- **Scenes/Canvas:** Main `Canvas` component in `Home` and `Contact` pages.
- **Lighting:** Directional, ambient, point, spot, and hemisphere lights.
- **Models:** 
  - `Island` (interactive rotating 3D environment)
  - `Plane` (biplane model, scales based on screen size)
  - `Bird` (animated bird flying around)
  - `Sky` (rotating skybox background)
  - `Fox` (animated fox in contact page, changes animation states on interaction)
- **Animations:** `@react-spring/three` for smooth transitions, native `useFrame` for continuous rotations (Island, Sky, Bird).
- **Interactions:** Mouse/Touch drag to rotate the island (with momentum/damping), changing cursor states (`cursor-grab`, `cursor-grabbing`).

## Non-3D Features
- **Routing:** Client-side routing with `react-router-dom` (Home, About, Projects, Contact).
- **Navigation:** Persistent `Navbar` component.
- **Music Player:** Toggleable background audio (`sakura.mp3`) with play/pause icon.
- **Preloader:** Fallback `<Loader />` wrapped in `<Suspense>` for 3D model loading.
- **Responsive Design:** 3D model scale and position adjust dynamically via `window.innerWidth` checks. Tailwind for CSS responsiveness.
- **Contact Form:** Integrated with EmailJS, shows custom `Alert` on success/failure.
- **Experience Timeline:** Vertical timeline UI for work history.
- **Project Cards:** Card layouts with links and descriptions.

## Assets
- Models: `bird.glb`, `fox.glb`, `island.glb`, `plane.glb`, `sky.glb`.
- Audio: `sakura.mp3`.
- Images/Icons: Tech stack logos, company logos, project icons, social icons.

## Hard-coded Personal Data to Replace
- **Names/Titles:** Adrian Hajdin, Software Engineer, "Adrian", "JavaScript Mastery"
- **Location:** Croatia 🇭🇷
- **Links/Emails:** `sujata@jsmastery.pro`, GitHub/LinkedIn usernames.
- **Content:** Experience timeline entries, project entries, skills list.
- **Meta/SEO:** `index.html` `<title>`, author in `package.json`.

## FEATURE CHECKLIST
1. [ ] Global: Tailwind CSS styling and theme.
2. [ ] Global: Client-side routing (Home, About, Projects, Contact).
3. [ ] Global: Persistent Navbar with active state highlighting.
4. [ ] Global: Footer with copyright and social links.
5. [ ] Home Page: Full-screen 3D Canvas.
6. [ ] Home Page: Suspense Loader for 3D assets.
7. [ ] Home Page: Interactive Island model (drag to rotate with momentum).
8. [ ] Home Page: Animated Sky model (auto-rotates).
9. [ ] Home Page: Animated Bird model (flies across screen).
10. [ ] Home Page: Animated Plane model (scales/positions based on screen size).
11. [ ] Home Page: Dynamic `HomeInfo` popup based on island rotation stage (4 stages).
12. [ ] Home Page: Toggleable background audio player (Music on/off).
13. [ ] About Page: Hero section with personal intro.
14. [ ] About Page: Skills grid with icons.
15. [ ] About Page: Experience Vertical Timeline component.
16. [ ] Projects Page: Grid of project cards with descriptions and links.
17. [ ] Contact Page: Contact form (Name, Email, Message) using EmailJS.
18. [ ] Contact Page: Form validation and custom Alert component (success/error states).
19. [ ] Contact Page: 3D Fox model that reacts to form focus.
20. [ ] Global: Responsive design logic (mobile/desktop adjustments).
21. [ ] Global: Centralized data file for personal info (No hard-coded text in components).
