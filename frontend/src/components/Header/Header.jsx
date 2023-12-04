import './Header.css'
import {useDispatch} from 'react-redux';
// import Modal from '../Modal/Modal';
// import Login from '../Login/Login';
import { useState } from "react";
import { useSelector } from "react-redux";
import { login, logout } from "../../store/session";
import Modal from '../Modal/Modal';


const Header = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            { !!currentUser ? (
                <>
                    <h4>Hello {currentUser.username}</h4>
                    <button onClick={() => dispatch(logout())}>Logout</button>
                </>
                ) : (
                <>
                    {showModal && (<Modal onCloseButtonClick={() => {setShowModal(false);}}/>)}
                    <p onClick={() => setShowModal(true)}>Login</p>
                </>
            )}
        </div>
    );
}
export default Header;