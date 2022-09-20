import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class CreateUser extends Component {

    constructor(props){
        super(props);

        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
            password : '',
            message: '',
            loggedIn: false
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        //Evitar que a ação definida por defeita pelo HTML seja executada
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(user);

        //Enviar os dados do user para o back-end
        axios.post('http://localhost:5000/users/check', user)
        .then (res => 
            {
                console.log("O username é: " + this.state.username);
                
                this.setState ({
                    message: res.data.message,
                })
                console.log(this.state.message); 
                
            if(this.state.message === 'existe'){
                window.location = "/";
                alert("Bem-vindo, "+ this.state.username);
                localStorage.setItem("name", this.state.username);
                this.setState ({
                    loggedIn: true
                })
            }
            else{
            this.setState ({
                username:'',
                password:''
            })
            alert("Nome de utilizador ou palavra-passe errados. Introduza os dados novamente.");
            }
            }
        )
    }

    render(){
        if(this.state.loggedIn){
            return <Redirect></Redirect>
        }
        return (
            <div>
                <h3>Entre na sua conta</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Nome de utilizador: </label>
                    <input type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
                     <label>Palavra-passe: </label>
                    <input type="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Entrar" className="btn btn-info" />
                </div>
                </form>
            </div>
        );
    }
}