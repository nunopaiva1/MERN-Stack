import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//Functional react component
//Não tem state nem life cicle methods
const Team = props => (

    <tr>
        <td> <Link to={"/player/"+props.team.name}> {props.team.name} </Link></td>
        <td class="text-center"> {props.team.points} </td>
       {/* <td class="text-center">
            <a href="#" onClick={() => {props.deleteTeam(props.team._id) }}>Apagar equipa</a>
        </td>*/}
    </tr>
)

//Class Component
export default class TeamList extends Component {
constructor(props) {
    super(props);

    this.deleteTeam = this.deleteTeam.bind(this);
    this.state = {teams: []};    
}

    componentDidMount(){
        axios.get('http://localhost:5000/teams/')
        .then(response => {
            this.setState({
                teams: response.data
            })
        }) 
        .catch((error) => {
            console.log(error); 
        })
    }

    deleteTeam(id) {
        //Apaga registo na base de dados
        axios.delete('http://localhost:5000/teams/'+id)
        .then (res => console.log(res.data));
        //Apaga registo na página visual do cliente
        this.setState({
            teams: this.state.teams.filter(el => el._id !== id)
        })
    }

teamList(){
    return this.state.teams.map(currentTeam => {
        return <Team team = {currentTeam} deleteTeam={this.deleteTeam} key={currentTeam._id}/>
    })
}

    render(){
        return (
            <div>
                <h3>AF Viana do Castelo - Tabela Classificativa</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th width="80%">Equipa</th>
                            <th class="text-center">Pontos</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.teamList() }
                    </tbody>
                </table>
            </div>
        );
    }
}