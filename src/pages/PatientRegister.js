import React, { useState, useEffect } from "react";
import axios from "axios";

import PatientCard from "../components/PatientCard";
import PatientOffcanvas from "../components/PatientOffcanvas";
import { isDatesEquals } from "../functions/dates";
import { validateForm } from "../functions/validations";

import "../assets/css/patientregisterPage.css"
import "../assets/css/form.css";
import "../assets/css/buttons.css";

let baseURL = window.location.protocol.concat("//").concat(window.location.host);

function PatientRegister(e) {
  let [patients, setPatients] = useState(null)
  let [checkCount, setChekCount] = useState(0);
  const [checkingResults, setCheckingResults] = useState();
  const [currentPatient, setCurrentPatient] = useState(null);

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
      axios.post(baseURL + "/api/patients", validation.patient).then((response) => {
        console.log(response.data);
      });
      //registerForm.reset();
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

  useEffect(() => {
    document.body?.classList.remove("noscroll");
    
    axios.get(baseURL + "/api/patients").then((response) => {
      if(!response.data.error){
        setPatients(response.data.patients);
        setCurrentPatient(response.data.patients[0]);
      }
    });
  }, []);

  return (
    <div className="patient-register">
      <div className="register">
        <h1>Registro de paciente</h1>
        <form id="patientRegister" onSubmit={savePatient}>
          <div className="block personal-info">
            <label>
              <span className="required">Nombre</span>
              <input type="text" name="firstname" placeholder="Nombre(s)" required />
            </label>
            <label>
              <span className="required">Apellido paterno</span>
              <input type="text" name="lastname" placeholder="Apellido paterno" onBlur={checkConcidences} required />
            </label>
            <label>
              <span>Apellido materno</span>
              <input type="text" name="lastname2" placeholder="Apellido materno" onBlur={checkConcidences}/>
            </label>
            <label>
            <span className="required">Fecha de nacimiento</span>
              <input type="date" name="birthdate" placeholder="Fecha de nacimiento" onBlur={checkConcidences} required />
            </label>
            <label>
              <span className="required">Género</span>
              <select name="genre" defaultValue="0" required>
                <option value="0" disabled>Seleccione su género...</option>
                <option>Hombre</option>
                <option>Mujer</option>
                <option>Otro</option>
              </select>
            </label>
            <label>
              <span className="required">Estado civil</span>
              <select name="civilstatus" defaultValue="0" required>
                <option value="0" disabled>Seleccione su estado civil...</option>
                <option>Soltero</option>
                <option>Casado</option>
                <option>Unión libre</option>
              </select>
            </label>
          </div>
          <div className="block contact-info">
            <label>
              <span className="required">Teléfono principal</span>
              <input type="tel" name="telphone" placeholder="Numero telefónico" onBlur={checkConcidences} required />
            </label>
            <label>
            <span className="required">Tipo de teléfono</span>
              <select name="teltype" defaultValue="0" required>
                <option value="0" disabled>Seleccione su tipo de teléfono...</option>
                <option>Fijo</option>
                <option>Celular</option>
              </select>
            </label>
            <label>
              <span className="required">Teléfono emergencia</span>
              <input type="tel" name="emergencytel" placeholder="Número telefónico de emergencia" required />
            </label>
            <label>
            <span className="required">Contacto de emergencia</span>
              <input type="text" name="emergencycontact" placeholder="Nombre de contacto de emergencia" required/>
            </label>
            <label>
              <span>Correo principal</span>
              <input type="email" name="email" placeholder="Correo electrónico"/>
            </label>
            <label>
              <span className="required">Seguro de gastos médicos</span>
              <select name="insurance" defaultValue="0" required>
                <option value="0" disabled>Seleccione su aseguradora...</option>
                <option>Ninguno</option>
                <option>Aseguradora 1</option>
                <option>Aseguradora 2</option>
                <option>Aseguradora 3</option>
              </select>
            </label>
          </div>
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
          { currentPatient !== null ? 
            <PatientOffcanvas 
              currentPatient={currentPatient}
            /> :
            <noscript>No hay nadie.</noscript>
          }
          
      </div> 
    </div>
  );
}

export default PatientRegister;
