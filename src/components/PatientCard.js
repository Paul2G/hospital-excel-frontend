import React from 'react';

import {calculateAge} from '../functions/dates';
import { openOffcanvas } from './Offcanvas';

import "../assets/css/patientcard.css";
import avatarDefault from "../assets/images/default-avatar.jpg"

function PatientCard(props) {
    let patient = props.patientData;

    function showPatientDataOffcanvas(){
        props.showPatientInfo(patient);
        openOffcanvas();
    }

    return (
        <div className="card-container">
            <div className="patient-card" onClick={showPatientDataOffcanvas}>
                <div className='avatar-pic'>
                    <img src={avatarDefault} alt="Avatar" />
                </div>
                <div className='patient-data'>
                    <div>
                        <span className="dataname">Nombre:&nbsp;</span>
                        {patient.fullname}
                    </div>
                    <div>
                        <span className="dataname">Edad:&nbsp;</span>
                        {calculateAge(patient.birthdate) + " años"}
                    </div>
                    <div>
                        <span className="dataname">Teléfono:&nbsp;</span>
                        {patient.telphone}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PatientCard;