import React, { Component } from 'react';
import { pokemonList } from '../api/pokemon-api';

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
    this.setState({
      filterList: this.state.list.filter((pokemon) => pokemon.name.indexOf(this.state.filter) !== -1)
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
          {this.state.filterList.map((elem) => <li>{elem.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default Home;