import React, {Component} from 'react';

//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';

import moment from 'moment';
import 'moment/locale/pt'

export default class CreateExercise extends Component {
    constructor(props){
        super(props);

        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            author : '',
            title : '',
            message : '',
            date: ''
        }
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
    onSubmit(e){
        //Evitar que a ação definida por defeita pelo HTML seja executada
        e.preventDefault();

        const message = {
            author: localStorage.getItem("name"),
            title: this.state.title,
            message: this.state.message,
            date: moment(Date.now()).format('YYYY-MM-DD[T00:00:00.000Z]')
        }

        console.log(message);
        //Enviar os dados do user para o back-end
        axios.post('http://localhost:5000/forum/add', message)
        .then (res => console.log(res.data));

        window.location = "/forum";

    }

    render(){
        return (
                 <div>
                <h3>Escrever uma mensagem</h3>
                <br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <h5> {this.state.author} </h5>
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
            <div className = "form-group">
                <input type="submit" value="Enviar mensagem" className="btn btn-info" />

            </div>
                </form>
            </div> 
        );
    }
}