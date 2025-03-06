// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../style/login.css';
// import { Link, useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
  
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(''); // Reset error message on new attempt

//     try {
//       const response = await axios.post('http://localhost:4000/auth/register', {
//         username,
//         email,
//         password
//       });
      
//       if (response.data && response.data.success) {
//         alert('Signup successful');
//         setUsername('');
//         setEmail('');
//         setPassword('');
//         navigate('/login');
//       } else {
//         setErrorMessage(response.data.message || 'Signup failed. Please try again.');
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className='login_body'>
//       <div className='container_login'>
//         <h2>Signup</h2>
//         {errorMessage && <p className='error_message'>{errorMessage}</p>}
//         <form onSubmit={handleSubmit} className='login-form'>
//           <input
//             placeholder='Enter Username'
//             type='text'
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className='INput_My'
//           />
//           <input
//             placeholder='Enter Email'
//             type='email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className='INput_My'
//           />
//           <input
//             placeholder='Enter Password'
//             type='password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className='INput_My'
//           />
//           <button type='submit'>Sign Up</button>
//           <p>Already have an account?{' '}
//             <Link to='/login' id='links'>Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import '../style/login.css';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


// export const Signup = () => {
//     const [Username , setname]  =  useState('')
//     const [email , setemail]  =  useState('')
//     const [password , setpassword]  =  useState('')

//    const navigate = useNavigate()

// async function HandleSubmit(e){
//     e.preventDefault();
   
      
//     try {
//         const  response =  await axios.post('http://localhost:4000/auth/register' , {
//             Username,
//             email,
//             password
//         })
//         console.log(Username)
//         console.log(email)
//         console.log(password) 
//         setname("")
//         setemail("")
//         setpassword("")
//         await navigate('/login')
//     } catch (error) {
//         console.log(
//             "something went wrong "
//         )
//     }


//  }


//   return (
//     <>  
//      <div className='login_body'>
//      <div className='container_login'>
//      <h2>Signup</h2>
//     <form onSubmit={HandleSubmit} className='login-form '>

//     <input type="text"
//       value={Username}
//       onChange={(e)=>setname(e.target.value)}
//       placeholder='Enter Username'
//       required
//        className='INput_My'
//        />

// <input type="email"
//       value={email}
//       onChange={(e)=>setemail(e.target.value)}
//       placeholder='Enter Email' 
//       required
//        className='INput_My'
//       />

// <input type="text"
//       value={password}
//       onChange={(e)=>setpassword(e.target.value)}
//       placeholder='Enter Password' 
//       required
//        className='INput_My'
//       />

// <button type='Submit'>Submit</button>

// <p> Already have an account?{' '}
//           <Link to='/login' id='links'>
//            Login
//           </Link></p>

//     </form>
//      </div>
//      </div>
     
//       </>
//   )
// }

import React, { useState } from 'react';
import axios from 'axios';
import '../style/login.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(
        'https://recipe-app-4kos.onrender.com/auth/register',
        { username, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data && response.data.success) {
        console.log('Signup Success:', response.data);
        setUsername('');
        setEmail('');
        setPassword('');
        alert('Signup successful! Redirecting to login.');
        navigate('/login');
      } else {
        setErrorMessage(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='login_body'>
      <div className='container_login'>
        <h2>Signup</h2>
        {errorMessage && <p className='error_message'>{errorMessage}</p>}
        <form onSubmit={handleSubmit} className='login-form'>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
            required
            className='INput_My'
          />

          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            required
            className='INput_My'
          />

          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required
            className='INput_My'
          />

          <button type='submit'>Sign Up</button>

          <p>
            Already have an account?{' '}
            <Link to='/login' id='links'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;