import React, {Component} from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';

export default class EditMessage extends Component {
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            author : '',
            title : '',
            message : '',
            users: []
        }
    }

    //É chamado automaticamente em pontos diferentes
    //Será chamado imediatamente antes de qualquer coisa ser mostrada na página
    componentDidMount(){
        
        axios.get('http://localhost:5000/forum/'+this.props.match.params.id)
        .then (response =>{
            this.setState ({
                author: response.data.author,
                title: response.data.title,
                message: response.data.message,
                data: new Date(response.data.date)
            })
        })
        .catch (function(error){
            console.log(error);
        })

        /*
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    //Usa-se o map para ir buscar apenas o campo "username" de cada elemento do array "users"
                    users: response.data.map(user => user.username),                })
            }
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    */
    }
    onChangeMessage(e){
        this.setState({
            message: e.target.value
        });
    }
    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }
    
    /*
    onChangeDate(date){
        this.setState({
            date: date
        });
    }*/

    onSubmit(e){
        //Evitar que a ação definida por defeita pelo HTML seja executada
        e.preventDefault();

        const message = {
            author: this.state.author,
            title: this.state.title,
            message: this.state.message,
            //date: this.state.date
        }

        console.log(message);
        //Enviar os dados do user para o back-end
        axios.post('http://localhost:5000/forum/update/'+this.props.match.params.id, message)
        .then (res => console.log(res.data));


        window.location = "/forum";

    }

    render(){
        return (
            <div>
                <h3>A editar a mensagem</h3>
                <br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <h5> {this.state.author} </h5>
                   
                   {/* <select href="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                    {
                        this.state.users.map(function(user){
                            return <option
                                key={user}
                                value={user}>{user}
                            </option>
                        })
                    }
                    </select>
                */}
                    </div>
            <div className = "form-group">
                <label>Título </label>
                <input type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}/>
            </div>
            <div className = "form-group">
                <label>Corpo da mensagem </label>
                <input type="text"
                required
                className="form-control"
                value={this.state.message}
                onChange={this.onChangeMessage}/>
            </div>
           
           {/* <div className = "form-group">
                <label>Date: </label>
                <div>
                <DatePicker 
                selected={this.state.date}
                onChange={this.onChangeDate}
                />
                </div>
            </div>
            */}
            <div className = "form-group">
                <input type="submit" value="Concluir edição" className="btn btn-info" />

            </div>
                </form>
            </div>    
        );
    }
}