import React, { Component } from 'react';
import axios from 'axios';
import { Layout, Button, Alert } from 'antd';
import './App.css';
import 'antd/dist/antd.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      randomPokemonName: '',
      randomPokemonImg: '',
      alert: '',
      error: false
    };
    this.handleRandomPokemon = this.handleRandomPokemon.bind(this);
  }

  handleRandomPokemon() {
    this.setState({ loading: true });
    let randomPokemonID = Math.floor(Math.random() * 898) + 1;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonID}/`)
      .then((response) => {
        console.log(response);
        this.setState({ 
          randomPokemonName: response.data.name,
          randomPokemonImg: response.data.sprites.front_default,
          alert: `${response.data.name} appears!`
        })
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ alert: error.message, error: true });
      })
  }

  render() {
    const { Header } = Layout;

    return (
      <Layout className="layout">
        {this.state.alert !== '' ?
          <Alert message={this.state.alert} type={this.state.error ? 'error' : 'success'}/>
          : null
        }
        <Header>header</Header>
        <h1>React Pokedex App</h1>
        <h4>Random Pokemon</h4>
        <Button type="primary" loading={this.state.loading} onClick={this.handleRandomPokemon}>
          Catch it randomly
        </Button>
        {this.state.randomPokemonName !== '' ? 
          <React.Fragment>
            <h5>Name: {this.state.randomPokemonName}</h5>
            <img src={this.state.randomPokemonImg} />
          </React.Fragment>
          : null }
      </Layout>
    );
  }
}

export default App;
