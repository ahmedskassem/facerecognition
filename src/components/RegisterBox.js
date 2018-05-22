import React from 'react';

const RegisterBox = ({userState, ChangeUserState}) => {
    if (userState === "register"){
        return (
            <div className="w-40 center shadow-2 pa2 ma2">
                <main className="pa4 black-80">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" for="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input onClick={() => ChangeUserState('loggedin')}className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                    <a onClick={() => ChangeUserState('signin')} className="f6 link dim black db pointer">Already a User? Sign In</a>
                    </div>
                </form>
                </main> 
            </div>
        );
    } else {
        return null;
    }
}

export default RegisterBox;