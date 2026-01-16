
import React, { useState, useMemo } from 'react';
import { GalleryImage, Category } from './types';
import { MOCK_IMAGES } from './constants';
import FilterBar from './components/FilterBar';
import GalleryGrid from './components/GalleryGrid';
import Lightbox from './components/Lightbox';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return MOCK_IMAGES;
    return MOCK_IMAGES.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
              <span className="text-xl font-black text-white italic">L</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">LUMINA GALLERY</h1>
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-medium">Curated AI Visuals</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <p className="text-slate-500 text-sm font-medium">
              Explore {MOCK_IMAGES.length} items in the collection
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full pt-4">
        <FilterBar 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
        
        <GalleryGrid 
          images={filteredImages} 
          onImageClick={setSelectedImage} 
        />
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>© 2024 Lumina AI Gallery. Powered by Gemini Pro Vision.</p>
        <p className="mt-2">Discovering the soul of pixels.</p>
      </footer>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <Lightbox 
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default App;
