import React, { Component } from 'react';

import styled from 'styled-components'
import Spinner from './spinner.gif'
import { Link } from 'react-router-dom';


// ---- styling of the cards done here ----//
const Sprite = styled.img `
    width: 5em;
    height: 5em;
    display: none;
`;

const Card = styled.div `
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
&:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
-moz-user-select: none;
-website-user-select: none;
user-select: none;
-o-user-select: none;
`;

//---- Style for pokemon names link ----//
const StyleLinked = styled(Link)`
text-decoration: none;
color: black;
&:focus,
&:hover,
&:visited,
&:link,
&:active {
    text-decoration: none;
}
`

//---- Getting individual pokemon image into cards ----//
export default class PokemonCard extends Component {
    state ={
        name: " ",
        imageURL: " ",
        pokemonIndex: " ",
        imageLoading: true,
        tooManyRequests: false
    };

    componentDidMount(){
        const {name, url} = this.props
        const pokemonIndex = url.split('/')[url.split('/').length - 2]
        const imageURL = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        this.setState({
            name, 
            imageURL,
            pokemonIndex
        });
    }
    render() {
        
        return (
            <div className='col-md-3 col-sm-6 mb-5'>
            <StyleLinked to={`Pokemon/${this.state.pokemonIndex}`}>
                <Card className='card'>
                    <h5 className='card-header'>{this.state.pokemonIndex}</h5>
                        {this.state.imageLoading ? (
                            <img 
                                src={Spinner}
                                style={{width: '5em', height: '5em'}}
                                className='card-img-top rounded nx-auto d-block mt-2'
                            />
                            ) : null}

                        <Sprite className='card-img-top rounded mx-auto mt-2'
                            onLoad={() => {this.setState({imageLoading: false})}}
                            onError={() => {this.setState({tooManyRequests: true})}}
                            src={this.state.imageURL}
                            />

                        <div className='card-body mx-auto'>
                            <h6 className='card-title'>{this.state.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(" ")}</h6>
                        </div>
                    </Card>
                </StyleLinked>
            </div>
        )
    }
}
