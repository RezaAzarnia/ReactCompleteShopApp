import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './Redux/store/store.js';
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
