import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{

constructor(props){
    super(props);

    //localStorage.setItem("name", 'noUser');

    this.state={
        estado: ''
    }
    
    let loggedIn=false;

    if(localStorage.getItem("name") === 'noUser'){
        loggedIn = false;
        this.setState({
            estado: 'Login'
         })
    }else{
        loggedIn = true;
        this.setState({
            estado: localStorage.getItem("name")
         })
         console.log("O Utilizador: " + localStorage.getItem("name") + " tem sessão iniciada.")

    }
    this.state = {
        loggedIn
    }
}

disconnect = () => {
    console.log('this is:', this);
    this.setState({
        loggedIn: false
    })
    localStorage.setItem("name", 'noUser');
    alert("Sessão terminada");
    window.location.reload();

}

render(){

    return(
       /* <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/matches" className="navbar-brand">Regional FlashScore</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/team" className="nav-link">Classificação</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/matches" className="nav-link">Calendário</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/forum" className="nav-link">Fórum</Link>
                    </li>

                    {this.state.loggedIn ? 
                    
                    //LOGIN ATIVO
                    (<div align="left">
                    <li className="navbar-item">
                    <Link to="/edit/id" className="nav-link"> Bem-vindo, {localStorage.getItem("name")} </Link>
                    </li>
                    <li className="d-flex justify-content-center">
                    <button  type="button" class="btn btn-danger btn-sm" onClick={this.disconnect}> Terminar Sessão </button>
                    </li>
                    </div>
                    ) : 
                    
                    //LOGIN DESATIVADO
                    (<div align="left">
                    <li className="navbar-item">
                    <Link to="/login" className="nav-link"> Entrar </Link>
                    </li> 
                    <li className="navbar-item">
                    <Link to="/registar" className="nav-link"> Registar </Link>
                    </li>
                    </div>
                    )}
                </ul>
            </div>
        </nav>

        */
<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
 <Link to="/matches" className="navbar-brand">Regional FlashScore</Link>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
      <Link to="/team" className="nav-link">Classificação</Link>
      </li>
      <li className="nav-item">
      <Link to="/matches" className="nav-link">Calendário</Link>
      </li>
      <li className="navbar-item">
       <Link to="/forum" className="nav-link">Fórum</Link>
       </li>
       </ul>
      
       {this.state.loggedIn ? (
               <form className="form-inline my-2 my-lg-0">
                <Link to="/edit/id" className="nav-link font-weight-bold text-light"> Bem-vindo, {localStorage.getItem("name")} </Link>
                <div></div>
                <button  type="button" class="btn btn-danger" onClick={this.disconnect}> Terminar Sessão </button>
             </form>
       ):(
        <form className="form-inline my-2 my-lg-0">
        <Link to="/login" className="btn btn-info"> Entrar </Link>
        <h6 className="text-light nav-link"> | </h6>
        <Link to="/registar" className="btn btn-primary"> Registar </Link>
      </form>
       )}


      {/*<li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>*/}

  </div>
</nav>
        
    );
}

}