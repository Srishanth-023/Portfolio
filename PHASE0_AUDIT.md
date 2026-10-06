# PHASE 0: Codebase Audit & Plan

## Stack & Versions
- **Framework:** React 18 (`react`, `react-dom` ^18.2.0)
- **Bundler:** Vite ^4.4.5
- **3D Ecosystem:** `three` ^0.157.0, `@react-three/fiber` ^8.14.5, `@react-three/drei` ^9.88.2, `@react-spring/three` ^9.7.3
- **Routing:** `react-router-dom` ^6.17.0
- **Styling:** Tailwind CSS ^3.3.3
- **Animation/Interaction:** `@react-spring/three` (transitions), `react-vertical-timeline-component` (experience timeline)

## Scene Graph & 3D Implementation
- **Pages with Canvas:** The main `Canvas` mounts per page (`Home` and `Contact`). The models and camera do not persist across routes natively (they are destroyed and recreated).
- **Lighting:**
  - `directionalLight`, `ambientLight`, `pointLight`, `spotLight`, `hemisphereLight` combined in Home.
  - Hardcoded coordinates, no shadow map configurations enabled currently.
- **Shadows:** No explicit `<shadowMaterial>` or `castShadow`/`receiveShadow` enabled on meshes by default.
- **Audio:** A basic `useRef(new Audio())` implementation in `Home.jsx`. Background music plays continuously but resets between routes. No global audio manager.

## Assets & Bundle Baseline
### Models
- `bird.glb`: 1.63 MB
- `plane.glb`: 1.47 MB
- `island.glb`: 356 KB
- `sky.glb`: 329 KB
- `fox.glb`: 104 KB
**Total Model Size:** ~3.89 MB

### Other Media
- `hero.jpg`: **27.1 MB** (Extremely unoptimized, needs immediate compression/resizing).
- `sakura.mp3`: 5.12 MB

### Bundle Size (JS)
- Main chunk: `1.07 MB` (306 KB gzipped).
No code-splitting implemented (everything loads on the initial chunk).

### Performance Estimate
- **Desktop:** ~60 FPS likely, but initial load will be slow due to 27 MB image and 3.89 MB of uncompressed models.
- **Mobile (4x Throttle):** Potential jitter during model parsing (since Draco is not used).

## FEATURE CHECKLIST (Current State)
- [x] Home Page: Full-screen 3D Canvas.
- [x] Home Page: Suspense Loader for 3D assets.
- [x] Home Page: Interactive Island model (drag to rotate).
- [x] Home Page: Animated Sky, Bird, and Plane.
- [x] Home Page: Dynamic `HomeInfo` popup based on rotation stage.
- [x] Home Page: Background audio player.
- [x] About Page: Skills grid & Experience timeline.
- [x] Projects Page: Grid of project cards.
- [x] Contact Page: Contact form (EmailJS) + 3D Fox model reacting to form focus.
- [x] Global: Responsive design logic.
- [x] Global: Centralized data file used across all components.
