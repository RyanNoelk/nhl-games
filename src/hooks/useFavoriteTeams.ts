// @ts-nocheck
import { useState } from 'react';

export const useFavoriteTeams = () => {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteTeams');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (teamId: string) => {
    setFavoriteTeams(prev => {
      const newFavorites = prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId];
      localStorage.setItem('favoriteTeams', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (teamId: string) => favoriteTeams.includes(teamId);

  return { favoriteTeams, toggleFavorite, isFavorite };
};
