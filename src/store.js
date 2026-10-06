import { create } from 'zustand';

// Automatically detect quality tier based on device capabilities
const detectQuality = () => {
    // Basic heuristic: check logical cores and if it's a touch device
    const cores = navigator.hardwareConcurrency || 4;
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (cores >= 8 && !isTouch) return 'high';
    if (cores >= 4) return 'medium';
    return 'low';
};

export const useStore = create((set) => ({
    quality: detectQuality(),
    setQuality: (quality) => set({ quality }),
    
    // Time of day (0 to 24)
    timeOfDay: new Date().getHours() + (new Date().getMinutes() / 60),
    setTimeOfDay: (timeOfDay) => set({ timeOfDay }),

    // Day/Night mode auto toggle
    timeMode: 'auto', // 'auto', 'day', 'night'
    setTimeMode: (timeMode) => set({ timeMode }),
    
    // Global mute
    isMuted: localStorage.getItem('isMuted') === 'true',
    toggleMute: () => set((state) => {
        const newValue = !state.isMuted;
        localStorage.setItem('isMuted', newValue);
        return { isMuted: newValue };
    })
}));
