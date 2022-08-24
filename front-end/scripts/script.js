const emailIn = document.querySelector("#emailIn");
const passIn = document.querySelector("#passIn");
const subButton = document.querySelector("#submit");
const extButton = document.querySelector("#exitBtn");
let passwordValid = false;
let emailValid = false;

emailIn.addEventListener("input", (e) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (e.target.value.match(validRegex)) {
        emailValid = true;
        e.target.style.borderColor = "";
    } else {
        emailValid = false;
        if (e.target.value.length > 0)
            e.target.style.borderColor = "crimson";
        else
            e.target.style.borderColor = "";
    }
});

passIn.addEventListener("input", (e) => {
    let passStr = e.target.value;
    if (passStr.length >= 6
        && passStr.length < 10
        && /[a-z]/.test(passStr)
        && /[A-Z]/.test(passStr)
        && /[0-9]/.test(passStr)) {
        passwordValid = true;
        e.target.style.borderColor = "";
    } else {
        passwordValid = false;
        if (e.target.value.length > 0)
            e.target.style.borderColor = "crimson";
        else
            e.target.style.borderColor = "";
    }
});

subButton.addEventListener("click", (e) => {
    if (passwordValid && emailValid) {
        let options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify({
                email: emailIn.value,
                password: passIn.value
            })
        }
        fetch("http://localhost:3000", options).then((res) => res.json()).then((js) => {
            document.getElementById("rEmail").innerHTML = emailIn.value;
            document.getElementById("rEmail1").innerHTML = js.email1;
            document.getElementById("rEmail2").innerHTML = js.email2;

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