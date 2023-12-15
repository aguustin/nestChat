import { useContext, useState } from 'react';
import './loginSignIn.css';
import bearPng from '../../assets/bear.png';
import UserDataContext from '../../context/userDataContext';
import { useNavigate } from 'react-router-dom';


const LoginSignIn = () => {

    const navigate = useNavigate();

    const {session, loginUserContext, signInUserContext} = useContext(UserDataContext);
    
    const [changeForm, setChangeForm] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        const userData = {
            email: email,
            password: password,
        }        
        await loginUserContext(userData);

       if(session){ //---------------------------------no funciona el chequeo de si la session existe o no, revisar "if"
          navigate("/chat");
       }
    }

    const signInUser = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const repitePassword = e.target.elements.repitePassword.value;

        const userData = {
            email: email,
            password: password,
            repitePassword: repitePassword
        }
        console.log(userData);
        await signInUserContext(userData);

    }

    return(
        <>
            <div className='login-signin'>
                <div className='title'>
                    <img src={bearPng} alt=""></img>
                </div>
                {changeForm ? 
                <form className='form-login-signin' onSubmit={(e) => signInUser(e)}>
                    <div className='form-group-login-signin'>
                        <input type="text" name="email" placeholder='Email'></input>
                        <label>Email</label>
                    </div>
                    <div className='form-group-login-signin'>
                        <input type="password" name="password" placeholder='Enter password'></input>
                        <label>Password</label>
                    </div>
                    <div className='form-group-login-signin'>
                        <input type="password" name="repitePassword" placeholder='Repite password'></input>
                        <label>Repite Password</label>
                    </div>
                    <div className='form-button-login-signin'>
                        <button type="submit">Sign Account</button>
                        <button onClick={() => setChangeForm(!changeForm)}>Log in</button>
                    </div>
                </form>
                : 
                <form className='form-login-signin' onSubmit={(e) => loginUser(e)}>
                    <div className='form-group-login-signin'>
                        <input type="text" name="email" placeholder='Enter email'></input>
                        <label>Email</label>
                    </div>
                    <div className='form-group-login-signin'>
                        <input type="password" name="password" placeholder='password'></input>
                        <label>Password</label>
                    </div>
                    <div className='form-button-login-signin'>
                        <button type="submit">Login</button>
                        <button onClick={() => setChangeForm(!changeForm)}>Sign In</button>
                    </div>
                </form>}
            </div>
        </>
    )
}

export default LoginSignIn;