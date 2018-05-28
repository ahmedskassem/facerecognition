import React from 'react';

class RegisterBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            SignUpEmail: '',
            SignUpPassword: '',
            Name: '',
            status: ''
        }
    }   

    onNameChange = (event) => {
        this.setState({Name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({SignUpEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({SignUpPassword: event.target.value})
    } 

    onRegisterSubmit = () => {
        const {SignUpEmail, SignUpPassword, Name} = this.state;
        fetch("http://localhost:3001/register", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: Name,
                email: SignUpEmail,
                password: SignUpPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                this.props.SetUserID(data.id);
                this.props.ChangeUserState('loggedin');
            } else {
                this.setState({status: data.status})
            }
        })
    }

    render(){
        const  {ChangeUserState} = this.props;
        return (
            <div className="w-40 center shadow-2 pa2 ma2">
                <main className="pa4 black-80">
                <div className="measure center">
                    <div className="tc ma1 pa1">{this.state.status}</div>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">Name</label>
                        <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" name="name"  id="name" 
                        onChange={this.onNameChange}
                        />
                    </div>
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
                    <input onClick={this.onRegisterSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                    <a onClick={() => ChangeUserState('signin')} className="f6 link dim black db pointer">Already a User? Sign In</a>
                    </div>
                </div>
                </main> 
            </div>
        );
    }
}

export default RegisterBox;