import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectLanding from './pages/ProjectLanding';
import Media from './pages/Media';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [activeProject, setActiveProject] = useState(null);

  const handleNavigateProject = (projectId) => {
    setActiveProject(projectId);
    setActivePage('project');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={setActivePage} onNavigateProject={handleNavigateProject} />;
      case 'project':
        return (
          <ProjectLanding 
            projectId={activeProject} 
            onNavigate={setActivePage} 
            onNavigateProject={handleNavigateProject} 
          />
        );
      case 'media':
        return <Media />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={setActivePage} onNavigateProject={handleNavigateProject} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div 
            key="main-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-screen w-full"
          >
            {/* Nav Header */}
            <Header 
              activePage={activePage} 
              activeProject={activeProject}
              onNavigate={setActivePage} 
              onNavigateProject={handleNavigateProject} 
            />

            {/* Main Page Area wrapped with page transition animations */}
            <main className="flex-grow w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activePage}-${activeProject || 'none'}`}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Footer */}
            <Footer 
              onNavigate={setActivePage} 
              onNavigateProject={handleNavigateProject} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
