import './Header.css'
import {useDispatch} from 'react-redux';
// import Modal from '../Modal/Modal';
// import Login from '../Login/Login';
import { useState } from "react";
import { useSelector } from "react-redux";
import { login, logout } from "../../store/session";
import Modal from '../Modal/Modal';
import {Link } from 'react-router-dom'


const Header = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    let [formType, setFormType] = useState("login")


    const handleClick = e => {
        e.preventDefault();
        setShowModal(true);
        if (e.target.tagName === 'P'){
            setFormType("login")
        }else{
            setFormType("signup")
        }
    }

    return (
        <>
            {showModal && (<Modal toggle={setShowModal} formType={formType} onCloseButtonClick={() => {setShowModal(false);}}/>)}

            <div className="header">

            <div className="header-left">
                <div className="header-left-item">
                    <Link to="/"><img src="https://cdn4.iconfinder.com/data/icons/social-media-circle-7/512/Medium_circle-1024.png"></img></Link> 
                </div>
                <div className="header-left-item">
                    <p>Small</p>
                </div>
            </div>


            <div className="header-right">
                { !!currentUser ? (
                    <>
                        <div className='header-right-item'>
                            <p>Write</p>
                        </div>
                        <div className='header-right-item'>
                            <p>Profile</p>
                        </div>
                        <div className='header-right-item'>
                            <button onClick={() => dispatch(logout())}>Logout</button>
                        </div>
                    </>
                    ) : (
                    <>
                        <div className='header-right-item'>
                            <p onClick={handleClick}>Login</p>
                        </div>
                        <div className='header-right-item'>
                            <button value={"signUp"} onClick={handleClick} >Get Started</button>
                        </div>
                    </>
                   
                )}
            </div>
            
        </div>
        </>

    );
}
export default Header;