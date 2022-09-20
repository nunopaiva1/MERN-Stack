import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props){
        super(props);

        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
            password : ''
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
            password: this.state.password,
        }

        console.log(user);

        //Enviar os dados do user para o back-end
        axios.post('http://localhost:5000/users/add', user)
        .then (res => console.log(res.data));

        window.location = "/login";
        alert("Conta criada com sucesso");

        this.setState ({
            username:'',
            password:''
        })
    }

    render(){
        return (
            <div>
                <h3>Criar um novo utilizador</h3>
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
                    <input type="submit" value="Criar utilizador" className="btn btn-primary" />
                </div>
                </form>
            </div>
        );
    }
}