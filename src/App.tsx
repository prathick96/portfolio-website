import { Suspense, lazy, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Cursor } from './components/ui/Cursor';
import { ErrorBoundary } from './components/ErrorBoundary';
import { bindSceneInputs } from './three/sceneState';
import { useMediaQuery, useReducedMotion } from './lib/hooks';

const Background3D = lazy(() => import('./three/Background3D'));

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function App() {
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [webgl, setWebgl] = useState(false);

  useEffect(() => setWebgl(hasWebGL()), []);
  useEffect(() => bindSceneInputs(), []);

  return (
    <div className="grain relative min-h-screen overflow-clip">
      {webgl && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Background3D reducedMotion={reduced} lowPower={isMobile} />
          </Suspense>
        </ErrorBoundary>
      )}

      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
