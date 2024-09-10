import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Tabs from './(tabs)/index';
import { ThemeProvider } from './contexts/ThemeContext';
import { fetchAndStorePokemons } from './util/pokemonStorage'; 

export default function AppLayout() {
  useEffect(() => {
    fetchAndStorePokemons(); 
  }, []);

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen
            name='index'
            options={{
              title: 'HOME',
              headerShown: true,
              headerStyle: {
                backgroundColor: '#4c539c',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='(tabs)'
            options={{
              title: 'My tabs',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='PokemonDetailScreen'
            options={{
              title: 'Pokemon Detail',
              headerShown: true,
            }}
          />
        </Stack>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
