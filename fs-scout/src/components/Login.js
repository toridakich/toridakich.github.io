 
import React, { Component } from 'react';
import './Login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showLogin: true,
            error: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.getUser = this.getUser.bind(this);
        
    }

    getUser(user){
        let currentComponent = this;
        fetch('http://localhost:5000/api/user/getUserByEmail', {
            method: 'post',
            body: JSON.stringify(
                user
            ),
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(function(response){
            
            currentComponent.props.action(response.user_id, response.scout_type, response.first_name, response.last_name);
            if(response.scout_type === "Area"){
                currentComponent.props.checkArea(response);
            }
            if(response.scout_type === "Supervisor"){
                
                currentComponent.props.checkSupervisor(response);
                
                
            }
        }
         );

    }


    handleClick(event) {
        let currentComponent = this;
        const user ={
            "email": this.state.email,
            "password": this.state.password
        }

        fetch('http://localhost:5000/api/user/userLogin', {
            method: 'post',
            body: JSON.stringify(
                user
            ),
            headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
            
            if(response.status !== 400){
                currentComponent.getUser(user);
                currentComponent.setState({ showLogin: false});
            }else{
                alert("email and password do not match");
            }
        });
        
        
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    showLogin = () =>{
        return(
        <div id="loginpage">
            <div id='inner'>
            <h1 className = "loginlogo">
            login:
            </h1>
            <label>Email:
                <input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    />
            </label><br></br>
            <label> Password:
            <input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    />
            </label><br></br>
            <button type="button" id= "loginbtn" onClick={this.handleClick}>Submit </button>
            </div>
        </div>
        )
    }
    render() {
        return (
            <div>
                {this.state.showLogin ? this.showLogin(): null}
                
            </div>
        );
    }
}

export default Login;