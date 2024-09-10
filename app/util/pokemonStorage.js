import AsyncStorage from '@react-native-async-storage/async-storage';

const POKEMON_API_URL = 'https://pokemon-api-nssw.onrender.com/pokemon';

export const fetchAndStorePokemons = async () => {
  try {
    const response = await fetch(POKEMON_API_URL);
    const data = await response.json();

    const pokemons = data; 

    await AsyncStorage.setItem('pokemonList', JSON.stringify(pokemons));
    console.log('Pokémon list saved to AsyncStorage');
  } catch (error) {
    console.error('Error fetching or storing Pokémon list:', error);
  }
};

export const getPokemonsFromStorage = async () => {
  try {
    const storedPokemons = await AsyncStorage.getItem('pokemonList');
    return storedPokemons ? JSON.parse(storedPokemons) : [];
  } catch (error) {
    console.error('Error retrieving Pokémon list from AsyncStorage:', error);
    return [];
  }
};

export const updatePokemonInStorage = async (updatedPokemon) => {
  try {
    let pokemons = await getPokemonsFromStorage();

    const updatedPokemons = pokemons.map(p =>
      p.id === updatedPokemon.id ? updatedPokemon : p
    );

    await AsyncStorage.setItem('pokemonList', JSON.stringify(updatedPokemons));
    console.log('Pokémon list updated in AsyncStorage');
  } catch (error) {
    console.error('Error updating Pokémon:', error);
  }
};
