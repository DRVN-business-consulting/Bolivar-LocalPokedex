import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from './contexts/ThemeContext';
import { getPokemonsFromStorage, updatePokemonInStorage } from './util/pokemonStorage';

export default function PokemonDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { pokemon } = route.params;
  const { isDarkTheme } = useTheme();

  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(pokemon.name.english);

  const handleSave = async () => {
    try {
      const updatedPokemon = {
        ...pokemon,
        name: { ...pokemon.name, english: editedName }
      };

      await updatePokemonInStorage(updatedPokemon);
      
      navigation.goBack();
    } catch (error) {
      console.error('Error updating Pokémon:', error);
    }
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Image source={{ uri: pokemon.image ? pokemon.image.hires : 'https://example.com/default-image.png' }} style={styles.pokemonImage} />
      {editMode ? (
        <TextInput
          style={[styles.pokemonName, isDarkTheme ? styles.darkText : styles.lightText]}
          value={editedName}
          onChangeText={setEditedName}
        />
      ) : (
        <Text style={[styles.pokemonName, isDarkTheme ? styles.darkText : styles.lightText]}>{pokemon.name.english}</Text>
      )}
      <Text style={[styles.pokemonType, isDarkTheme ? styles.darkText : styles.lightText]}>
        Type: {pokemon.type.join(', ')}
      </Text>
      <Text style={[styles.pokemonDescription, isDarkTheme ? styles.darkText : styles.lightText]}>
        {pokemon.description}
      </Text>
      <Text style={isDarkTheme ? styles.darkText : styles.lightText}>Height: {pokemon.profile.height}</Text>
      <Text style={isDarkTheme ? styles.darkText : styles.lightText}>Weight: {pokemon.profile.weight}</Text>
      <Text style={isDarkTheme ? styles.darkText : styles.lightText}>Species: {pokemon.species}</Text>

      {editMode ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <Button title="Edit" onPress={() => setEditMode(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  pokemonImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: 120,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pokemonType: {
    fontSize: 18,
    marginBottom: 10,
  },
  pokemonDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});
