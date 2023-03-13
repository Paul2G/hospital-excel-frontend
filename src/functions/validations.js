import { calculateAge } from "./dates";

import formfields from "../assets/json/formfields.json";

const functionForValidateData = 
    {
        "word": validateWord,
        "number": validateTelphone,
        "date": validateAge,
        "email": validateEmail,
        "fullname": createFullname,
        "select": validateSelect
     }

function validateForm(form){
    let inConstructionPatient = {
        "firstname": "",
        "lastname": "",
        "lastname2": "",
        "birthdate": "",
        "genre": "",
        "civilstatus": "",
        "telphone": "",
        "teltype": "",
        "emergencytel": "",
        "emergencycontact": "",
        "email": "",
        "insurance": "",
        "fullname": ""
    }

    for(let i = 0 ; i < formfields.length ; i++){
        let tempData;
        if(formfields[i].type !== "fullname"){
            tempData = functionForValidateData[formfields[i].type](form[formfields[i].id].value);
            if(tempData.error){
                return tempData;
            }

            inConstructionPatient[formfields[i].id] = tempData.validated;
        } else if (formfields[i].type === "fullname"){
            tempData = functionForValidateData["fullname"]( form.firstname.value, form.lastname.value, form.lastname2.value);
            if(tempData.error){
                return tempData;
            }

            inConstructionPatient[formfields[i].id] = tempData.validated;
        }
    }

    return {error: false, patient: inConstructionPatient};
}

function validateWord(stringName){
    const re = new RegExp("^[a-zA-Z]*$");
    let check = re.exec(stringName);

    if(check === null)
        return {error: true, message: "Nombres y apellidos solo deben contener letras."}
    else {
        const capitalized =
        stringName.charAt(0).toUpperCase()
        + stringName.slice(1).toLowerCase()

        return {error: false, validated: capitalized}
    }
}

function validateTelphone(phoneNumber){
    const re = new RegExp("^[0-9]{10}");
    let check = re.exec(phoneNumber);

    if(check === null)
        return {error: true, message: "Números telefónicos solo deben contener números."}
    else
        return {error: false, validated: phoneNumber}
}

function validateEmail(emailAddress){
    if(emailAddress === "")
        return {error: false, validated: emailAddress};

    const re = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    let check = re.exec(emailAddress);

    if(check === null)
        return {error: true, message: "Correo electronico inválido"};
    else
        return {error: false, validated: emailAddress};
}

function validateAge(birthdate){
    const age = calculateAge(birthdate);
    if (age < 18)
        return {error: true, message: "No se puede registrar un menor de edad"};
    else
        return {error: false, validated: birthdate};
}

function createFullname(firstName, lastName, lastName2) {
    let fullname = firstName+ " " +lastName;
    if(lastName2 !== "") {
        fullname = fullname+ " " + lastName2; 
    }

    return {error: false, validated: fullname};
}

function validateSelect(select) {
    return {error: false, validated: select};
}

export {validateForm};