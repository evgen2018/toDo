import React from 'react';
import PropTypes from 'prop-types';
import './InputPannel.css';
import ValidationError from './ValidationError';

class InputPannel extends React.Component{
    static propTypes = {
        addTask: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);

        this.state={
            isValid:true,
            inputAddTask:''
        };
    }

    inputChange = (e) => {
        this.setState({inputAddTask: e.target.value});
    };

    addTask = () =>{
        if (this.checkValid()) {
            let date = new Date();
            this.props.addTask(this.state.inputAddTask, date.getTime());
            this.setState({inputAddTask:''});
            this.validTrue();
        } else {
            this.validFalse();
        }
    };

    onKeyDown = (e) =>{
        e.keyCode === 13 && this.addTask();
    };

    checkValid = () =>{
        return /^(\s?[a-zа-яё0-9(),.!-]{1,20}\s?){1,14}$/i.test(this.state.inputAddTask);
    };

    validTrue = () =>{
        this.setState({isValid:true})
    };

    validFalse = () =>{
        this.setState({isValid:false})
    };

    render(){
        const {isValid, inputAddTask} = this.state;

        return (
            <div className="form-group">
                {isValid || <ValidationError />}

                <input type="text"
                       className='form-control input-add-task'
                       placeholder="To do ..."
                       value={inputAddTask}
                       onKeyDown={this.onKeyDown}
                       onChange={this.inputChange}/>

                <button className='btn btn-success btn-add-task'
                        onClick={this.addTask}>
                        Add Task
                </button>
            </div>
        )
    }
}

export default InputPannel
