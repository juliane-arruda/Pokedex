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
    try {
      const list = await pokemonList();

      this.setState({
        list: list.data.results.map((pokemon, position) => ({ ...pokemon, id: position + 1 })),
      }, this.applyFilter);
    } catch (e) {
      this.setState({ error: true })
    }
  }


  render() {
    return (
      <div className="container-fluid home-page">
        <div className="input-group">
          <input className="form-control form-control-lg col-12 d-flex justify-content-center" type="search" value={this.state.filter} onChange={this.setFilter} placeholder="Pesquise por um Pokémon" />
          <div className="input-group-prepend">
            <span className="input-group-text">
              <img className="lupa" src="/images/pesquisa.png" alt="Lupa" />
            </span>
          </div>
        </div>
        {this.state.error ? (
          <div className="home-card">
            <div className="card text-center my-5">
              <img className="card-img-top error-image" src="/images/error.jpg" alt="Pikachu no hospital" />
              <div className="card-body">
                <h5 className="card-title">Erro para carregar os Pokémons</h5>
                <p className="card-text">Verifique sua conexão e recarregue a página</p>
              </div>
            </div>
          </div>) :
          this.state.list === null ?
            <Loading /> : (
              <section className="home-card">
                {this.state.filterList.length === 0 ?
                  <div className="card text-center my-5">
                    <img className="card-img-top error-image" src="/images/sem-pokemon.jpg" alt="Pikachu triste" />
                    <div className="card-body">
                      <h5 className="card-title">Nenhum Pokémon encontrado </h5>
                      <p className="card-text">Verifique sua pesquisa</p>
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
              </section>)}
      </div>
    )
  }
}

export default Home;