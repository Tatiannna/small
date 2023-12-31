import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Home from './components/Home/Home';
import StoryShow from './components/Story/StoryShow';
import TopicIndex from './components/Topics/TopicIndex';
import TopicShow from './components/Topics/TopicShow';
import UserShow from './components/Users/UserShow';
import WriteStory from './components/Story/WriteStory';
import EditStory from './components/Story/EditStory';

const router = createBrowserRouter([

  { 
    path: "/", 
    element: <Home />
  },

  {
    path: "/*",
    element: < Navigate to="/" />
  },

  {
    path: "/user/:username",
    element: <UserShow />
  },

  {
    path: "/:username/:storyTitle",
    element: <StoryShow />
  },

  {
    path: "/explore-topics",
    element: <TopicIndex />
  },

  {
    path: "/tag/:topicName",
    element: <TopicShow />
  },

  {
    path: "/new-story",
    element: <WriteStory/>
  },

  {
    path: "/story/:storyTitle/edit",
    element: <EditStory />
  }
])

function App() {
  return(
    <RouterProvider router={router} />
  );
}

export default App;
