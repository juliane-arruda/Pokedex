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
        <input value={this.state.filter} onChange={this.setFilter} />
        <ul>
          {this.state.filterList.map((elem, position) => <li> <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(position + 1).toString().padStart(3,'0')}.png`} alt="" />{elem.name} {position + 1}</li>)}
        </ul>
      </div>
    )
  }
}

export default Home;