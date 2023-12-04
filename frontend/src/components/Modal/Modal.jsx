import { useState } from 'react';
import './Modal.css'
import {useDispatch, useSelector} from 'react-redux';
import { login } from "../../store/session";
import {createUser} from "../../store/users"

const Modal = (props) => {

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user);
  const loggedIn = !!currentUser;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {

      e.preventDefault();

      if (props.formType === "signup"){
        dispatch(createUser({email, username, password}));
      }
      
      dispatch(login({email, password}));
  }

  const [showModal, setShowModal] = useState(true);

    return (
        <div className="modal-overlay">
          <div className="modal">
            {/* <p onClick={() => setShowModal(false)}>X</p> */}
            { props.formType === "login" ? <p> Welcome back. </p> : <p> Join Small</p>}
              <form onSubmit={handleSubmit}>
                <div className="container">
                    <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value) } />
                    { props.formType === "signup" && 
                      <input type="text" 
                        placeholder="username" 
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