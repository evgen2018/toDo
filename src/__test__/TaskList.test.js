import React from 'react';
import TasksList from '../components/TasksList';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('TaskList list test', () => {
    const props = {
        tasks: [{id:1, title:'mockTitle'}, {id:2, title:'mockTitle'}],
        selected:[],
        toggleSelectTask: ()=>{},
        deleteTask: ()=>{},
        editTask: ()=>{},
        reOrderTasks: ()=>{}
    };
    const wrapper = shallow(
        <TasksList {...props}/>
    );

    it('TaskList renders properly', ()=>{
        expect(wrapper).toMatchSnapshot();
    });

});

