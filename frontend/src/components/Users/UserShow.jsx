import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";


const UserShow = (props) => {
    return (
        <>
            <Header/>
            <h1>User Show</h1>
        </>
    );
        
}

export default UserShow;