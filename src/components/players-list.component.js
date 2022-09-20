import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';

const Player = props => (

    <tr>
        <td class="text-center"> {props.player.name} </td>
        <td class="text-center"> {props.player.position} </td>
        <td class="text-center"> {props.player.age} </td>
        <td class="text-center"> {props.player.team} </td>
        <td class="text-center"> {props.player.nationality} </td>
    </tr>
)

export default class PlayersList extends Component {
    constructor(props) {
        super(props);

        this.state = {players: []};    
    }

    componentDidMount(){
        //Esse PROPS.MATCH.PARAMS.TEAM vem diretamente do URL
        axios.get('http://localhost:5000/players/' + this.props.match.params.team)
        .then(response => {
            this.setState({
                players: response.data
            })
        }) 
        .catch((error) => {
            console.log(error); 
        })
    }
    
    playerList(){
        return this.state.players.map(currentPlayer => {
            return <Player player = {currentPlayer} deletePlayer={this.deletePlayer} key={currentPlayer._id}/>
        })
    }
    
        render(){
            return (
                <div>
                    <h3>Plantel do {this.props.match.params.team} </h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th class="text-center">Nome</th>
                                <th class="text-center">Posição</th>
                                <th class="text-center">Idade</th>
                                <th class="text-center">Equipa</th>
                                <th class="text-center">Nacionalidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.playerList() }
                        </tbody>
                    </table>
                </div>
            );
        }
}