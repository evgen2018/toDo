import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/toDo';

const initialStore={
    tasks:[],
    selected:[],
    input:'',
    valid:true,
};

const store = createStore( reducer, initialStore);

const appNode = React.createElement(App);
const providerNode = React.createElement(Provider, {store}, appNode);

ReactDOM.render(providerNode, document.getElementById('root'));