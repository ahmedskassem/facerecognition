import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Tachyons from 'tachyons';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import WelcomeBar from './components/WelcomeBar';
import InputBox from './components/InputBox';
import FaceRecognitionBox from './components/FaceRecognitionBox';
import SignInBox from './components/SignInBox';
import RegisterBox from './components/RegisterBox';

const app = new Clarifai.App({
  apiKey: 'a228021269cc4de98b76626fbe110797'
 });

const LoggedIn = (props) => props.isLoggedIn ? props.children : 
(props.userState ==="home") ? 
(<div className="flex justify-center pa5">Please signup to use the face recognition service</div>): null;

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
      isLoggedIn: false
    }
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
        .catch((err) => console.log(err));
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
    return this.setState({box: boxCoordinates});
  }

  ChangeUserState = (state) => {
    if (state === "loggedin"){
      this.setState({isLoggedIn: true, userState: state});
    }else{
      this.setState({isLoggedIn: false, userState: state});
    }
  }

  render() {
    return (
      <div>
      <Logo />
      <Navigation isLoggedIn={this.state.isLoggedIn} ChangeUserState={this.ChangeUserState}/>
      <SignInBox userState={this.state.userState} ChangeUserState={this.ChangeUserState}/>
      <RegisterBox userState={this.state.userState} ChangeUserState={this.ChangeUserState}/>
      <LoggedIn isLoggedIn={this.state.isLoggedIn} userState={this.state.userState}>
      <WelcomeBar />
      <InputBox onURLInput={this.onURLInput}/>
      <FaceRecognitionBox box={this.state.box} image={this.state.imageurl}/>
      </LoggedIn>
      </div>
    );
  }
}
