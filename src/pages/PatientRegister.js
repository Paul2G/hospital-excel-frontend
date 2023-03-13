import React, { useState } from "react";

import PatientCard from "../components/PatientCard";
import PatientOffcanvas from "../components/PatientOffcanvas";
import { isDatesEquals } from "../functions/dates";
import { validateForm } from "../functions/validations";

import "../assets/css/patientregisterPage.css"
import "../assets/css/form.css";
import "../assets/css/buttons.css"

function PatientRegister(e) {
  let patients = require('../assets/json/mockpatientdata.json');
  let [checkCount, setChekCount] = useState(0);
  const [checkingResults, setCheckingResults] = useState();
  const [currentPatient, setCurrentPatient] = useState(patients[0]);

  function checkConcidences(){
    let registerForm = document.getElementById("patientRegister");

    let tempResults = patients.filter((patient) => {
      let isLastnameEquals = patient.lastname.toLowerCase() === registerForm.lastname.value.toLowerCase();
      let isLastname2Equals = patient.lastname2.toLowerCase() === registerForm.lastname2.value.toLowerCase();
      let isTelphoneEquals = patient.telphone === registerForm.telphone.value;
      let isBirthdateEquals = isDatesEquals(patient.birthdate, registerForm.birthdate.value);

      return (
        ( isLastnameEquals && isLastname2Equals) ||  isTelphoneEquals || isBirthdateEquals 
      );
    });

    setChekCount(tempResults.length)
    setCheckingResults(tempResults);
  }

  function savePatient(e){
    e.preventDefault();

    let registerForm = document.getElementById("patientRegister");
    let validation = validateForm(registerForm);

    displayErrorMessage(validation);

    if(!validation.error) {
      patients.push(validation.patient);
      registerForm.reset();
    }
  }

  function displayErrorMessage(validation){
    let spanMessage = document.getElementById("spanMessage");

    if(validation.error){
      spanMessage.classList.add("error");
      spanMessage.innerText = validation.message;
    } else {
      spanMessage.classList.remove("error");
      spanMessage.innerText = "Asegurate de llenar correctamente todos los campos.";
    }
  }

  function showPatientInfo(patient){
    setCurrentPatient(patient);
  }

  return (
    <div className="patient-register">
      <div className="register">
        <h1>Registro de paciente</h1>
        <form id="patientRegister" className="patient-register" onSubmit={savePatient}>
          <label>
            Nombre
            <input type="text" name="firstname" placeholder="Nombre(s)" required />
          </label>
          <label>
            Apellido paterno
            <input type="text" name="lastname" placeholder="Apellido paterno" onBlur={checkConcidences} required />
          </label>
          <label>
            Apellido materno
            <input type="text" name="lastname2" placeholder="Apellido materno" onBlur={checkConcidences}/>
          </label>
          <label>
            Fecha de nacimiento
            <input type="date" name="birthdate" placeholder="Fecha de nacimiento" onBlur={checkConcidences} required />
          </label>
          <label>
            Género
            <select name="genre" defaultValue="0" required>
              <option value="0" disabled>Seleccione su género...</option>
              <option>Hombre</option>
              <option>Mujer</option>
              <option>Otro</option>
            </select>
          </label>
          <label>
            Estado civil
            <select name="civilstatus" defaultValue="0" required>
              <option value="0" disabled>Seleccione su estado civil...</option>
              <option>Soltero</option>
              <option>Casado</option>
              <option>Unión libre</option>
            </select>
          </label>
          <label>
            Teléfono principal
            <input type="tel" name="telphone" placeholder="Numero telefónico" onBlur={checkConcidences} required />
          </label>
          <label>
            Tipo de teléfono
            <select name="teltype" defaultValue="0" required>
              <option value="0" disabled>Seleccione su tipo de teléfono...</option>
              <option>Fijo</option>
              <option>Celular</option>
            </select>
          </label>
          <label>
            Teléfono emergencia
            <input type="tel" name="emergencytel" placeholder="Número telefónico de emergencia" required />
          </label>
          <label>
            Contacto de emergencia
            <input type="text" name="emergencycontact" placeholder="Nombre de contacto de emergencia" required/>
          </label>
          <label>
            Correo principal
            <input type="email" name="email" placeholder="Correo electrónico"/>
          </label>
          <label>
            Seguro de gastos médicos
            <select name="insurance" defaultValue="0" required>
              <option value="0" disabled>Seleccione su aseguradora...</option>
              <option>Ninguno</option>
              <option>Aseguradora 1</option>
              <option>Aseguradora 2</option>
              <option>Aseguradora 3</option>
            </select>
          </label>
          <div className="send-area">
            <span id="spanMessage" className="span-message">Asegurate de llenar correctamente todos los campos.</span>
            <button type="submit" className="primary-button">
                Guardar
            </button>
          </div>
        </form>
      </div>
      <div className="concidence">
          <h3>Posibles coincidencias ({checkCount})</h3>
          {checkingResults?.map((patient, i) => 
            <PatientCard key={i} patientData={patient} showPatientInfo={showPatientInfo}/>
          )}
          <PatientOffcanvas 
            currentPatient={currentPatient}
          />
      </div> 
    </div>
  );
}

export default PatientRegister;
