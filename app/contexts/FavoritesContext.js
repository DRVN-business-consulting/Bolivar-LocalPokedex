import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(fav => fav.id === pokemon.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== pokemon.id);
      } else {
        return [...prevFavorites, pokemon];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
