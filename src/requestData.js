import shortid from 'shortid';

const requestData =[
    {
        id: shortid.generate(),
        firstName: "Bob",
        lastName: "Trump",
        age: 76,
        request: "Braucht Pflege nach einem KH-Aufenthalt. Teilweise mobil. Sohn wohnt 400km weit entfernt."
    },
    {
        id: shortid.generate(),
        firstName: "Maria",
        lastName: "Dorsch",
        age: 68,
        request: "Braucht Pflege nach der Diagnose Alzheimer. Kinder wohnen in der Schweiz."
    }
]

export default requestData;