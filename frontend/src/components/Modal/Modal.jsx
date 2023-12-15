import { useState } from 'react';
import './Modal.css'
import {useDispatch} from 'react-redux';
import { login } from "../../store/session";
import {createUser} from "../../store/users"

const Modal = (props) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const [formType, setFormType] = useState(props.formType);



  const handleSubmit = (e) => {

      e.preventDefault();
      if (formType === "signup"){
        dispatch(createUser({email, username, password}))
          .then(() => props.closeModal()).catch( err => setErrors(err) )
      }else {
        dispatch(login({email, password}))
          .then(() => props.closeModal()).catch( err => setErrors(err) )
      }
  }
    return (
        <div className="modal-overlay">
          <div className="modal">
            <div className='x-container'>
              <p id="x" onClick={() => props.closeModal()}> &#215; </p>
            </div>

            { formType === "login" ? <p> Welcome back. </p> : <p> Join Small</p>}

            <div className="div-errors">
              {errors['email'] && <p className="error" > {`email ${errors['email']}`}</p>}
              {errors['username'] && <p className="error" > {`username ${errors['username']}`}</p>}
              {errors['password'] && <p className="error" > {`password ${errors['password']}`}</p>}
              {errors['errors'] && <p className="error" > {errors['errors']}</p>}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="container">
                  <input className='modal-input' type="text" placeholder="Email" onChange={e => setEmail(e.target.value) } />
                  { formType === "signup" && 
                    <input type="text" 
                      placeholder="Username"
                      className='modal-input'
                      onChange={e => setUsername(e.target.value) } 
                    />}
                  <input className='modal-input' type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                  <button>Continue</button>
              </div>
            </form>
            <div className='switchforms'>

              {formType === "signup" && 
              <p className='login-form-subtitle'>
                Already have an account? 
                <span onClick={() => setFormType("login")}> Sign in</span>
              </p> }

              {formType === "login" && 
              <p className='login-form-subtitle'>
                No account? 
                <span onClick={() =>setFormType('signup')}> Create One</span>
              </p> }

            </div>
          </div>
        </div>
    );
}

export default Modal;