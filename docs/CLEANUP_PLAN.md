# Cleanup Plan

## A. Things to REMOVE

| Item/Feature | Files Modified/Deleted | How it's wired / Why remove |
| :--- | :--- | :--- |
| **Shadow Quality Tiers & Store** | `src/store.js` (DELETE) <br> `src/App.jsx` (Modified) <br> `src/pages/Home.jsx`, `Contact.jsx` | Quality tier system (`zustand` store) gates visuals. Unnecessary system. We will remove the store and its imports. |
| **Optimized / Extra Shadows** | `src/components/OptimizedLights.jsx` (DELETE) <br> `src/models/*.jsx` (Modified) | Remove `castShadow`, `receiveShadow`, `shadow-mapSize`, `gl.shadowMap` manipulation, and `SoftShadows`. Restore reference lighting (directional, ambient, point, spot, hemisphere). |
| **Tunnel-Rat / Global Canvas** | `src/tunnel.js` (DELETE) <br> `src/App.jsx` (Modified) <br> `src/pages/Home.jsx`, `Contact.jsx` | Canvas was hoisted to App.jsx. This caused context loss and pointer event bugs. Reference uses local `<Canvas>` in `Home.jsx` and `Contact.jsx`. Removing global canvas restores reference architecture and native R3F pointer events. |
| **Unused Dependencies** | `package.json` | `tunnel-rat`, `zustand` will be uninstalled. |

## B. Things to KEEP

| Item/Feature | Files Preserved / Kept | Why Keep |
| :--- | :--- | :--- |
| **Loader Fixes & Fail-safes** | `src/components/Loader.jsx` <br> `src/components/ErrorFallback.jsx` <br> `src/components/PageLoader.jsx` | Non-blocking first load, watchdog timer, and React Error Boundary are explicitly on the keep list. The top-bar HTML loader will be kept. |
| **Performance Assets** | `src/assets/3d/*.glb` | Draco/Meshopt compressed models are on the KEEP list. |
| **Route Code Splitting** | `src/App.jsx` | `lazy()` imports and `Suspense` for routes are on the KEEP list. |
| **DPR Cap** | `src/pages/Home.jsx`, `Contact.jsx` | A sensible DPR cap (`dpr={[1, 2]}`) will be retained on local Canvases as it's non-visual performance work. |
| **Contact Form** | `src/pages/Contact.jsx` | Web3Forms wiring, validation, success/error states must be kept. |
| **Personal Data Source** | `src/constants/index.js` <br> `src/components/Navbar.jsx` | The centralized profile data and dynamic initials (`SH`) in the Navbar. |

## C. Ambiguous / Recommendations

| Item | Recommendation & Reasoning |
| :--- | :--- |
| **Suspense inside Canvas vs Outside** | The reference has `<Suspense>` *inside* the `<Canvas>` with an R3F `<Html>` Loader. However, our current `Loader.jsx` interacts with the DOM (`#initial-loader`) and returns `null`. I recommend keeping our current `Loader.jsx` inside the local `<Canvas>` to preserve the fast non-blocking HTML progress bar instead of reverting to the reference's `Html` spinner, as it better fulfills the "fast, non-blocking first load" requirement. |
| **"Added Visual Features" (Blog, Day/Night)** | These are mentioned in the prompt but do not exist in the current codebase (likely removed previously or from a template prompt). I will grep to ensure they are completely gone, but no action is needed if absent. |
