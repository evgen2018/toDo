import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from "./TaskItem";
import omit from 'object.omit';
import './TasksList.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import reorder from '../helpers/reorder';
import {getItemStyle, getListStyle} from '../helpers/changeDrugStyle';

class TaskList extends React.Component{
    static propTypes = {
        tasks: PropTypes.array.isRequired,
        selected: PropTypes.array.isRequired,
        toggleSelectTask: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
        editTask: PropTypes.func.isRequired,
        reOrderTasks: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
            isAnyTaskEditing: false
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const tasks = reorder(
            this.state.tasks,
            result.source.index,
            result.destination.index
        );

        this.props.reOrderTasks(tasks);

        this.setState({
            tasks
        });
    }

    toggleEditing = () =>{
        this.setState({isAnyTaskEditing:!this.state.isAnyTaskEditing})
    };

    componentWillReceiveProps(nextProps) {
        if(this.props !==nextProps) {
            this.setState({
                tasks: nextProps.tasks
            });
        }
    }

    render(){
        const props = omit(this.props, 'tasks');

        return (
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {this.state.tasks.length > 0 &&
                        <Droppable droppableId="droppable" isDropDisabled={this.state.isAnyTaskEditing}>
                            {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className='droppable-block'
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.tasks.map((taskData, index) => (
                                    <Draggable key={taskData.id} draggableId={taskData.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                <TaskItem
                                                    taskData={taskData}
                                                    key={index}
                                                    toggleEditing={this.toggleEditing}
                                                    isAnyTaskEditing={this.state.isAnyTaskEditing}
                                                    {...props}/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                    }
                </DragDropContext>
            )
    }
}

export default TaskList
