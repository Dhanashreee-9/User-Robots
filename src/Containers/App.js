import React from 'react';
//import { Simulate } from 'react-dom/cjs/react-dom-test-utils.production.min';
import CardList from '../Components/CardList';
//import {robots} from './robots';
import SearchBox from '../Components/SearchBox';
import './App.css';
import Scroll from '../Components/Scroll';
import Popup from '../Components/Popup';

class App extends React.Component{

  constructor(){
      super()
      this.state ={
          robots : [], //filter method is only applied on array not on string
          searchfield : '',
        //message :'RoboHash'
        popup : false
      }
      console.log("construtor")
  }

//    changeMessage=()=>{
//       this.setState({message : 'You have subscribed successfully!!'});
//   }

  onSearchChange =(event)=>{
      this.setState({searchfield :event.target.value});
}
async componentDidMount(){ //after you want to show case 
   await fetch ('https://jsonplaceholder.typicode.com/users')
//    const data =response.json();
//    this.setState({robots : data});
//    console.log(data);
       .then(response=>{
    return response.json()
    })
    .then(users=>{
       // console.log(users);
       this.setState({robots :users})
    })
    console.log("did run")
}
// changeMessage =()=>{
//     this.setState({message: "No results found!!"});
// }
   openPopup=()=>{
       this.setState({popup:true})
   }
   closePopup=()=>{
       this.setState({popup : false})
   }

    render(){
        
        const {robots,searchfield} = this.state;
        console.log("Render")
        const filteredRobots =robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

       // console.log(filteredRobots);
      return !filteredRobots.length ?
             <h1>Loading....</h1> :
            (
                <React.Fragment>
                  {this.state.popup ? <Popup closePopup ={this.closePopup}/> : ""}  
            <div className="tc">
                
                <h1>ROBOHASH</h1>
                <button onClick={this.openPopup}>Open Popup</button>
                {/* <button type="button" onClick= {this.changeMessage} >Subscribe!!</button> */}
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                <CardList robots={filteredRobots}/>
                </Scroll>
                
               {/* {filteredRobots == 0 ? this.changeMessage : ""  } */}
            </div>
            </React.Fragment>
        )
 }
}
    export default App;