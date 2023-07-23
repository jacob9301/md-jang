import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './store.js';
import MainRouter from './routes/MainRouter.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <MainRouter />
    </Provider>
  </React.StrictMode>
)
