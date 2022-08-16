import React, { Component } from 'react';
import axios from 'axios';
import { Layout, Button, PageHeader, notification, Card } from 'antd';
import './App.css';
import 'antd/dist/antd.css';

const { Meta } = Card;

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
    this.openNotification = this.openNotification.bind(this);
    this.handleRandomPokemon = this.handleRandomPokemon.bind(this);
  }

  openNotification() {
    notification.open({
      message: this.state.error ? "Error" : "Success",
      description: this.state.alert.toLocaleUpperCase(),
    });
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
          randomPokemonAbilities: response.data.abilities,
          alert: `${response.data.name} appears!`
        })
        console.log('randomPokemonAbilities: ', this.state.randomPokemonAbilities)
        {this.state.randomPokemonAbilities.map((ability) => {
          console.log(ability.ability.name)
        })}
        this.openNotification();
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
        {/* {this.state.alert !== '' ?
          <Alert message={this.state.alert} type={this.state.error ? 'error' : 'success'}/>
          : null
        } */}
        <Header>
          <PageHeader style={{color: "white", textAlign: "center"}}>React Pokedex App</PageHeader>
        </Header>
        <h4>Random Pokemon</h4>
        <Button type="primary" loading={this.state.loading} onClick={this.handleRandomPokemon}>
          Random search
        </Button>
        {this.state.randomPokemonName !== '' ? 
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="pokemon graphic" src={this.state.randomPokemonImg} />}>
            <Meta title={this.state.randomPokemonName} />
            <h5>Abilities:</h5>
            <ul>
                {this.state.randomPokemonAbilities.map((ability) => {
                  return <li>{ability.ability.name}</li>;
                })}
            </ul>
          </Card>
          : null }
      </Layout>
    );
  }
}

export default App;
