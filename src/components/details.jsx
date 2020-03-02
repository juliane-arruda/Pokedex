import React, { Component } from 'react';
import { pokemonDetails } from '../api/pokemon-api';

class Details extends Component {
  state = {
  }

  filterDescription = () => {
    return this.state.detail.flavor_text_entries.filter((text) => text.language.name === 'en')[0].flavor_text;
  }

  async componentDidMount() {
    const detail = await pokemonDetails(this.props.match.params.id);

    this.setState({
      detail: detail.data,
    })
  }

  render() {
    console.log(this.props);

    if(!this.state.detail) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <p>{this.filterDescription()}</p>
      </div>
    )
  }
}

export default Details;