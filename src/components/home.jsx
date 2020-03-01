import React, { Component } from 'react';
import {pokemonList} from '../api/pokemon-api';

class Home extends Component {
  state = {list: []}
  
  async componentDidMount(){
    const list = await pokemonList();

    this.setState({
      list : list.data.results,
    })
  }

  render() {
    return(
      <ul>
        {this.state.list.map((elem) => <li>{elem.name}</li> )}
      </ul>
    )
  }
}

export default Home;