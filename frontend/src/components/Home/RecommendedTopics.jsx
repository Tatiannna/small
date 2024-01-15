import { Link } from "react-router-dom";
import './RecommendedTopics.css';


const RecommendedTopics = () => {
    return (
        <div className="recommended-topics-container">
            <h4>Recommended Topics</h4>
            <Link to='/tag/Photography'><button className='topic-button pointer'>Photography</button></Link>
            <Link to='/tag/Self-Help'><button className='topic-button pointer'>Self-Help</button></Link>
            <Link to='/tag/Data%20Science'><button className='topic-button pointer'>Data Science</button></Link>
            <Link to='/tag/Blockchain'><button className='topic-button pointer'>BlockChain</button></Link>
            <Link to='/tag/Movie%20Reviews'><button className='topic-button pointer'>Movie Reviews</button></Link>
            <Link to='/tag/Cryptocurrency'><button className='topic-button pointer'>Cryptocurrency</button></Link>
            <Link to="/explore-topics"><p className="see-more-topics pointer">See More Topics</p></Link>
        </div>
        
    );
}


export default RecommendedTopics;