/**
 *
 * @param {string} title
 * @param {number} id
 * @returns {{type: string, payload: object }}
 */
export default function(id, title) {
    return {
        type: 'EDIT_TASK',
        payload: {id, title}
    };
}
