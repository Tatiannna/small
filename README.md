# Small

Small is a [Medium](https://medium.com/) clone. Medium is recognized for hosting high quality, insightful publications covering a wide range of interesting topics. Users can read, save, create, and interact with publications. In the week of development, Small implements the following Medium features

### Features

**1. Hosting - [See Small Live!](https://small-2kuv.onrender.com/)**

**2. New account creation, Login**

**3. Stories**
    - Members can publish stories associated with a pre-existing Topic 

**4. Responses**
    - Stories can be responded to

**5. Claps**
    - Users can "applaud" Stories and Story Responses with Claps


### Technologies Used
- Rails
- PosgreSQL
- React
- Redux
- JBuilder
- BCrypt

### Feature discussion: Claps
Similar to "Likes" on most apps, Medium users can show their support a story by adding "Claps". After implementing the Clap feature intuitvely as "likes" (click the clap icon to add a Clap, and click the icon again to remove the Clap), I realized that Medium's Clap feature is very different from likes. Repeated taps to add a Clap to a Story does not remove a Clap - it adds to the Clap count. A user can repeatedly applaud a story. After the initial implementation, the logic had to be re-written. 


### The ShoryShow component:
StoryShow is where a user's publication is showcased and all of its constituents come together. Along with all of the features of the publication itself (title, subtitle, body), this component also has links to its author's profile, Comment count and modal, Clap counts, etc. Of all components, it makes the heaviest use of React's useState and Redux's useSelector, useDispatch hooks.

```
const {storyTitle} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [story, setStory] = useState(null);
    const stories = useSelector(state => state.stories);
    const topic = useSelector(state => state.topics[story?.topicId]);
    const author = useSelector(state => state.users[story?.authorId]);

    const users = useSelector(state => state.users);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = users[currentUserId];
    const isCurrentUsersStory = (currentUserId == story?.authorId);

    const [showPreviewMenu, setShowPreviewMenu] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [iconClassName, setIconClassName] = useState('clapped-false');
    
    useEffect(() => {
        setStory(Object.values(stories).find( story => story.title === storyTitle));
        
    }, [dispatch, stories, storyTitle])

    useEffect(() => {
        if(!story){
            dispatch(getStories({title: storyTitle}))
        }else{
            dispatch(clearResponses());
            dispatch(getClaps(story.id));
            dispatch(getResponses(story.id));
            dispatch(getTopic(story.topicId));
            dispatch(getUser(story.authorId));
        }
    }, [dispatch, story, storyTitle]);

    const responses = useSelector(state => state.responses);
    const numResponses = Object.values(responses).length;

    const claps = useSelector(state => state.claps);
    const numClaps = Object.values(claps).length
```
