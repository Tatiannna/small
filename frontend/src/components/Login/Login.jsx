import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/session";


const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();    
        dispatch(login({email, password}));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e => setEmail(e.target.value) } />
                <input type="password" onChange={e => setPassword(e.target.value)} />
                <input type="submit" />
            </form>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </>
    );
}

export default Login;