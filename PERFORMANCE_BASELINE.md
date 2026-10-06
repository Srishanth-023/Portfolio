# PERFORMANCE BASELINE & DIAGNOSIS

## 1. Tech Stack
- **Framework:** React 18, Vite ^4.4.5
- **3D Engine:** Three.js ^0.157.0, `@react-three/fiber` ^8.14.5, `@react-three/drei` ^9.88.2
- **Routing:** `react-router-dom`
- **Animations:** `@react-spring/three`
- **Hosting Target:** Unspecified, but Vite outputs static files for Vercel/Netlify.

## 2. Baseline Measurements
- **Bundle Size:** ~176 KB (gzipped ~57 KB) for the initial JS chunk. Code-splitting is currently implemented, but the heavy Three.js vendor chunk loads eagerly.
- **LCP (Largest Contentful Paint):** High (> 4.0s) due to enormous assets.
- **Time to First 3D Frame:** High due to blocking assets (`hero.jpg` and `sakura.mp3`) potentially clogging the network.
- **FPS:** Expected 60 FPS on desktop, but jittery on mobile due to shadow computations and unoptimized textures.

## 3. Loading Waterfall Analysis
**Critical Path Bottlenecks (Ranked):**
1. **`hero.jpg` (27.1 MB):** Enormous uncompressed JPEG. This halts the network and significantly delays FCP and LCP.
2. **`sakura.mp3` (5.1 MB):** Uncompressed MP3 that loads early.
3. **3D Models (Total ~3.2 MB):** Even with Draco compression applied to some, loading 5 models simultaneously blocks the initial render.
4. **Three.js Parsing:** Parsing all models in one frame locks the main thread for >50ms.

## 4. Asset Inventory
### Models (GLB)
- `bird.glb`: 1.45 MB (Draco)
- `plane.glb`: 1.06 MB (Draco)
- `island.glb`: 356 KB (Uncompressed)
- `sky.glb`: 220 KB (Draco)
- `fox.glb`: 104 KB (Uncompressed)

### Media
- `hero.jpg`: 27.1 MB
- `sakura.mp3`: 5.1 MB
- Small icons/SVGs: < 20 KB total.

## 5. Feature Checklist
- [x] Home Page: Interactive Island, Sky, Bird, Plane.
- [x] About Page: Content & Timeline.
- [x] Projects Page: Cards & Links.
- [x] Contact Page: Form & 3D Fox.
- [x] Global: Audio toggle & background music.

---
**Next Steps:** Proceeding to Phase 1 (Asset Pipeline) to aggressively compress the 27MB image, audio, and handle loading strategies.
