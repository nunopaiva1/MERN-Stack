import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//Functional react component
//Não tem state nem life cicle methods
const Message = props => (

    <div>
    <h5>{props.message.title}</h5>
    <tr>
        <td>{props.message.message}</td>
        {/*<td>
            <Link to={"/edit/"+props.message._id}>edit</Link> | <a href="#" onClick={() => {props.deleteMessage(props.message._id) }}>delete </a>        ~
        </td>*/}
    </tr>
    <h6>{props.message.author}, </h6>
    <tr>{props.message.date.substring(0,10)}</tr>
    {((props.message.author) === localStorage.getItem("name") ) ? 
    (<div>
        <td><Link to={"/edit/"+props.message._id}>Editar</Link> </td>
        <td><button  type="button" class="btn btn-danger btn-sm" onClick={() => {props.deleteMessage(props.message._id) }}> Apagar </button> </td>
    </div>) : (<br></br>) }
    <br></br>

    </div>
)

//Class Component
export default class MessagesList extends Component {
constructor(props) {
    super(props);

    this.deleteMessage = this.deleteMessage.bind(this);
    this.state = {messages: []};    
}

    componentDidMount(){
        axios.get('http://localhost:5000/forum/')
        .then(response => {
            this.setState({
                messages: response.data
            })
        }) 
        .catch((error) => {
            console.log(error); 
        })
    }

    deleteMessage(id) {
        //Apaga registo na base de dados
        axios.delete('http://localhost:5000/forum/'+id)
        .then (res => console.log(res.data));
        //Apaga registo na página visual do cliente
        this.setState({
            messages: this.state.messages.filter(el => el._id !== id)
        })
    }

    createMessage(){

        if(localStorage.getItem("name") === 'noUser'){
            window.location = "/login";
        } else{
            window.location = "/create";
        }
    }

messageList(){
    return this.state.messages.map(currentmessage => {
        return <Message message = {currentmessage} deleteMessage={this.deleteMessage} key={currentmessage._id}/>
    })
}

    render(){
        return (
            <div>
                <h3>Fórum - Mensagens</h3>
                <br></br>
                <button  type="button" class="btn btn-info" onClick={this.createMessage}>Nova Mensagem</button>
                <br></br>
                <br></br>
                <br></br>
                <table className="table">
                    <thead className="thead-light">
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        { this.messageList() }
                    </tbody>
                </table>
            </div>
        );
    }
}