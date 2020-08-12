import shortid from 'shortid';

const personalDataSet =[
    {
        id: shortid.generate(),
        firstName: "Bob",
        lastName: "Trump",
        address: "Bolzmannstr 32, 15983 Niemandsdorf",
        telefon: "0176 342 766 22"
    },
    {
        id: shortid.generate(),
        firstName: "Maria",
        lastName: "Dorsch",
        address: "Bolzmannstr 32, 33377 Holzhausen",
        telefon: "0153 554 783 43"
    }
]

export default personalDataSet;