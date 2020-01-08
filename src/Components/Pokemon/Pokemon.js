import React, { Component } from 'react';
import axios from 'axios';

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B14F',
    fighting: '823551D',
    fire: 'E73B0C',
    flying:'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground:'D3B357',
    ice: 'A3EF7D',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock:'B9A156',
    steel:'B5B5C3',
    water: '3295F6'
};

export default class Pokemon extends Component {
    state = {
        name: '',
        pokemonIndex: '',
        imageURL: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            atack:'',
            defense:'',
            speed:'',
            specialAttack: '',
            specialDefense:''
        },
        height:'',
        weight:'',
        abilities:'',
        eggGroup:'',
        genderRatioMale:'',
        genderRatioFemale:'',
        evs:'',
        hatchSteps:''
    };

    async componentDidMount(){
        const { pokemonIndex } = this.props.match.params;

        //---- urls for pokemon ----// // ---- Index URL added too ----//
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
        const pokemonSepciesURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`

        //---- Get pokemon information ----//
        const pokemonRes = await axios.get(pokemonURL)

        const name = pokemonRes.data.name
        const imageURL = pokemonRes.data.sprites.front_default
        
        let {hp, attack, defense, speed, specialAttack, specialDefense} = '';

        pokemonRes.data.stats.map(stat => {
            switch(stat.stat.name){
                case 'hp':
                    hp = stat['base_stat']
                    break;
                case 'attack':
                    attack = stat['base_stat']
                    break;
                case 'defense':
                    defense = stat['base_stat']
                    break;
                case 'speed':
                    speed = stat['base_stat']
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat']
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat']
                    break;
            }
        })

        // ---- convert height decimeters (API data) to feet... The + 0.0001 * 100 ) / 100 is for rounding 2 decimal places
        const height = Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;

        const weight = Math.round((pokemonRes.data.height * 0.220462 + 0.0001) * 100) / 100;

        const types = pokemonRes.data.types.map(type => type.type.name);

        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join('')
        })

        const evs = pokemonRes.data.stats.filter(stat => {
            if (stat.effort > 0 ) {
                return true
            }
                return false
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(',')
        })

        //----- Get Pokemon Description, Catch Rate, EggGroups, Gender Ratio, Hatch Steps ----//

        await axios.get(pokemonSepciesURL).then(res => {
            let description = '';
            console.log(res.data);
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en'){
                    description = flavor.flavor_text;
                    return;
                }
            });

            const femaleRate = res.data['gender_rate']
            const genderRatioFemale = 12.5 * femaleRate
            const genderRatioMale = 12.5 * (8 - femaleRate)

            const catchRate = Math.round((100 / 255) * res.data['capture_rate'])

            const eggGroup = res.data['egg_groups'].map(group => {
                return group.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join('')
            })

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1)

            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroup,
                hatchSteps,
            })
        })

        this.setState({
            imageURL,
            pokemonIndex,
            name,
            types,
            stats: {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            },
            height,
            weight,
            abilities,
            evs
        })
    }

    render() {
        console.log('loading');
        return (
            <div className='col'>
                <div className='card'>
                    <div className='card-holder'>
                        <div className='row'>
                            <div className='col-5'>
                                <h5>{this.state.pokemonIndex}</h5>
                            </div>
                            <div className='col-7'>
                                <div className='float-right'>
                                    {this.state.types.map(type => (
                                    <span key={type}
                                    className='badge badge-primary badge-pill mr-1'>{type.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join('')}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
