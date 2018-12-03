import React from 'react';
import TaskItem from '../components/TaskItem';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('TaskItem list test', () => {
    const props = {
        taskData: {id:123, title:'mockTitle'},
        selected:[],
        isAnyTaskEditing: false,
        editTask: ()=>{},
        deleteTask: ()=>{},
        toggleEditing: ()=>{},
        toggleSelectTask: ()=>{},
    };
    const wrapper = shallow(
        <TaskItem {...props}/>
    );

    it('TaskItem renders properly', ()=>{
        expect(wrapper).toMatchSnapshot();
    });

    it('click on the btn-toggle-edit will change state isCurrentTaskEditing', ()=>{
        expect(wrapper.state().isCurrentTaskEditing).toEqual(false);
        wrapper.find('.btn-toggle-edit').simulate('click');
        expect(wrapper.state().isCurrentTaskEditing).toEqual(true);
    });

    it('input some data to task-edit-input will change state taskTitle', ()=>{
        const input = wrapper.find('.task-edit-input').first()
        expect(wrapper.state().taskTitle).toEqual('mockTitle');
        input.simulate('change', {
            target: { value: 'mockData' }
        });
        expect(wrapper.state().taskTitle).toEqual('mockData');
    });
});

