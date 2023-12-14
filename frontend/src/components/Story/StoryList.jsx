import StoryPreview from './StoryPreview';

const StoryList = ({stories}) => {

    return(
        <>
             <div className="story-list-container">
                {Object.values(stories).map(story => <StoryPreview key={story?.id} story={story}/>)}
            </div>
        </>
    );
}

export default StoryList;