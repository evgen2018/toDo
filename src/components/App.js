import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {connect} from 'react-redux';
import TasksList from "./TasksList";
import InputPannel from "./InputPannel";
import {bindActionCreators} from 'redux';
import addTask from '../actions/addTask';
import deleteTask from '../actions/deleteTask';
import editTask from '../actions/editTask';
import reOrderTasks from '../actions/reOrderTasks';
import deleteSelect from '../actions/deleteSelect';
import addSelect from '../actions/addSelect';

class App extends React.Component{
    static propTypes = {
        tasks: PropTypes.array.isRequired,
        selected: PropTypes.array.isRequired,
        actions: PropTypes.shape({
            addTask: PropTypes.func.isRequired,
            reOrderTasks: PropTypes.func.isRequired,
            editTask: PropTypes.func.isRequired,
            deleteTask: PropTypes.func.isRequired,
            addSelect: PropTypes.func.isRequired,
            deleteSelect: PropTypes.func.isRequired
        }).isRequired
    };

    toggleSelectTask = (id) =>{
        const {addSelect, deleteSelect}=this.props.actions;

        if (!this.props.selected.includes(id) ){
            addSelect(id)
        } else {
            deleteSelect(id)
        }
    };

    deleteTask = (id) =>{
        this.props.actions.deleteTask(id);
    };

    editTask = (id, value) =>{
        this.props.actions.editTask(id, value);
    };

    reOrderTasks = (tasks) =>{
        this.props.actions.reOrderTasks(tasks);
    };

    render(){
        return (<div>
                    <InputPannel
                        onKeyDown={this.onKeyDown}
                        onChange={this.inputChange}
                        addTask={this.props.actions.addTask}/>

                    <TasksList
                        tasks={this.props.tasks}
                        selected={this.props.selected}
                        toggleSelectTask={this.toggleSelectTask}
                        deleteTask={this.deleteTask}
                        editTask={this.editTask}
                        reOrderTasks={this.reOrderTasks}/>
                </div>
        )
    }
}

export default connect(store=>({
            tasks: 	  store.tasks,
            selected: store.selected,
        }),
        dispatch=>({
            actions: bindActionCreators({
                deleteSelect,
                addSelect,
                addTask,
                deleteTask,
                editTask,
                reOrderTasks
                }, dispatch)
        })
    )(App);
