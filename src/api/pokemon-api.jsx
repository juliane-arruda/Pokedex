import axios from 'axios';

export const pokemonList = () => {
  return axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
}

export const pokemonDetails = (id) => {
  return axios.get('https://pokeapi.co/api/v2/pokemon-species/' + id);
}

export const pokemonTypes = (id) => {
  return axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
}