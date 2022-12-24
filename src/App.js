
import './App.css';
import React, { Component } from 'react'
import Login from './Components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Components/Register';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword, sendEmailVerification, signInWithPopup} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCntHSsJrXMEW5yxxfcW-ezfqzYf4qDsv8",
  authDomain: "ws-servey-1fb1a.firebaseapp.com",
  databaseURL: "https://ws-servey-1fb1a-default-rtdb.firebaseio.com",
  projectId: "ws-servey-1fb1a",
  storageBucket: "ws-servey-1fb1a.appspot.com",
  messagingSenderId: "686066596166",
  appId: "1:686066596166:web:75f03addb69341c7cfcd47"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth();

  class App extends Component {
      constructor(props) {
        super(props)
      
        this.state = {
           page :1,
           message:"",
           
        }
      }
      pageSwitchHandler = (e) =>{
        this.setState({page : !this.state.page});
        e.preventDefault();
      };

      registrationHandler = (event) =>{
        event.preventDefault();
        const email=event.target.email.value;
        const password=event.target.password.value;
        const confirmPassword=event.target.confirmPassword.value;
        if(password !== confirmPassword){
          this.setState({message:"Password doesn't match"});
          return;
        }
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          const auth = getAuth();
          sendEmailVerification(auth.currentUser);
            this.setState({message:"Registration successful"},()=>{
              const email=event.target.email.value="";
              const password=event.target.password.value="";
              const confirmPassword=event.target.confirmPassword.value="";
            });
        })
        .catch((error) => {
        this.setState({message:error.message});
        });
      };

      loginHandler = (event)=>{
        event.preventDefault();
        const auth = getAuth();
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          if(data.user.emailVerified===true) {
          this.setState({message:"Login Successfull"});
          }
          else{
            this.setState({message:"Email is not verified"});
          }
        })
        .catch((error) => {
          this.setState({message:error.message});
        });
      };

      googleloginHandler=()=>{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((response)=>{
          
        })
        .catch((error)=>{

        });
      };


  render(){
    return(
      
      <div>
        {this.state.page ?<Signup switch ={this.pageSwitchHandler} 
        register={this.registrationHandler}
        message={this.state.message}
        google={this.googleloginHandler}></Signup>
        :
        <Login message={this.state.message}
        switch ={this.pageSwitchHandler}
        login={this.loginHandler}
        google={this.googleloginHandler}></Login>}
      </div>
    )
  }
}

export default App;
