export const changePersonalData = (obj) => {
    return {
        type: 'CHANGE_PERSONAL_DATA',
        payload: obj
    };
};

export const removePersonalData = (id) => {
    return {
        type: 'REMOVE_PERSONAL_DATA',
        payload: id
    };
};

export const addPersonalData = (obj) => {
    return {
        type: 'ADD_PERSONAL_DATA',
        payload: obj
    };
};