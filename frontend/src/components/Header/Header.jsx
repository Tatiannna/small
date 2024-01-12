import gitIcon from '../../../assets/github.png';
import linkedinIcon from '../../../assets/linkedin.png';
import './Header.css'
import {useDispatch} from 'react-redux';
import { useState } from "react";
import { useSelector } from "react-redux";
import { login, logout } from "../../store/session";
import Modal from '../Modal/Modal';
import {Link } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const username = useSelector(state => state.users[currentUserId]?.username);
    const [showModal, setShowModal] = useState(false);
    let [formType, setFormType] = useState("login");


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
            <div>
                {showModal && (<Modal closeModal={() => setShowModal(false)} formType={formType} />)}

                <div className="header">

                    <div className="header-left">
                        <div className="header-left-item">
                            <Link to="/"><img src="https://cdn4.iconfinder.com/data/icons/social-media-circle-7/512/Medium_circle-1024.png"></img></Link>
                        </div>
                        <div className="header-left-item">
                            <p className='small'>Small</p>
                        </div>
                        <div className='socials'>
                            <Link to="https://github.com/Tatiannna"><img className='github' src={gitIcon}></img></Link> 
                            <Link to="https://www.linkedin.com/in/tatiannna"><img className='linkedin' src={linkedinIcon}></img></Link> 
                        </div>
                    </div>


                    <div className="header-right">
                        { currentUserId ? (
                            <>
                                <div className='header-right-item'>
                                    <Link to='/new-story'><p> Write</p></Link>
                                </div>
                                <div className='header-right-item'>
                                    <Link to={`/user/${username}`}><p>Profile</p></Link>
                                </div>
                                <div className='header-right-item'>
                                    <button onClick={() => dispatch(logout())}>Logout</button>
                                </div>
                            </>
                            ) : (
                            <>
                                <div className='header-right-item'>
                                    <p className='login' onClick={handleClick}>Login</p>
                                </div>
                                <div className='header-right-item'>
                                    <button value={"signUp"} onClick={handleClick} >Get Started</button>
                                </div>
                                <div className='header-right-item'>
                                    <button className="demo-button" onClick={() => dispatch(login({email: "demo@user.io", password: "password"}))}> Demo User Login</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
    );
}
export default Header;