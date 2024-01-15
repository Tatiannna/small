import './StayCurious.css';
import Modal from '../Modal/Modal';
import { useState } from 'react';


const StayCurious = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (<Modal closeModal={() => setShowModal(false)} formType='signup' />)}
            <div className="stay-curious">
                <h1>Stay Curious.</h1>
                <h3>Discover Stories, thinking, and
                    expertise from writers on any topic.</h3>
                <button className='start-reading pointer' onClick={()=>setShowModal(true)}>Start reading</button>  
            </div>
        </>
    );
}

export default StayCurious;