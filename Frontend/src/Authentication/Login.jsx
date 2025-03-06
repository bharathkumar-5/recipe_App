// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../style/login.css';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(''); // Reset error message on new attempt

//     try {
//       const response = await axios.post('http://localhost:4000/auth/login', {
//         email,
//         password
//       });
      



//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('email', email);
//         alert('Login successful');
//         setEmail('');
//         setPassword('');
//         navigate('/');
//       } else {
//         setErrorMessage('Invalid response from server. Please try again.');
//       }
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(error.response.data.message || 'Invalid credentials');
//       } else {
//         setErrorMessage('Something went wrong. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className='login_body'>
//       <div className='container_login'>
//         <h2>Login</h2>
//         {errorMessage && <p className='error_message'>{errorMessage}</p>}
//         <form onSubmit={handleSubmit} className='login-form'>
//           <input
//             placeholder='Email'
//             type='email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className='INput_My'
//           />
//           <input
//             placeholder='Password'
//             type='password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className='INput_My'
//           />
//           <button type='submit'>Login</button>
//           <p>Don't have an account?{' '}
//             <Link to='/signup' id='links'>Sign up</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../style/login.css'
// import { Link } from 'react-router-dom';


// const Login = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const navigate = useNavigate()


//   const handleSubmit = async (e) => {
//     e.preventDefault()

//   try {
//     const response = await axios.post('http://localhost:4000/auth/login',{
//       email,
//       password
//     })
//       localStorage.setItem('token', response.data.token)
//       localStorage.setItem('email', email)
 
//     alert('login successfully')
//     setEmail('')
//     setPassword('')
//     await navigate('/')
//     window.location.reload();

//   } catch (error) {
//     alert('something wrong')
//   }

//   }

//   return (
//     <div className='login_body'>
//     <div className='container_login'>

//       <h2>Login</h2>
//       <form onSubmit={handleSubmit} className='login-form '>

//           <input
//           placeholder='Email'
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className='INput_My'
//           />
       
       

//           <input
//             placeholder='Password'
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className='INput_My'
//           />
      
      
//         <button type="submit">Login</button>

//         <p> Don't have an account?{' '}
//           <Link to='/signup' id='links'>
//             Sign up
//           </Link></p>

//       </form>
//     </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email);

      alert('Login successful');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='login_body'>
      <div className='container_login'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          <input
            placeholder='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='INput_My'
          />

          <input
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='INput_My'
          />

          <button type='submit'>Login</button>

          <p>
            Don't have an account?{' '}
            <Link to='/signup' id='links'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
