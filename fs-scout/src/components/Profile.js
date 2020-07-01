
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
            filteredEvals: []
        }

        this.showPop = this.showPop.bind(this);
        
        this.onSearch = this.onSearch.bind(this);
        
    }



        onSearch = e =>{
            this.setState({
                term: e.target.value
            })
            
            var searchedEvals = 
                this.props.evals.filter((evaluation) =>{
                    
                    return evaluation.first_name === e.target.value;
                
                })
            
            
            this.props.search(searchedEvals);
        }
        showPop(e) {
            
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

                </div>
            )
        }


          
        

        
        render(){
            return(
                
                <div id={this.props.evals.length >= 6 ? "aptLength" : "short"} >
                <input type='text' id="searchBar" onChange={this.onSearch} value={this.state.term || ''}/> 
                {this.props.evals.map((evaluation, key) => (
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