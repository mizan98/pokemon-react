import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import axios from 'axios';
import Spinner from './spinner.gif';


export default class PokemonList extends Component {
    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/?limit=151',
        pokemon: null
    };

    // ---- Async means it can run in the background simultaneously ----//
    async componentDidMount(){
        const res = await axios.get(this.state.url);
        this.setState({pokemon: res.data['results']})
    }

    filterPokemons = (e) => {
        console.log(e.target.value);

        let searchedPokemon = e.target.value.toLowerCase();

        let pokemonNames = this.state.pokemon.filter( pokemon => {
            return pokemon.name.toLowerCase().indexOf(searchedPokemon) !== -1;
        });

        console.log(pokemonNames);
    }

    render() {
        return (
    
    // ---- React.Fragment basically removes the divs ----//
            <React.Fragment>
                <input onChange={this.filterPokemons} style={{ width: '200px', backgroundColor: 'white', color: 'black'}} className="search_input" type="text" name="" placeholder="Search..." />
    {/* ---- Created an if else statement which checks whether pokemon is null or not */}
                {this.state.pokemon ? (
                <div className='row'>
                    {this.state.pokemon.map(pokemon => (
                        <PokemonCard
                            key={pokemon.name}
                            name={pokemon.name}
                            url={pokemon.url}
                        />
                    ))}
                </div>
                ) : (
                    <div>{Spinner}</div>
                )}
                
            </React.Fragment>
        )
    }
}
