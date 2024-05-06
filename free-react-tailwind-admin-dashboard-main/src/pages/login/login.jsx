import React, { useState } from "react";
import * as Components from "./Components";

function Login() {
    const [signIn, toggle] = useState(true);
    const [userName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    console.log(userName, Password)
    const handleClick = () => {

        if (userName === "pohokar@gmail.com" && Password === "Secretary") {
            localStorage.setItem('token', 'true');
            window.location.href = '/';
        } else {
            alert('Incorrect details');
        }
    };

    return (
        <div className="flex justify-center content-center flex-col h-[100vh] w-[100vw] items-center">
        <Components.Container >
            <Components.SignUpContainer signingIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type="text" placeholder="Name" />
                    <Components.Input type="email" placeholder="Email" />
                    <Components.Input type="password" placeholder="Password" />
                    <Components.Button>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>
            <Components.SignInContainer signingIn={signIn}>
                <Components.Form>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input value={userName} onChange={(e) => {
                        e.preventDefault;
                        setUserName(e.target.value);
                    }} type="email" placeholder="Email" />
                    <Components.Input value={Password} onChange={(e) => {
                        e.preventDefault;
                        setPassword(e.target.value);
                    }} type="password" placeholder="Password" />
                    <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                    <Components.Button onClick={handleClick}>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>
            <Components.OverlayContainer signingIn={signIn}>
                <Components.Overlay signingIn={signIn}>
                    <Components.LeftOverlayPanel signingIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel signingIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
        </div>
    );
}

export default Login;
