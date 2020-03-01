import axios from 'axios';

export const pokemonList = () => {
  return axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
}
