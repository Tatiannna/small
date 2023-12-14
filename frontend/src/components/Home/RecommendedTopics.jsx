import { Link } from "react-router-dom";
import './RecommendedTopics.css';


const RecommendedTopics = () => {
    return (
        <div className="recommended-topics-container">
            <h4>Recommended Topics</h4>
            <Link to='/tag/Photography'><button className='topic-button'>Photography</button></Link>
            <Link to='/tag/Self-Help'><button className='topic-button'>Self-Help</button></Link>
            <Link to='/tag/Data%20Science'><button className='topic-button'>Data Science</button></Link>
            <Link to='/tag/Blockchain'><button className='topic-button'>BlockChain</button></Link>
            <Link to='/tag/Movie%20Reviews'><button className='topic-button'>Movie Reviews</button></Link>
            <Link to='/tag/Cryptocurrency'><button className='topic-button'>Cryptocurrency</button></Link>
            <Link to="/explore-topics"><p className="see-more-topics">See More Topics</p></Link>
        </div>
        
    );
}


export default RecommendedTopics;