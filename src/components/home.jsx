import React, { Component } from 'react';
import { pokemonList } from '../api/pokemon-api';
import FuzzySearch from 'fuzzy-search';
import PokemonImg from './pokemon-img';
import { Link } from 'react-router-dom';
import Loading from './loading';
import './home.scss';

class Home extends Component {
  state = {
    list: null,
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
    });
  }

  async componentDidMount() {
    const list = await pokemonList();

    this.setState({
      list: list.data.results.map((pokemon, position) => ({ ...pokemon, id: position + 1 })),
    }, this.applyFilter)
  }


  render() {
    return (
      <div className="container-fluid home-page">
        <input className="form-control form-control-lg col-12 d-flex justify-content-center" type="search" value={this.state.filter} onChange={this.setFilter} placeholder="Pesquise por um Pokémon" />
        {this.state.list === null ?
          <Loading /> :
          <section className="home-card">
            {this.state.filterList.length === 0 ?
              <div className="card mt-5">
                <div className="card-body">
                  <h5 className="card-title">Nenhum Pokémon encontrado verifique sua pesquisa</h5>
                </div>
              </div> : this.state.filterList.map((elem) =>
                <Link to={`/details/${elem.id}`} className="card m-3" style={{ width: '18rem' }}>
                  <div>
                    <PokemonImg id={elem.id} />
                  </div>
                  <div className="card-body">
                    <p className="card-text"><small className="text-muted">N° {elem.id}</small></p>
                    <h4 className="card-title pokemon-name d-flex justify-content-center">{elem.name}</h4>
                  </div>
                </Link>)}
          </section>}
      </div>
    )
  }
}

export default Home;