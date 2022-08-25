const emailIn = document.querySelector("#emailIn");
const passIn = document.querySelector("#passIn");
const subButton = document.querySelector("#submit");
const extButton = document.querySelector("#exitBtn");
let passwordValid = false;
let emailValid = false;

emailIn.addEventListener("input", validateEmail);

passIn.addEventListener("input", passValidate);

subButton.addEventListener("click", (e) => {
    validateEmail();
    passValidate();
    if (passwordValid && emailValid) {
        let options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify({
                "email": emailIn.value,
                "password": passIn.value
            })
        }
        fetch("http://localhost:3000/", options).then((res) => res.json()).then((js) => {
            document.getElementById("rEmail").innerHTML = emailIn.value;

            document.getElementById("rPass").innerHTML = passIn.value;
            document.getElementById("rPass1").innerHTML = js.pass1;
            document.getElementById("rPass2").innerHTML = js.pass2;

            document.getElementById("popUp").style.display = "flex";

        }).catch((err) => console.log("Error", err));
    }
});

extButton.addEventListener("click", (e) => {
    document.getElementById("popUp").style.display = "none";
});

function validateEmail() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (emailIn.value.match(validRegex)) {
        emailValid = true;
        emailIn.style.borderColor = "";
    } else {
        emailValid = false;
        if (emailIn.value.length > 0)
            emailIn.style.borderColor = "crimson";
        else
            emailIn.style.borderColor = "";
    }
}

function passValidate(e) {
    let passStr = passIn.value;
    if (passStr.length >= 6
        && passStr.length < 10
        && /[a-z]/.test(passStr)
        && /[A-Z]/.test(passStr)
        && /[0-9]/.test(passStr)) {
        passwordValid = true;
        passIn.style.borderColor = "";
    } else {
        passwordValid = false;
        if (passIn.value.length > 0)
            passIn.style.borderColor = "crimson";
        else
            passIn.style.borderColor = "";
    }
}