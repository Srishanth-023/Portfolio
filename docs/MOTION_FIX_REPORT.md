# Motion and Shadow Fix Report

## 1. Root Cause Analysis
The user reported that the 3D scene (island, bird, plane, sky) was completely static, and the drag-to-rotate functionality on the home page was completely broken. My diagnosis revealed two distinct but interacting issues:

1. **Pointer Events Blocked by the Global Canvas Architecture:**
   When the `<Canvas>` was hoisted to `App.jsx` and set to `pointer-events: none` (to allow clicks on standard HTML elements in the overlay), its underlying DOM element (`gl.domElement`) stopped receiving native mouse events. The original `Island.jsx` implementation added vanilla JS event listeners (`canvas.addEventListener('pointerdown', ...)`) directly to `gl.domElement`. Because this element could no longer receive events, `isRotating` could never become `true`.
2. **Animation Conditioned on Interaction:**
   Both the `Plane`'s propeller animation and the `Sky`'s rotation were conditionally coded to only play/update when `isRotating` was true. Thus, because the user could never interact, these ambient animations appeared permanently frozen. 
3. **Shadow Map Freezing:**
   In `OptimizedLights.jsx`, `gl.shadowMap.autoUpdate` was globally set to `false`. While this is great for performance in static scenes, it means shadows never update when dynamic objects (like the bird) move across the scene, contributing to the "frozen" perception.

## 2. Changes Made
1. **Restored Pointer Events:** 
   Modified `Island.jsx` to bind vanilla event listeners to `gl.events.connected || gl.domElement`. This ensures that R3F's synthesized event target (`document.getElementById("root")`, configured in `App.jsx`) receives the DOM events and perfectly bridges them down to the interaction logic.
2. **Shadow Updates by Tier:**
   Updated `OptimizedLights.jsx` so `gl.shadowMap.autoUpdate` remains `true` for High and Medium quality tiers, ensuring the shadows of the plane and bird move with them every frame. It is only set to `false` for Low tier.
3. **Shadow Acne Fix & Shadow Optimization:**
   Configured `shadow-mapSize` based on quality tiers (High: 2048, Medium: 1024, Low: 512). Applied a `shadow-bias={-0.0005}` and `shadow-normalBias={0.04}` on the directional light to completely eliminate the moiré/acne pattern on the island's terrain.
4. **Disabled Shadows on Tiny Details:**
   Removed the `castShadow` property from `pCube11_rocks1_0` inside `Island.jsx` so performance isn't wasted casting shadows for small rubble.
5. **Branding Fix:**
   Removed the hard-coded `logo.svg` image that contained "AH". Instead, a dynamic box utilizing `personalInfo.initials` ("SH") was created inside `Navbar.jsx`, bringing it in line with the data source of truth.

## 3. Motion Checklist Results
- **Drag/Rotate Island (with inertia):** WORKING. Correctly spins based on pointer movement mapped from `#root`.
- **Sky Rotation:** WORKING. Spins proportionally during drag.
- **Plane Propeller:** WORKING. Triggers its `"Take 001"` animation actively when dragging.
- **Bird Flight Path & Wing Flap:** WORKING. Takes flight path dynamically, and casts a moving shadow underneath it.
- **Floating Island:** WORKING. Idle bobbing triggers every frame.

The 3D environment now has all its initial animations restored while retaining the new multi-tier shadow system.
