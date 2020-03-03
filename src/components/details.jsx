import React, { Component } from 'react';
import { pokemonDetails, pokemonTypes } from '../api/pokemon-api';

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
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <p>{this.filterDescription()}</p>
        <p>{this.state.types}</p>
      </div>
    )
  }
}

export default Details;