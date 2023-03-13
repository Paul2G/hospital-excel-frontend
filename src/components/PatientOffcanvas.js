import React from 'react';
import Offcanvas from './Offcanvas';

import "../assets/css/patientoffcanvas.css";
import formfields from "../assets/json/formfields.json"
import avatarDefault from "../assets/images/default-avatar.jpg";

function PatientOffcanvas(props) {
  let patient = props.currentPatient;

  return (
    <Offcanvas content="patient">
      <h2>Información del paciente</h2>
      <div className='avatar-pic'>
        <img src={avatarDefault} alt="Avatar" />
      </div>
      <div className='patient-info'>
        <div className='info-block'>
          <h3>Personal</h3>
          {formfields.filter(d => d.group === "personal").map((dataname, i) => 
              <div key={i}>
                <span className="dataname">{dataname.name}:&nbsp;</span>
                {dataname.id !== "birthdate" ? patient[dataname.id] : new Date(patient[dataname.id]).toLocaleDateString("es-MX", {timeZone: "UTC"})}
              </div>
            )
          }
        </div>
        <div className='info-block'>
          <h3>De contacto</h3>
          {formfields.filter(d => d.group === "contact").map((dataname, i) => {
            return( patient[dataname.id] !== "" ?
              <div key={i}>
                <span className="dataname">{dataname.name}:&nbsp;</span>
                {patient[dataname.id]}
              </div>
              : ""
            );
          })
          }
        </div>
      </div>
    </Offcanvas>
  )
}

export default PatientOffcanvas;