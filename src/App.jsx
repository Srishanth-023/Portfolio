import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Footer, Navbar, ErrorFallback, Loader } from "./components";
import PageLoader from './components/PageLoader';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

import { Canvas } from "@react-three/fiber";
import { r3fTunnel } from "./tunnel";
import { useStore } from "./store";

const App = () => {
  const quality = useStore((state) => state.quality);
  const dprCap = quality === 'high' ? 2 : (quality === 'medium' ? 1.5 : 1);

  return (
    <main className='bg-slate-300/20 relative w-full h-full'>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <Router>
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route
                path='/*'
                element={
                  <>
                    <Routes>
                      <Route path='/about' element={<About />} />
                      <Route path='/projects' element={<Projects />} />
                      <Route path='/contact' element={<Contact />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </Suspense>
        </Router>
        <Canvas
          className="pointer-events-none fixed inset-0 z-[-1]"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none' }}
          eventSource={document.getElementById("root")}
          dpr={[1, dprCap]}
          shadows
          camera={{ position: [0, 0, 5], near: 0.1, far: 1000 }}
        >
          <Loader />
          <r3fTunnel.Out />
        </Canvas>
      </ErrorBoundary>
    </main>
  );
};

export default App;
