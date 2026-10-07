# Stability and Speed Report

## Phase 1: Bug & Slowness Audit

### 🛑 Critical Severity Bugs (Crashes, Leaks, Context Loss)
1. **Canvas Remounting & WebGL Context Loss:**
   - **Repro:** Navigate from `/` (Home) to `/contact` and back.
   - **Root Cause:** Both `Home.jsx` and `Contact.jsx` return their own independent `<Canvas>` elements. React Router destroys the DOM tree of the previous route, forcing R3F to entirely tear down the WebGL context and reinitialize it on the new route.
   - **Impact:** Massive main-thread lockup (>1000ms), GPU memory thrashing, and jittery transitions.
   - **Planned Fix:** Hoist a single, persistent `<Canvas>` into `App.jsx` that wraps the routing logic, and use R3F's `<View>` or portal system, or manage scene states globally.

2. **Audio Orphan Leak:**
   - **Repro:** Play background music on `/` (Home), then navigate to `/about`.
   - **Root Cause:** The `new Audio()` instance in `Home.jsx` is not paused or cleaned up when the component unmounts.
   - **Impact:** The music plays forever in the background with no way to turn it off, consuming memory.
   - **Planned Fix:** Return a cleanup function `() => audioRef.current?.pause()` inside the `useEffect`.

3. **No Error Boundaries:**
   - **Repro:** Block `island.glb` in DevTools network tab and refresh.
   - **Root Cause:** Missing React Error Boundaries.
   - **Impact:** Unhandled promise rejections inside `<Suspense>` result in a completely blank white screen.
   - **Planned Fix:** Implement a robust fallback UI via `react-error-boundary`.

### ⚠️ Moderate Severity Bugs (Visual, UX, Speed)
4. **Double Loaders & Layout Shifts:**
   - **Repro:** Load the site on a throttled connection.
   - **Root Cause:** The `index.html` static CSS preloader is automatically destroyed the moment React mounts (DOM overwrite). However, the heavy 3D assets haven't loaded yet, so R3F triggers a *second* loader (`Loader.jsx` inside `<Suspense>`). 
   - **Impact:** The user sees a jarring flash of content as the first loader vanishes, leaving an empty canvas or a secondary loader.
   - **Planned Fix:** The `index.html` loader must be explicitly removed by React *only* after `useProgress()` hits 100% and the first frame is painted, ensuring a seamless fade-out.

5. **EmailJS Contact Form Timeout / Double-Submit:**
   - **Repro:** Click submit multiple times quickly while simulating an offline state.
   - **Root Cause:** The `loading` state doesn't fully guard against rapid successive taps before React flushes the state, and network timeouts are not aggressively handled.
   - **Planned Fix:** Hard-disable the button on `onSubmit` immediately, and ensure proper `try/catch` wrapping.

---
**Status:** Phase 2 (Bug Fixes) Complete.

### 🛠️ Phase 2 Fixes Applied
1. **Canvas Remounting:** Hoisted `<Canvas>` to `App.jsx` as a global background layer. Replaced localized Canvases in `Home.jsx` and `Contact.jsx` with `@react-three/drei`'s `<View>` component, which tunnels the WebGL render into the DOM layout without ever destroying the context.
2. **Audio Orphan Leak:** Added a dedicated `useEffect` unmount cleanup in `Home.jsx` that explicitly calls `audioRef.current.pause()` to prevent runaway audio threads on route change.
3. **Error Boundaries & Fallback:** Integrated `react-error-boundary` around the entire Router and Canvas hierarchy. Created a `ErrorFallback.jsx` component that displays a graceful error screen and "Reboot" button if WebGL crashes or an asset promise is rejected.
4. **Double Loader:** Modified `Loader.jsx` to become a "headless" R3F component. It now hooks directly into the DOM (`document.getElementById("initial-loader")`) to drive the progress bar natively, and triggers a CSS `.fade-out` transition only once the WebGL scene is 100% ready and active.
5. **EmailJS Timeout:** Wrapped the `emailjs.send` promise in a `Promise.race` with a strict 10,000ms timeout rejector, ensuring the UI will gracefully error out if the network hangs, instead of spinning forever.
