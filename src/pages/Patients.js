import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import PatientCard from '../components/PatientCard';
import PatientOffcanvas from '../components/PatientOffcanvas';

import "../assets/css/patientsPage.css";
import "../assets/css/buttons.css";

let baseURL = window.location.protocol.concat("//").concat(window.location.host);

function Patients() {
  let navigate = useNavigate();
  let [patients, setPatients] = useState(null);
  const [currentPatient, setCurrentPatient] = useState(null);

  let [searchResults, setSearchResults] = useState(patients);
  let [searchCount, setSearchCount] = useState(0);
  const [wannaSearch, setWannaSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function displayPatients(){
    let patientsToShow = wannaSearch ? searchResults : patients;

    return(
      <div className='patients-list'>{
        patientsToShow.map((patient, i) => 
          <PatientCard key={i} patientData={patient} showPatientInfo={showPatientInfo}/>
        )
      }</div>
    );
  }

  function showPatientInfo(patient){
    setCurrentPatient(patient);
  }

  function searchPatients(){
    let searchField = document.getElementById("searchField");

    if(searchField.value === ""){
      setWannaSearch(false);
      return;
    }
    
    let temporalResults = patients.filter((patient) => patient.fullname.toLowerCase().includes(searchField.value.toLowerCase()));

    setSearchResults(temporalResults);
    setSearchCount(temporalResults.length);
    setWannaSearch(true);
    setSearchTerm(searchField.value);
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
    <div>
      <div className='page-header'>
        <div className="title"> 
          <h1>{"Lista de pacientes"}</h1>
          <button className="primary-button" onClick={() => navigate('/register')}>Añadir nuevo</button>
        </div>
        <div className='search-area'>
          <input id="searchField" className="search-input" placeholder='Buscar nombre...' onChange={searchPatients}/>
          <button className="primary-button">🔍︎</button>
        </div>
      </div>
      
      {wannaSearch ? 
          <h2>{searchCount} resultados de búsqueda para "{searchTerm}"</h2> : ""}
      {patients !== null ? displayPatients() : <noscript>Perdimos</noscript>}
      {currentPatient !== null ? 
        <PatientOffcanvas 
          currentPatient={currentPatient}
        /> :
        <noscript>Otra vez nadie</noscript>
      }
      
    </div>
  )
}

export default Patients;