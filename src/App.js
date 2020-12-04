import React from 'react';
import {Switch,Route} from 'react-router-dom';

import './App.css'; 

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component.jsx';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {

  constructor(){
    super();

    this.state={
      currentUser:null,
      
    }
  }
  
  unsubcribeFromAuth =null;
  
  componentDidMount(){
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        //createUserProfileDocument(userAuth);
        //console.log(userAuth);
        //this.setState({currentUser:user});
        if(userAuth){
          const userRef2= await createUserProfileDocument(userAuth);
          //console.log(userRef2);
          // await userRef2.onSnapshot(snapshot =>{
          // console.log(snapshot);
          // })
          userRef2.once("value").then((snapshot)=> {
             const data = snapshot.key;
              console.log(snapshot.val());
             //console.log(data); // data === "hello"
              this.setState({
                currentUser:{
                id:data,
                ...snapshot.val()
                }
              },()=>{
                console.log(this.state); 
              })
            
          });
          
          /* console.log(this.state); */
        }
        
        this.setState({currentUser:userAuth});
        console.log(this.state);
      })
      
  }
  
  componentWillUnmount(){
    //this.unsubcribeFromAuth(); //to get null
  }
  
  render(){
    return (
        <div>
          <Header currentUser={this.state.currentUser}/>
          <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/sh' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
          </Switch>
        </div>
      );
  }
}

export default App;
