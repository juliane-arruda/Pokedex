import React, { Component } from 'react';
import { pokemonList } from '../api/pokemon-api';
import FuzzySearch from 'fuzzy-search';

class Home extends Component {
  state = {
    list: [],
    filter: '',
    filterList: [],
  }

  setFilter = (e) => {
    this.setState({
      filter: e.target.value,
    }, this.applyFilter)
  }

  applyFilter = () => {
    const searcher = new FuzzySearch(this.state.list, ['name'], {
      caseSensitive: false,
    });
    this.setState({
      filterList: searcher.search(this.state.filter)
    })
  }

  async componentDidMount() {
    const list = await pokemonList();

    this.setState({
      list: list.data.results,
    }, this.applyFilter)
  }

  render() {
    return (
      <div>
        <img className="img-fluid img-thumbnail" src="/images/pokemon-logo.png" alt="Pokémon-logo" />
        <input class="form-control form-control-lg col-12" value={this.state.filter} onChange={this.setFilter} placeholder="Pesquise por um Pokémon" />
        <div>
          {this.state.filterList.map((elem, position) =>
            <div>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(position + 1).toString().padStart(3, '0')}.png`} alt="Pokémon" /> {elem.name} {position + 1}
            </div>)}
        </div>

      </div>
    )
  }
}

export default Home;