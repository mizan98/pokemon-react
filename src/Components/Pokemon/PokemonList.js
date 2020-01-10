import React, { Component } from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios'

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

    render() {
        return (
    
    // ---- React.Fragment basically removes the divs ----//
            <React.Fragment>
    
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
                    <h1>Loading Pokemon</h1>
                )}
                
            </React.Fragment>
        )
    }
}
