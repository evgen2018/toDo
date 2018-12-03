import React from 'react';
import App from '../components/App';
import configureStore from 'redux-mock-store'

import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('App list test', () => {

    const initialState = {
        subscribe:() => {},
        dispatch:() => {},
        getState:() => {},
        tasks: [],
        selected: [],
    }
    const mockStore = configureStore();
    const props = {
        actions: {
            addTask: () => {},
            reOrderTasks: () => {},
            editTask: () => {},
            deleteTask: () => {},
            addSelect: () => {},
            deleteSelect: () => {},
        }
    };
    let store, wrapper;

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = shallow(<App store={store} {...props}/> )
    })

    it('App renders properly', ()=>{
        expect(wrapper).toMatchSnapshot();
    });

    it('check action ADD_TASK on dispatching', ()=>{
        store.dispatch({
            type: 'ADD_TASK',
            payload: {}
        });
        let action = store.getActions();
        expect(action[0].type).toBe("ADD_TASK")
    });

    it('check action ADD_SELECT on dispatching', ()=>{
        store.dispatch({
            type: 'ADD_SELECT',
            payload: {title:'someTitle', id:123}
        });
        let action = store.getActions();
        expect(action[0].type).toBe("ADD_SELECT")
    });

    it('check action DELETE_TASK on dispatching', ()=>{
        store.dispatch({
            type: 'DELETE_TASK',
            payload: {}
        });
        let action = store.getActions();
        expect(action[0].type).toBe("DELETE_TASK")
    });

    it('check action DELETE_SELECT on dispatching', ()=>{
        store.dispatch({
            type: 'DELETE_SELECT',
            payload: {}
        });
        let action = store.getActions();
        expect(action[0].type).toBe("DELETE_SELECT")
    });

    it('check action EDIT_TASK on dispatching', ()=>{
        store.dispatch({
            type: 'EDIT_TASK',
            payload: {}
        });
        let action = store.getActions();
        expect(action[0].type).toBe("EDIT_TASK")
    });

    it('check action REORDER_TASKS on dispatching', ()=>{
        store.dispatch({
            type: 'REORDER_TASKS',
            payload: {}
        });
        let action = store.getActions();
        expect(action[0].type).toBe("REORDER_TASKS")
    });

});