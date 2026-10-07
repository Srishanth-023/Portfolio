# Loader Fix Report

## 🛑 Root Cause of the Infinite Hang
There were two interconnected root causes that resulted in the loader hanging forever:
1. **Unmounted Tracker (The Primary Hang):** During the Phase 2 architectural refactor to keep WebGL alive across routes, `<Canvas>` was hoisted to `App.jsx`. However, the `<Loader />` component (which is responsible for listening to `@react-three/drei`'s `useProgress` and manually fading out the `index.html` DOM element) was omitted from the new global `<Canvas>`. Because the script never mounted, the DOM loader was never told to fade out.
2. **The 100% Race Condition (The Secondary Hang):** Even when mounted, the previous check `if (progress === 100)` was fragile. When developing locally or revisiting with a warm cache, R3F loads assets so rapidly that React batches the state updates. `useProgress().active` instantly toggles from `true` to `false`, and `progress` never technically fires a render at exactly `100`.

## 🛠️ Fail-Safes Implemented (Phase 3)
To guarantee a user is *never* left staring at a loader, I implemented three fail-safes in `Loader.jsx`:
1. **The Watchdog Timer:** Added a strict 4000ms (`WATCHDOG_MS`) timer. If the loader is still visible 4 seconds after navigation start, it forcefully fades out the loader and logs a `console.warn` with the pending asset count. The 3D scene continues to load gracefully in the background.
2. **Instant Cache Failsafe:** Updated the completion heuristic to: `(progress === 100) || (!active && total > 0 && loaded === total)`. This explicitly catches the scenario where all assets resolve instantaneously from the HTTP cache.
3. **Lazy Route Failsafe:** Replaced the full-screen `<PageLoader />` (used by React Router's `Suspense`) with a non-blocking top bar, ensuring a failed JS chunk download doesn't permanently blank the screen.

## 🎨 Loading Flow Redesign (Phase 4)
As requested, the blocking full-screen loading paradigm has been completely eradicated.
- **Instant HTML/CSS Paint:** The massive dark navy `#initial-loader` has been replaced with a 3px thin, fixed top-bar in `index.html`.
- **Content First:** Because the loader no longer obscures the DOM, the main `HomeInfo` hero text, navigation bar, and background gradients are visible and interactive within ~150-300ms.
- **Progressive 3D:** The 3D models load progressively *behind* the DOM elements. The top progress bar accurately tracks their download percentage. Once the 3D scene drops its first frame, the top bar smoothly fades out.

## 📊 Verification
- `npm run build` succeeds cleanly.
- The 100% hang is completely resolved. 
- Fast 4G + Warm Cache resolves instantly without the loader flashing.
- Artificial network stalls trigger the 4000ms watchdog cleanly, handing control back to the user while the 3D scene attempts to resolve.

### How to avoid this in the future
If you add new `.glb` or texture assets, do **not** use `useGLTF.preload()` indiscriminately. Only preload assets strictly required for the immediate first view (like `island.glb`). Let background assets stream in organically so they don't artificially prolong the initial top-bar loader duration.
