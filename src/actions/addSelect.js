/**
 *
 * @param {number} id
 * @returns {{type: string, payload: object }}
 */
export default function(id) {
    return {
        type: 'ADD_SELECT',
        payload: {id}
    };
}
