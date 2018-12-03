import React from "react";
import PropTypes from 'prop-types';
import './TaskItem.css';
import classNames from 'classnames';

class TaskItem extends React.Component{
    static propTypes = {
        selected: PropTypes.array.isRequired,
        editTask: PropTypes.func.isRequired,
        taskData: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired,
        deleteTask: PropTypes.func.isRequired,
        isAnyTaskEditing: PropTypes.bool.isRequired,
        toggleSelectTask: PropTypes.func.isRequired,
        toggleEditing: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state={
            isCurrentTaskEditing:false,
            taskTitle: props.taskData.title
        };

        this.taskEditInputRef = React.createRef();
    }

    toggleEditTask = () =>{
        const {isCurrentTaskEditing} = this.state;
        this.setState({isCurrentTaskEditing: !isCurrentTaskEditing},()=>{
            if (!isCurrentTaskEditing){
                this.taskEditInputRef.current && this.taskEditInputRef.current.focus()
            }
        });

        this.props.toggleEditing();
    };

    saveEditTask = () =>{
        const {taskData, editTask} = this.props;
        editTask(taskData.id, this.state.taskTitle);
        this.toggleEditTask();
    };

    changeTaskTitle = (e) =>{
        this.setState({taskTitle: e.target.value});
    };

    toggleSelectTask = () =>{
        this.props.toggleSelectTask(this.props.taskData.id)
    };

    deleteTask = () =>{
        this.props.deleteTask(this.props.taskData.id)
    };

    render(){
        const {taskData, selected, isAnyTaskEditing} = this.props;
        const {isCurrentTaskEditing, taskTitle} = this.state;

        return (
            <li
                className={classNames(
                    'task-item',
                    isAnyTaskEditing && !isCurrentTaskEditing && 'no-clickable'
                )}>
                {isCurrentTaskEditing
                    ? <input
                        type="text"
                        className='task-edit-input'
                        ref={this.taskEditInputRef}
                        value={taskTitle}
                        onChange={this.changeTaskTitle}/>
                    : <span
                        className={classNames(
                            'task-text',
                            selected.includes(taskData.id) && 'task-text-selected'
                        )}>
                        {taskTitle}
                     </span>
                }

                {!isCurrentTaskEditing &&
                    <button
                        className='btn-icon'
                        onClick={this.deleteTask}>
                        <i className="fa fa-trash" />
                    </button>
                }
                {isCurrentTaskEditing
                    ? <button
                        className='btn btn-primary btn-save'
                        onClick={this.saveEditTask}>
                        save
                     </button>
                    : <button
                        className='btn-toggle-edit btn-icon'
                        onClick={this.toggleEditTask}>
                        <i className="fa fa-edit" />
                     </button>
                }
                {!isCurrentTaskEditing &&
                    <button
                        className='btn-icon'
                        onClick={this.toggleSelectTask}>
                        {selected.includes(taskData.id)
                            ? <i className="fa fa-minus" />
                            : <i className="fa fa-check" />}
                    </button>
                }

            </li>
        )
    }
}

export default TaskItem