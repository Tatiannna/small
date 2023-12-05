import { useState } from 'react';
import './Modal.css'
import {useDispatch, useSelector} from 'react-redux';
import { login } from "../../store/session";
import {createUser} from "../../store/users"

const Modal = (props) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});


  const formattedErrors = () => {
    let errorsArray;
    //for 
  }

  const handleSubmit = (e) => {

      e.preventDefault();
      if (props.formType === "signup"){
        dispatch(createUser({email, username, password}))
          .then(() => props.closeModal()).catch( err => setErrors(err) )
      }else {
        dispatch(login({email, password}))
          .then(() => props.closeModal()).catch( err => setErrors(err) )
      }
  }
  console.log(errors);
    return (
        <div className="modal-overlay">
          <div className="modal">
            <p id="x" onClick={() => props.closeModal()}> &#215; </p>

            { props.formType === "login" ? <p> Welcome back. </p> : <p> Join Small</p>}

            <div className="div-errors">
              {errors['email'] && <p className="error" > {`email ${errors['email']}`}</p>}
              {errors['username'] && <p className="error" > {`username ${errors['username']}`}</p>}
              {errors['password'] && <p className="error" > {`password ${errors['password']}`}</p>}
              {errors['errors'] && <p className="error" > {errors['errors']}</p>}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="container">
                  <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value) } />
                  { props.formType === "signup" && 
                    <input type="text" 
                      placeholder="Username" 
                      onChange={e => setUsername(e.target.value) } 
                    />}
                  <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                  <button>Continue</button>
              </div>
            </form>
          </div>
        </div>
    );
}

export default Modal;