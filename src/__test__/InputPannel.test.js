import React from 'react';
import InputPannel from '../components/InputPannel';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('InputPannel list test', () => {
    const props = {
        addTask: ()=>{},
    };
    const wrapper = shallow(
        <InputPannel {...props}/>
    );
    const input = wrapper.find('.input-add-task').first()

    it('InputPannel renders properly', ()=>{
        expect(wrapper).toMatchSnapshot();
    });

    it('input some data to input-add-task will change state inputAddTask', ()=>{
        expect(wrapper.state().inputAddTask).toEqual('');
        input.simulate('change', {
            target: { value: 'mockData' }
        });
        expect(wrapper.state().inputAddTask).toEqual('mockData');
    });

    it('check validation', ()=>{
        expect(wrapper.state().isValid).toEqual(true);
        input.simulate('change', {
            target: { value: '&*' }
        });
        wrapper.find('.btn-add-task').simulate('click');
        expect(wrapper.state().isValid).toEqual(false);
        input.simulate('change', {
            target: { value: 'some mockData task' }
        });
        wrapper.find('.btn-add-task').simulate('click');
        expect(wrapper.state().isValid).toEqual(true);
    });

});

