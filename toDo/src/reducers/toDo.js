/**
 *
 * @param {Object} state
 * @param {Object} action
 * @param {string} action.type
 * @param {Object} action.payload
 * @return {Object}
 */
export default function (initialStore={}, action) {

    switch(action.type){
        case 'ADD_TASK':
            return (
                {...initialStore, tasks: [...initialStore.tasks, action.payload] }
            );

        case 'EDIT_TASK':
            //find edited task, change title and put on the same position in array

            let tasks = [...initialStore.tasks];
            const editedTask = tasks.find(task => task.id === action.payload.id);
            const index = tasks.indexOf(editedTask);
            tasks.splice(index, 1, {id: action.payload.id, title:action.payload.title});

            return {...initialStore, tasks: tasks};

        case 'DELETE_TASKS':
            return (
                {...initialStore, tasks:
                        initialStore.tasks.filter((task)=>task.id !== action.payload.id)
                }
            );

        case 'REORDER_TASKS':
            return {...initialStore, tasks: action.payload.tasks};

        case 'DELETE_SELECT':
            return (
                {  ...initialStore, selected:
                        initialStore.selected.filter(select=>select !== action.payload.id) }
            );

        case 'ADD_SELECT':
            return (
                { ...initialStore, selected:
                        [...initialStore.selected, action.payload.id]}
            );

        default:
            return initialStore;
    }
}