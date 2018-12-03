/**
 *
 * @param {number} id
 * @returns {{type: string, payload: object }}
 */
export default function(id) {
    return {
        type: 'DELETE_SELECT',
        payload: {id}
    };
}
