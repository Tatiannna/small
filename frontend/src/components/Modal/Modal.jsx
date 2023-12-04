import { useState } from 'react';
import './Modal.css'
import {useDispatch, useSelector} from 'react-redux';
import { login, logout } from "../../store/session";

function Modal() {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user);
  const loggedIn = !!currentUser;


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {

      e.preventDefault();    
      dispatch(login({email, password}));
  }

  const [showModal, setShowModal] = useState(true);

    return (
        <div className="modal-overlay">
          <div className="modal">
            {/* <p onClick={() => setShowModal(false)}>X</p> */}
              <p>Sign in with email</p>
              <form onSubmit={handleSubmit}>
                <div className="container">
                    <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value) } />
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <button>Continue</button>
                    </div>
                </form>
            </div>
          </div>
    );
}

export default Modal;