import { useState, useEffect } from 'react';
import { useNoteFilter } from '../context/NoteFilterContext';
import NoteCard from '../components/NoteCard';
import { Note, Category } from '../types';
import { useNavigate } from 'react-router-dom';

export default function FavoritesPage() {
  const { filteredNotes, loading, categories, setIsShowingFavorites } = useNoteFilter();

  const navigate = useNavigate();

  useEffect(() => {
    // When this page mounts, set the context to show only favorites
    setIsShowingFavorites(true);

    // When this page unmounts, set the context back to show all notes
    return () => {
      setIsShowingFavorites(false);
    };
  }, [setIsShowingFavorites]); // Depend on setIsShowingFavorites to avoid re-running unnecessarily

  const handleNoteClick = (id: string) => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // The filteredNotes from the context will already contain only favorites due to the context logic
  const favoriteNotes = filteredNotes; 

  return (
    <div className="p-6 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Favorites</h1>
        
        {favoriteNotes.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center transition-colors duration-200">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No favorite notes yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Mark notes as favorites to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                categories={categories}
                onClick={handleNoteClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 