import React/* ,{useState} */ from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {  auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  

  handleSubmit = async event => {
    
    
    event.preventDefault();

    //const { displayName, email, password, confirmPassword } = this.state;

    const  displayName  = this.state.displayName;
    const email =this.state.email;
    const password=this.state.password;
    const confirmPassword=this.state.confirmPassword;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        
        email,
        password
      );

      

      this.setState = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      };

    await createUserProfileDocument(user,{displayName}/* ,email,password,confirmPassword} */);

    } catch (error) {
      console.error(error);
    }
  };


  handleChange =  event => {
    const { value,name } = event.target;
    
     this.setState({ [name]: value });

    /*  var newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
     console.log(this.state); */
    
  };  

  render() {
    //const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        
    <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={this.state.displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

/* const SignUp=()=>{
  const [state,setState] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const handleChange =(event)=>{
    const { name, value } = event.target;
    setState({ [name]: value });
  }

  const  handleSubmit = async event => {
    alert('A name was submitted: ' + this.state.value);
    
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = state;


    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      

      await createUserProfileDocument(user, { displayName });

    } catch (error) {
      console.error(error);
    }
  };
  
  return (
  <div className='sign-up'>
    <h2 className='title'>I do not have a account</h2>
    <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={state.displayName}
            onChange={handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={state.email}
            onChange={handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={state.password}
            onChange={handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={state.confirmPassword}
            onChange={handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
}

// const handleChange =(event)=>{
//   const { name, value } = event.target;
//   setState({ [name]: value });
// }

// const  handleSubmit = async event => {
//     alert('A name was submitted: ' + this.state.value);
    
//     event.preventDefault();

//     const { displayName, email, password, confirmPassword } = state;


//     if (password !== confirmPassword) {
//       alert("passwords don't match");
//       return;
//     }

//     try {
//       const { user } = await auth.createUserWithEmailAndPassword(
//         email,
//         password
//       );

//       // this.setState({
//       //   displayName: '',
//       //   email: '',
//       //   password: '',
//       //   confirmPassword: ''
//       // });

//       await createUserProfileDocument(user, { displayName });

//     } catch (error) {
//       console.error(error);
//     }
//   }; */

export default SignUp;