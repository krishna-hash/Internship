const mailField = document.getElementById('mail');
const passwordField = document.getElementById('password');
const signUp = document.getElementById('signUp');


const auth = firebase.auth();

const signUpFunction = () => {
    const email = mailField.value;
    const password = passwordField.value;

    //Built in firebase function responsible for signing up a user
    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
        console.log('Signed Up Successfully !');
        window.location.assign("./profile.html");
    })
    .catch(error => {
        console.error(error);
        document.getElementById("error").textContent= "**" + error.message

    })
}

//Function called right after the signUpWithEmailAndPassword to send verification emails

signUp.addEventListener('click', signUpFunction);
