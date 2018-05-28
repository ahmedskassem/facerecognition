import React from 'react';
import { Z_MEM_ERROR } from 'zlib';

class SignInBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            SignInEmail: '',
            SignInPassword: '',
            status: ''
        }
    }   

    onEmailChange = (event) => {
        this.setState({SignInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({SignInPassword: event.target.value})
    } 

    onSignInSubmit = () => {
        fetch("http://localhost:3001/signin", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.SignInEmail,
                password: this.state.SignInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "success"){
                this.props.SetUserID(data.id);
                this.props.ChangeUserState('loggedin')
            } else {
                this.setState({status: data})
            }
        })
    }
    render(){
    const {ChangeUserState} = this.props;
            return (
                <div className="w-40 center shadow-2 pa2 ma2">
                    <main className="pa4 black-80">
                    <div className="measure center">
                        <div className="tc ma1 pa1">{this.state.status}</div>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address" id="email-address" 
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password" id="password" 
                            onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSignInSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <a onClick={() => ChangeUserState('register')} className="f6 link dim black db pointer">Register</a>
                        </div>
                    </div>
                    </main> 
                </div>
            );
    }
}

export default SignInBox;