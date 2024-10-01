import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { persistor, store } from './network/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { UserContextProvider } from './view/user/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  /* <React.StrictMode> */
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </UserContextProvider>
      </PersistGate>
    </Provider>
 /*  </React.StrictMode> */
);
reportWebVitals();
