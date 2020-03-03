import React, { Component } from 'react';
import { pokemonList } from '../api/pokemon-api';
import FuzzySearch from 'fuzzy-search';
import './home.css';

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
      <div className="container-fluid home-page">
        <input className="form-control form-control-lg col-12" value={this.state.filter} onChange={this.setFilter} placeholder="Pesquise por um Pokémon" />
        {/* <div>
          {this.state.filterList.map((elem, position) =>
            <div>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(position + 1).toString().padStart(3, '0')}.png`} alt="Pokémon" /> {elem.name} {position + 1}
            </div>)}
        </div> */}

        <section className="home-card">
          {this.state.filterList.map((elem, position) =>
            <div class="card" style={{ width: '18rem' }}>
                <div>
                  <img class="card-img-top" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(position + 1).toString().padStart(3, '0')}.png`} alt="Pokémon" />
                </div>
                <div class="card-body">
                  <p class="card-text">
                    {elem.name} {position + 1}
                  </p>
                </div>
              </div>)}
        </section>


      </div>
    )
  }
}

export default Home;