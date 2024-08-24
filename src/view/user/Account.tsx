import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Button, Collapse, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function Account() {
    const { user } = useContext<any>(UserContext);


    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [isEditingContact, setIsEditingContact] = useState(false);
    const [isEditingShipping, setIsEditingShipping] = useState(false);

    const personalBtnClassName = isEditingPersonal ? 'edit-active' : ''
    const contactBtnClassName = isEditingContact ? 'edit-active' : ''
    const shippingBtnClassName = isEditingShipping ? 'edit-active' : ''
    return (
        <section className="user-info-section">
            <ul className="user-info-list col-11 mx-auto p-0">
                <li className="my-3">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <p className="user-info-label ps-2 m-0">Personal Information</p>
                        <Button className={`${personalBtnClassName} col-1 edit-user-info-btn`} onClick={() => setIsEditingPersonal(!isEditingPersonal)}>
                            <EditIcon />
                        </Button>
                    </div>

                    <div className="col-12 col-lg-4 d-flex ps-2 mt-3">
                        <TextField className="  user-info-field" label='First name' defaultValue={user.firstName} variant="standard" type="input" disabled={!isEditingPersonal}>

                        </TextField>

                    </div>
                    <div className="col-12 col-lg-4 d-flex ps-2 mt-3">
                        <TextField className="  user-info-field" label='Last name' defaultValue={user.lastName} variant="standard" type="input" disabled={!isEditingPersonal}>

                        </TextField>

                    </div>
                    <Collapse className="col-12" in={isEditingPersonal}>
                        <div className="col-12 d-flex justify-content-end justify-content-lg-start my-3">
                            <Button className='save-changes-btn'>Save Changes</Button>
                        </div>
                        
                    </Collapse>
                </li>

                <li className="my-3">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <p className="user-info-label ps-2 m-0">Contact Information</p>
                        <Button className={`${contactBtnClassName} col-1 edit-user-info-btn`} onClick={() => setIsEditingContact(!isEditingContact)}>
                            <EditIcon />
                        </Button>
                    </div>
                    <div className="col-12 col-lg-4 d-flex ps-2 mt-3">
                        <TextField className="  user-info-field" label='Email' defaultValue={user.email} variant="standard" type="email" disabled={!isEditingContact}>

                        </TextField>

                    </div>

                    <Collapse className="col-12" in={isEditingContact}>
                        <div className="col-12 d-flex justify-content-end justify-content-lg-start my-3">
                            <Button className='save-changes-btn'>Save Changes</Button>
                        </div>
                        
                    </Collapse>
                </li>
                <li className="my-3">
                    <div className="col-12 d-flex justify-content-between align-items-center ">
                        <p className="user-info-label ps-2 m-0">Shipping Information</p>
                        <Button className={`${shippingBtnClassName} col-1 edit-user-info-btn`} onClick={() => setIsEditingShipping(!isEditingShipping)}>
                            <EditIcon />
                        </Button>
                    </div>

                    <div className="col-12 col-lg-4 d-flex ps-2 mt-3">
                        <TextField className="  user-info-field" label='Address' defaultValue={user.address? user.address : 'Address'} variant="standard" type="input" disabled={!isEditingShipping}>

                        </TextField>

                    </div>
                    <div className="col-12 col-lg-4 d-flex ps-2 mt-3">
                        <TextField className="  user-info-field" label='City' defaultValue={user.city? user.city : 'City'} variant="standard" type="input" disabled={!isEditingShipping}>

                        </TextField>

                    </div>
                    <div className="col-12 col-lg-4 d-flex ps-2 mt-3">
                        <TextField className="  user-info-field" label='Zip code' defaultValue={user.zipCode? user.zipCode : 'Zip'} variant="standard" type="input" disabled={!isEditingShipping}>

                        </TextField>

                    </div>
                    <div className="col-12 col-lg-4 d-flex ps-2 mt-3">
                        <TextField className="  user-info-field" label='Country' defaultValue={user.country? user.country : 'Country'} variant="standard" type="input" disabled={!isEditingShipping}>

                        </TextField>

                    </div>
                    <Collapse className="col-12" in={isEditingShipping}>
                        <div className="col-12 d-flex justify-content-end justify-content-lg-start my-3">
                            <Button className='save-changes-btn'>Save Changes</Button>
                        </div>
                        
                    </Collapse>
                </li>
            </ul>

        </section>
    );
}