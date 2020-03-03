import React from 'react';

const PokemonImg = ({id}) => {
  return (
    <img className="card-img-top" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id.toString().padStart(3, '0')}.png`} alt="Pokémon" />
  );
};

export default PokemonImg;
