export const changePersonalData = (obj) => {
    return {
        type: 'CHANGE_PERSONAL_DATA',
        payload: obj
    };
};

export const changeFirstName = (firstName) => {
    return {
        type: 'CHANGE_FIRST_NAME',
        payload: firstName
    };
};