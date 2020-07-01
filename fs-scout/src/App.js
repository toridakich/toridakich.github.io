import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile';
import NewProfile from './components/NewProfile';
import logo from './images/download.png';
import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      evals: [],
      error: null,
      user_id: null,
      scout_type: null,
      first_name: null,
      last_name: null,
      users: [],
      
      count: []
    };
    this.addEval = this.addEval.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.ifArea = this.ifArea.bind(this);
    this.ifDirector = this.ifDirector.bind(this);
    this.ifSupervisor = this.ifSupervisor.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.changeEval = this.changeEval.bind(this);
    
  } 
  

  ifDirector() {
    fetch("http://localhost:5000/api/eval")
        .then(res => res.json())
        .then(
          (result) => {
            
          this.setState({ 
            evals: result
          });
        },
          (error)=>{
            this.setState({
              error
          });
        }
        )
    }

    ifArea(response){
      let currentComponent = this;

      fetch('http://localhost:5000/api/eval/getForAreaScout', {
        method: 'post',
        body: JSON.stringify(
            response
        ),
        headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(function(res){
        if(res !== "No evaluations found"){
          currentComponent.setState({
            evals: currentComponent.state.evals.concat(res)
          })
        }
        
    }
     );
    }

    ifSupervisor(response){
      
      let currentComponent = this;
      
      fetch('http://localhost:5000/api/permission/getAreaScoutIds', {
        method: 'post',
        body: JSON.stringify(
            response
        ),
        headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(function(res){
          
            currentComponent.setState({
              users: currentComponent.state.users.concat(res).concat(currentComponent.state.user_id)
            })
            
          
        }
        );
    }

    getUserById(user){
      let currentComponent = this;
     
      const data = {
        "user_id": user
      };
      fetch('http://localhost:5000/api/user/getUserByUserId', {
          method: 'post',
          body: JSON.stringify(
              data
          ),
          headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then(function(response){
        
          
          currentComponent.ifArea(response);
      })
  }

    addEval(evaluation){
      console.log('added');
      this.setState({
        evals: this.state.evals.concat([evaluation])
      })
    }

    changeEval(evaluations){
      console.log('Updating');
      this.setState({
        evals: evaluations
      })
    }

    setUserId(id, type, firstName, lastName){
      
      this.setState({
        user_id: id,
        scout_type: type,
        first_name: firstName,
        last_name: lastName
      })
      
    }

  
  

  render(){
    console.log(this.state.evals)

    if(this.state.scout_type === "Director"){
      this.ifDirector();
    }
    
    
    if(this.state.scout_type === "Supervisor" && this.state.count <=1){
      
      
      for(var i= 0; i < this.state.users.length; ++i){
       this.getUserById(this.state.users[i]);
       
     }
     this.state.count++;
      
    }
    return (
      
      
      <div className="App">
        
          <Login action={this.setUserId} checkArea={this.ifArea} checkSupervisor={this.ifSupervisor}/>
        
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />
        <header className="App-header">
          <img src={logo} alt="logo"></img>
           
        </header>
        
        
          <h1 className = "plyrs">
            Your Players:
          </h1>
        <div id='list'>
          <ul id="items">
          
          <Profile evals={this.state.evals} search={this.changeEval}/>
          </ul>
          
        </div>
        <NewProfile action={this.addEval} userId = {this.state.user_id} firstName = {this.state.first_name} lastName = {this.state.last_name}/>
        
      </div>
     
    );
  }
  
}

export default App;
