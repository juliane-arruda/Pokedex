import React, { Component } from 'react';
import { pokemonDetails, pokemonTypes } from '../api/pokemon-api';
import PokemonImg from './pokemon-img';
import Loading from './loading';
import { Link } from 'react-router-dom';
import './details.scss';

class Details extends Component {
  state = {
  }

  async componentDidMount() {
    const detail = await pokemonDetails(this.props.match.params.id);
    const types = await pokemonTypes(this.props.match.params.id);

    this.setState({
      detail: detail.data,
      types: types.data.types.map((elem) => elem.type.name)
    })
  }

  filterDescription = () => {
    return this.state.detail.flavor_text_entries.filter((text) => text.language.name === 'en')[0].flavor_text;
  }

  render() {
    console.log(this.props);

    if (!this.state.detail) {
      return (<Loading />);
    }

    return (
      <div className="container">
        <div className="row details-card my-5">
          <div className="col-12 col-md-6">
            <PokemonImg id={this.state.detail.id} />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
            <h3 className="pokemon-name">{this.state.detail.name}</h3>
            <h5>Description: <p>{this.filterDescription()}</p></h5>
            <h5>Type: <p>{this.state.types.join(' ')}</p></h5>
            <Link type="button" class="btn btn-outline-secondary mb-3" to="/">Return</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Details;