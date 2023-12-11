import { useDispatch, useSelector } from 'react-redux';
import './ResponseMenu.css'
import { deleteResponse, getResponses } from '../../store/responses';
import { useEffect } from 'react';


const ResponseMenu = (props) => {

    const dispatch = useDispatch();
    const responses = useSelector(state => state.responses);

    // useEffect(()=> {
    //     dispatch(getResponses(props.response.id));
    // }, [dispatch, props.response.id])

    return (
             <div className="response-menu-modal">
                <p>Edit</p>
                <p onClick={() => dispatch(deleteResponse(props.response))}>Delete</p>
            </div>
    );
}

export default ResponseMenu;