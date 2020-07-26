
import React, {Component} from 'react';
import Moment from 'react-moment';

import './Profile.css';



class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null, 
            showPop: null,
            term: null,
            filteredEvals: [],
            removeEval: null
            
        }

        this.showPop = this.showPop.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.deleteEvaluation = this.deleteEvaluation.bind(this);
        this.toggle = this.toggle.bind(this);
    }



        onSearch = e =>{
            this.setState({
                term: e.target.value
            })
            
            var searchedEvals = 
                this.props.evals.filter((evaluation) =>{
                    console.log({a: evaluation.first_name, b: e.target.value, c: evaluation.first_name === e.target.value})
                    return evaluation.first_name.toLowerCase().includes(e.target.value.toLowerCase())|| evaluation.last_name.toLowerCase().includes(e.target.value.toLowerCase())
                    || evaluation.school_id.toLowerCase().includes(e.target.value.toLowerCase()) || evaluation.position.toLowerCase().includes(e.target.value.toLowerCase()) || 
                    evaluation.writer.toLowerCase().includes(e.target.value.toLowerCase());
                
                })
            
            
            this.props.search(searchedEvals);
        }

        deleteEvaluation(e){
            let currentComponent = this;
            
            const data = {
              "evaluation_id": e.evaluation_id
            };
            fetch('http://localhost:5000/api/eval/deleteEval', {
                method: 'delete',
                body: JSON.stringify(
                    data
                ),
                headers: {"Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(function(response){
              
                currentComponent.props.updateEvals(data.evaluation_id)
            })
        }

        toggle(e){

            if(this.state.removeEval == null){
                
                this.deleteEvaluation(e)
            }
        }
       
        showPop(e) {
            console.log(e.video);
            return(
                <div className="popup">
        
                    <h6>By: {e.writer}</h6><br></br>
                    <h2>Player Details: </h2><br></br>
                    <div>Name: {e.first_name} {e.last_name}</div>
                    <div>School/Organization: {e.school_id}</div>
                    <div> Position: {e.position}</div>
                    <div>Height: {e.height}</div>
                    <div> Weight: {e.weight} lbs.</div>
                    <h2>Event Details: </h2>
                    <div>Event: {e.event_type}</div>
                    <div>Location: {e.location}</div>
                    
 
            <div>Date: {e.date != null ? <Moment format="MM/DD/YYYY">{e.date.toString()}</Moment>: e.date}</div>
                    <div>Notes: </div>
                    <div>{e.notes}</div>
                    
                    <button type="button" className="close" onClick={() => this.setState({showPop: null})}>x</button>
                    <button type="button" className="deletebtn" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?'))this.toggle(e)}}>delete</button>
                    
                </div>
            )
        }

        update(e){
            
            fetch('http://localhost:5000/api/eval/updateEval', {
                method: 'patch',
                body: JSON.stringify(
                    e
                ),
                headers: {"Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(function(response){
              
                
            })
        }


        
        

        
        render(){
            return(
                
                <div id={this.props.filteredEvals.length >= 6 ? "aptLength" : "short"} >
                <input type='text' id="searchBar" onChange={this.onSearch} value={this.state.term || ''}/> 
                {this.props.filteredEvals.map((evaluation, key) => (
                    <div key={key} className = "line">
                            <div className="playerName">
                                <div className="name" onClick={() => {
                                    if(this.state.showPop === evaluation.evaluation_id){
                                        this.setState({showPop: null})
                                    }else{
                                        this.setState({showPop: evaluation.evaluation_id})
                                        
                                    }
                                    } }>
                                
                                    {evaluation.first_name} {evaluation.last_name}
                                
                                </div>
                                
                                {this.state.showPop === evaluation.evaluation_id ? this.showPop(evaluation) : null} 
                                
                                <div className="school">{evaluation.school_id}, {evaluation.position}</div>
                                <div className="writer">By: {evaluation.writer}</div>
                                
                            
                            </div>
                        </div>
                ))}
                
                    
            
            </div>

            )
        }
}




export default Profile;