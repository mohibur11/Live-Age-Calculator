// Bismillahir Rahmanir Rahim
// this is my first javascript code

/// for validation
function validate(username){
    return (username != null && username != "");
}
/// input username 
function userInput(){
    while(true)
    {
        let userName = prompt('Enter your username');
        if(validate(userName))
        {
            return userName;
        }
    }
}
// input date of birth
function userDOB(){
    while(true)
    {
        let DOB = prompt('Enter your Date of Birth in this format YYYY-MM-DD');
        if(validate(DOB)){
            return DOB;
        }
    }
}
// Age calculation 
function calculateAge(userName , DOB){
    let birthDate = new Date(DOB);
    let currentDate = new Date(Date.now());
    let ageInMiliSecond = currentDate - birthDate.getTime();
    let ageInDateFormat = new Date(ageInMiliSecond);
    let seconds = ageInDateFormat.getSeconds();
    let minutes = ageInDateFormat.getMinutes();
    let hours = ageInDateFormat.getHours();
    let days = ageInDateFormat.getDay();
    let months = ageInDateFormat.getMonth();
    let years = ageInDateFormat.getFullYear() - 1970;
    let message = "Hello " + userName  + " Your Age is " + years + " Years " + 
    months + " Months " + days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds";
    document.getElementById("demo").innerHTML = message;
}
let userName = userInput();
let DOB;
if(localStorage.getItem(userName) === null){
    DOB = userDOB();
    console.log(DOB);
    localStorage.setItem(userName, DOB);
}
else{
    DOB = localStorage.getItem(userName);
}
setInterval(function(){calculateAge(userName, DOB)}, 1000);
