/**
 *
 * @param {array} tasks
 * @returns {{type: string}}
 */
export default function(tasks) {
    return {
        type: 'REORDER_TASKS',
        payload: {tasks}
    };
}
