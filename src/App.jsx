import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Footer, Navbar, ErrorFallback } from "./components";
import PageLoader from './components/PageLoader';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

const App = () => {
  return (
    <main className='bg-slate-300/20 relative w-full h-full'>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <Router basename={import.meta.env.BASE_URL}>
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
      </ErrorBoundary>
    </main>
  );
};

export default App;
