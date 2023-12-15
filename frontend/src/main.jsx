import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import  {Provider} from 'react-redux';
import configureStore from './store/store';
import { restoreCSRF } from './store/csrf';



const initializeApp = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  let initialState;
  if (currentUser) {
    initialState = {
      session: {
        currentUserId: currentUser.id
      },
      users: {
        [currentUser.id]: currentUser
      }
    }
  }

  const store = configureStore(initialState);

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
      <App/>
      </Provider>
    </React.StrictMode>
  );

}

restoreCSRF().then(initializeApp);
//initializeApp();
