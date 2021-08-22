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
    document.getElementById("age").innerHTML = message;
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

function imageCapture() {

    var width = 320; 
    var height = 0; 
    var streaming = false;
    var video = null;
    var canvas = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        startbutton = document.getElementById('startbutton');
        canvas.style.alignSelf = 'center';
        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function(ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function(ev) {
            takepicture();
            ev.preventDefault();
        }, false);
    }


    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            localStorage.setItem(userName, data);
        } 
    }

    window.addEventListener('load', startup, false);
}
imageCapture();
let completeButton = document.getElementById('complete');
completeButton.addEventListener('click', function(ev){
    setInterval(function(){calculateAge(userName, DOB)}, 1000);
    getIP();
}, false);




/// Get and Check IP Adress START
function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}


function getIP(){
    let message;
    jsonp('https://freegeoip.app/json', function(data) {
    if(localStorage.getItem(data.ip) === null){
        localStorage.setItem(data.ip, data.country_name);
        message = "Your are a new User, Your IP Address is: " + data.ip;
    }
    else{
       message = "Your are a old User Your IP Address is: " + data.ip;
    }
   document.getElementById("ip").innerHTML = message;
});
}
/// Get and Check IP Adress END