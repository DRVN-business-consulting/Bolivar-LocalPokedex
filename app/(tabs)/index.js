import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPokemonsFromStorage } from '../util/pokemonStorage'; 
import { useTheme } from '../contexts/ThemeContext';

export default function AllPokemonsScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPokemons = async () => {
      const storedPokemons = await getPokemonsFromStorage();
      setPokemons(storedPokemons);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={currentTheme.text} style={styles.loader} />;
  }

  const renderPokemonItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.pokemonItem, { borderColor: currentTheme.border }]}
      onPress={() => navigation.navigate('PokemonDetailScreen', { pokemon: item })}
    >
      <Image source={{ uri: item.image.hires }} style={styles.pokemonImage} />  
      <Text style={[styles.pokemonName, { color: currentTheme.text }]}>
        {item.name.english}
      </Text>
      <Text style={[styles.pokemonType, { color: currentTheme.text }]}>
        Type: {item.type.join(', ')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemonItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 50,
  },
  pokemonItem: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pokemonType: {
    fontSize: 16,
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});
