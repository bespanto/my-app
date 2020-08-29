import shortid from 'shortid';

const personalDataSet =[
    {
        id: shortid.generate(),
        firstName: "Bob",
        lastName: "Trump",
        address: "Bolzmannstr 32, 15983 Niemandsdorf",
        phone: "0176 342 766 22"
    },
    {
        id: shortid.generate(),
        firstName: "Maria",
        lastName: "Dorsch",
        address: "Bolzmannstr 32, 33377 Holzhausen",
        phone: "0153 554 783 43"
    }
]

export default personalDataSet;