function calculateAge(fecha) {
    var today = new Date();
    var birthdate = new Date(fecha);
    var age = today.getFullYear() - birthdate.getFullYear();
    var m = today.getMonth() - birthdate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    return age;
}

function isDatesEquals(firstDate, secondDate){
    let first = new Date(firstDate);
    let second = new Date(secondDate);
 
    return first.getTime() === second.getTime()
}

export {calculateAge, isDatesEquals}