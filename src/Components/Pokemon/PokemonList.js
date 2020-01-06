import React, { Component } from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios'

export default class PokemonList extends Component {
    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/',
        pokemon: null
    };

    // ---- Async means it can run in the background simultaneously ----//
    async componentDidMount(){
        const response = axios.get(this.state.url);
        this.setState({pokemon: response.data['results']})
    }

    render() {
        return (
            <div className='row'>
                <PokemonCard/>
                <PokemonCard/>
                <PokemonCard/>
                <PokemonCard/>
                <PokemonCard/>
            </div>
        )
    }
}
