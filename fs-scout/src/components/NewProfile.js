import React, { Component } from 'react';

import './NewProfile.css';

class NewProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: null,
            last_name: null,
            school_id: null,
            height: null,
            weight: null,
            position: null,
            date: null,
            location: null,
            event_type: null,
            grade: null,
            notes: null,
            video: null,
            showForm: false
            
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.onSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/eval')
       .then((response) => response.json())
       .then((responseJson) =>{
         this.setState({
           message: responseJson.data
         });
       })
     }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    

    showForm = () =>{
        return(
            <div className="form-popup" id="myForm">
            <div className='popup\_inner'> 
            <form className="form-container">
                <h2>Player Details:</h2>
                <label>
                    First name:
                    <input
                    name="first_name"
                    type="text"
                    value={this.state.first_name}
                    onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Last name:
                    <input
                    name="last_name"
                    type="text"
                    value={this.state.last_name}
                    onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    School/Organization:
                    <input
                    name="school_id"
                    type="text"
                    value={this.state.school_id}
                    onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Height:
                    <input
                    name="height"
                    type="number"
                    value={this.state.height}
                    onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Weight:
                    <input
                    name="weight"
                    type="number"
                    value={this.state.weight}
                    onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Position:
                    <input
                    name="position"
                    type="text"
                    value={this.state.position}
                    onChange={this.handleInputChange}
                    />
                </label>
                
                <h2>Event Details:</h2>
                <label>
                    Date:
                    <input
                    name="date"
                    type="date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Location:
                    <input
                    name="location"
                    type="text"
                    value={this.state.location}
                    onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Event Type:
                    <input
                    name="event_type"
                    type="text"
                    value={this.state.event_type}
                    onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Grade:
                    <input
                    name="grade"
                    type="text"
                    value={this.state.grade}
                    onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Notes:
                    <input
                    name="notes"
                    type="text"
                    value={this.state.notes}
                    onChange={this.handleInputChange}
                    />
                </label>
                
                <button type="button" className="btn2" onClick={this.onSubmit}>Create</button>
                <button type="button" className="close" onClick={() => this.setState({showForm: false})}>x</button>

            </form>
            </div>
            </div>
        );
    }



    handleSubmit(e){
        e.preventDefault();
        let currentComponent = this;
        console.log(this.props.userId);
        const{first_name, last_name, school_id, height, weight, position, date, location, event_type, grade, notes, video} = this.state;
        const user_id = this.props.userId;
        const writer = this.props.firstName + " " + this.props.lastName;
        const prof = {
            first_name,
            last_name,
            school_id,
            height,
            weight,
            position,
            user_id,
            date,
            location,
            event_type,
            grade,
            notes,
            video,
            writer
        };
        console.log({
            method: 'post',
            body: JSON.stringify(
                prof
            ),
            headers: {"Content-Type": "application/json"}
            
        });
        fetch('http://localhost:5000/api/eval/createNew', {
            method: 'post',
            body: JSON.stringify(
                prof
            ),
            headers: {"Content-Type": "application/json"}

        })
        .then(function(response){
            if(response.status === 200){
                currentComponent.props.action(prof);
                currentComponent.setState({
                    showForm: false
                });
            }else{
                alert("You need to fill all required fields")
            }
            return response.json();
        })
        .then(function(body) {
            console.log(body);
        });
        
        
        
    };


    render(){
        return(
            <div className="newProf">
            <button type="button" className="btns" onClick={() => this.setState({showForm: true})} >
            Add new
          </button>
          {this.state.showForm ? this.showForm() : null}
          </div>
        );
    }
}


export default NewProfile;