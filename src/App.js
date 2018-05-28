import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Tachyons from 'tachyons';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import WelcomeBar from './components/WelcomeBar';
import ImageInputURLBox from './components/ImageInputURLBox';
import FaceRecognitionBox from './components/FaceRecognitionBox';
import SignInBox from './components/SignInBox';
import RegisterBox from './components/RegisterBox';

const app = new Clarifai.App({
  apiKey: 'a228021269cc4de98b76626fbe110797'
 });

const LoggedIn = (props) => props.isLoggedIn ? props.children : 
(props.userState ==="home") ? 
(<div className="flex justify-center pa5">Please Sign In to use the face recognition service</div>): null;

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      imageurl: '',
      bottom_row: '',
      top_row: '',
      left_col: '',
      right_col: '',
      box: {},
      userState: 'home',
      UserID: '',
      entries: '',
      isLoggedIn: false,
      user: {
        email: '',
        name: '',
        entries: '0'
      }
    }
  }
  
  incrementEntries = () => {
    fetch("http://localhost:3001/image", {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.UserID
      })
    })
    .then(response => response.json())
    .then(userData => {
      this.setState(Object.assign(this.state.user, {entries: userData.entries}))
    })
    .catch(err => console.log);
  }

  onURLInput = (e) => {
    this.setState({imageurl: e.target.value}, 
      () => {
        app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.imageurl)
        .then(
          (response) => {
            const {bottom_row, top_row, left_col, right_col} = response.outputs[0].data.regions[0].region_info.bounding_box;
            this.setState({bottom_row: bottom_row, top_row: top_row, left_col: left_col, right_col: right_col}
          , this.boxCoordinates)})
        .catch((err) => console.log(err))
          });
  }

  boxCoordinates = () => {
    const image = document.getElementById('faceimg');
    const width = Number(image.width);
    const height = Number(image.height);
    const {bottom_row, top_row, left_col, right_col} = this.state;
    const boxCoordinates = {
      top_row: height * top_row,
      bottom_row: height - (height * bottom_row),
      left_col: width * left_col,
      right_col: width - (width * right_col)
    }
    this.incrementEntries(); // increment faces detected by user
    return this.setState({box: boxCoordinates});
  }
  
  userInfo = (id) => {
    this.setState({
      UserID: id
    })
    fetch(`http://localhost:3001/profile/${id}`)
    .then(res => res.json())
    .then(userData => {
    this.setState(
        Object.assign(this.state.user,{
          name: userData.name,
          email: userData.email,
          entries: userData.entries
        }
    ))
    })
  };

  ChangeUserState = (state) => {
    if (state === "loggedin"){
      this.setState({isLoggedIn: true, userState: state});
    }else{
      this.setState({isLoggedIn: false, userState: state});
    }
  }
  
  render() {
    const {isLoggedIn, userState, box, imageurl, UserID} = this.state;
    const {ChangeUserState} = this;
    const {entries,name,email} = this.state.user;
      return (
      <div>
      <Logo />
      <Navigation isLoggedIn={isLoggedIn} ChangeUserState={ChangeUserState}/>
      {(userState === "signin") ? 
      (
      <SignInBox userState={userState} ChangeUserState={ChangeUserState} SetUserID={this.userInfo}/>
      ) : (userState === "register") ? 
      (
      <RegisterBox userState={userState} ChangeUserState={ChangeUserState} SetUserID={this.userInfo}/>
      ) : null }
      <LoggedIn isLoggedIn={isLoggedIn} userState={userState}>
      <WelcomeBar userName={name} entries={entries}/>
      <ImageInputURLBox onURLInput={this.onURLInput}/>
      <FaceRecognitionBox box={box} image={imageurl}/>
      </LoggedIn>
      </div>
    );
  }
}
