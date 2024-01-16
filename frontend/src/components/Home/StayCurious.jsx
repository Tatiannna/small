import './StayCurious.css';
import Modal from '../Modal/Modal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const StayCurious = () => {

    const currentUserId = useSelector(state => state.session.currentUserId)
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(currentUserId);

    useEffect(() => {
        setIsLoggedIn(currentUserId);
    },[currentUserId])
    
    return (
        <>
            {showModal && (<Modal closeModal={() => setShowModal(false)} formType='signup' />)}
            <div className="stay-curious">
                <h1>Stay Curious.</h1>
                <h3>Discover Stories, thinking, and
                    expertise from writers on any topic.</h3>
                {!isLoggedIn && <button className='start-reading pointer' onClick={()=>setShowModal(true)}>Start exploring</button>}
            </div>
        </>
    );
}

export default StayCurious;