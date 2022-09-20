import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt'

//Functional react component
//Não tem state nem life cicle methods
const Match = props => (

    <tr>
        <td className="text-left"> {props.match.homeTeam} </td>
        <td className="text-center">  
            {         
                (moment() > moment(props.match.date))?
                (props.match.homeScore + " - " + props.match.awayScore)
                :
                moment(props.match.date).calendar()
            }
        </td>
        <td className="text-right"> {props.match.awayTeam} </td>
    </tr>
)


export default class MatchesList extends Component {
    constructor(props){
        super(props)

        this.state = {
            matches: [],
            startDate: moment()
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/matches/')
        .then(response => {
            this.setState({
                matches: response.data            
            })
        }) 
        .catch((error) => {
            console.log(error); 
        })
    }

    handleChange(date) {
        this.setState({
          startDate: date
        })
      }

    matchesList(){
        return this.state.matches.map(currentmatch => {
            return <Match match = {currentmatch} deleteMatch={this.deleteMatch} key={currentmatch._id}/>
        })
    }

    render(){
        return(
            <div>
            <h3>Calendário de Jogos</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th className="text-left">Equipa da Casa</th>
                        <th className="text-center">Informação do Encontro</th>
                        <th className="text-right">Visitante</th>
                    </tr>
                </thead>
                <tbody>
                { this.matchesList() }
                </tbody>
            </table>
        </div>
        );
    }
}