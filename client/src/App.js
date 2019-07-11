import React, { Component } from 'react'
import { TrainingList, NavBar, SignInUp } from './components';
import ApiService from './utils/Api';

let imgUrl ='/assets/background.jpg';
export class App extends Component {
  constructor() {
    super();
    this.api = new ApiService(); /// This is Baaaad.... shouldn't be here
    this.state = {
      authenticated: false,
      favTabSelected: false,
      user: null,
      loading: false,
      allTraining: [],
      toShow:[],
      fav:[]
    }
  }

  AuthenticateUser = async (user) => {
    this.setState({
      authenticated: true,
      user: user,
    });
    await this.getAllTraining();
    await this.updateFav();
  }

  tweakTrainingsToShow = () => {
    //filtering The Shops to show
    let toShow = this.state.allTraining.filter(x=>this.state.fav.every(favorite=>favorite._id !== x._id));
    this.setState({
      toShow:toShow
    })
  }

  getAllTraining = async() => {
    const allTraining = await this.api.get('/Trainings'); //Not a good way: Should separate the logic from display
    this.setState({
      allTraining:allTraining
    })
  }

  updateFav = async() =>{
    let fav = await this.api.get(`/users/${this.state.user._id}/Trainings`);
    this.setState({
      fav:fav
    })
    this.tweakTrainingssToShow();
  }

  toggelShowAll = ()=>{
    this.setState({
      favTabSelected: false,
    })
  }

  toggelShowFav = () => {
    this.setState({
      favTabSelected: true,
    })
  }  

  like = async (Training_id) => {
    await this.api.put(`/users/${this.state.user._id}/like/${Training_id}`);
    this.updateFav();
  }

  dislike = async (Training_id) => {
    await this.api.put(`/users/${this.state.user._id}/dislike/${Training_id}`);
    this.updateFav();
  }

  logout = ()=>{
    this.setState({
      authenticated:false,
      user:null,
    })
  }

  render() {
    let { authenticated, favTabSelected, fav, toShow } = this.state;
    return (
      <div  style ={ { backgroundImage: `url(${ imgUrl })`} }>
        <NavBar 
          toggelShowAll = {this.toggelShowAll}
          toggelShowFav = {this.toggelShowFav}
          authenticated = {this.state.authenticated}
          user = {this.state.user}
          logout = {this.logout}
        />
        {!authenticated
          && <SignInUp
            auth = {this.AuthenticateUser}
            />}

        {authenticated
          && <TrainingList
            like={this.like}
            dislike={this.dislike}
            list={favTabSelected ? fav : toShow} />}
      </div>
    )
  }
}

export default App
