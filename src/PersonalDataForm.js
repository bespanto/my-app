import React, { useState } from "react";


function PersonalDataForm(props) {
    const [id, setId] = useState(props.id === undefined ? '' : props.id);
    const [firstName, setFirstName] = useState(props.firstName === undefined ? '' : props.firstName);
    const [lastName, setLastName] = useState(props.lastName === undefined ? '' : props.lastName);
    const [address, setAddress] = useState(props.address === undefined ? '' : props.address);
    const [phone, setPhone] = useState(props.phone === undefined ? '' : props.phone);


    function handleSubmit(e) {
        const formData = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone
        }
        setId('')
        setFirstName('');
        setLastName('');
        setAddress('');
        setPhone('');
        props.handleSubmit(e, formData)
    }

    function handleChange(event) {
        switch (event.target.name) {
            case 'firstName':
                setFirstName(event.target.value);
                break;
            case "lastName":
                setLastName(event.target.value);
                break;
            case "address":
                setAddress(event.target.value);
                break;
            case "phone":
                setPhone(event.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex-container-form">
                <div className="input-text-label">
                    First name
                </div>
                <div className="input-text">
                    <input
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-text-label">
                    Last name
                </div>
                <div className="input-text">
                    <input
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-text-label">
                    Address
                </div>
                <div className="input-text">
                    <textarea name="address" rows="4" value={address} onChange={handleChange} />
                </div>
                <div className="input-text-label">
                    Phone
                </div>
                <div className="input-text">
                    <input
                        name="phone"
                        type="text"
                        value={phone}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <input type="submit" value={props.submitButtonValue} className="button" />
            </div>
        </form>

    );
}

export default PersonalDataForm;
