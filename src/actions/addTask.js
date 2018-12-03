/**
 *
 * @param {string} title
 * @param {number} id
 * @returns {{type: string, payload: object }}
 */
export default function(title, id) {
    return {
        type: 'ADD_TASK',
        payload: {title, id}
    };
}
