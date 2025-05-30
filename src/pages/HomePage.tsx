import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Note, Category } from '../types';
import NoteCard from '../components/NoteCard';
import { useNoteFilter } from '../context/NoteFilterContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { filteredNotes, loading, searchQuery, selectedCategory, categories } = useNoteFilter();

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

  return (
    <div className="p-6 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Notes</h1>
          {/* Removed Create Note Button */}
          {/*
          <button
            onClick={() => navigate('/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Create Note
          </button>
          */}
        </div>
        
        {filteredNotes.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center transition-colors duration-200">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notes found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first note to get started'}
            </p>
            {!searchQuery && selectedCategory === 'all' && (
              <button
                onClick={() => navigate('/new')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Create Note
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map(note => (
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
