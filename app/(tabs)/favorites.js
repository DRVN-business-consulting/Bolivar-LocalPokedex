import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext'; 

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const { currentTheme } = useTheme(); 
  const navigation = useNavigation();

  const handlePress = (pokemon) => {
    navigation.navigate('PokemonDetailScreen', { pokemon });
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      {favorites.length === 0 ? (
        <Text style={[styles.FavoritesText, { color: currentTheme.text }]}>No Favorite Pokémon added</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={[styles.pokemonItem, { borderBottomColor: currentTheme.border }]}>
                <Image source={{ uri: item.image.hires }} style={styles.pokemonImage} />
                <View style={styles.pContainer}>
                  <Text style={[styles.pokemonName, { color: currentTheme.text }]}>{item.name.english}</Text>
                  <Text style={{ color: currentTheme.text }}>Type: {item.type.join(', ')}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <Image
                    source={favorites.some(fav => fav.id === item.id)
                      ? require('../../assets/heart-active.png')
                      : require('../../assets/heart.png')
                    }
                    style={styles.heartIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  FavoritesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 250,
  },
  pokemonItem: {
    padding: 16,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pokemonImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  pContainer: {
    flex: 1,
  },
  pokemonName: {
    fontWeight: 'bold',
  },
  heartIcon: {
    width: 50,
    height: 50,
  },
});
