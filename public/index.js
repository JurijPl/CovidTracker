function changeForm(){
    document.getElementById("registracijaStranke").style.display="block";
    document.getElementById("prijavaStranke").style.display="none";
}
function changeForm2(){
    document.getElementById("registracijaStranke").style.display="none";
    document.getElementById("prijavaStranke").style.display="block";
}

function genEhrID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function validEmail(email){
    return String(email)
        .toLowerCase()
        .match(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    );
}
function validPasswd(email){
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

/*const btn = document.getElementById('regBtn');
btn.addEventListener('click', function(e){
    var email=document.getElementById('email').value;
    var passwd=document.getElementById('password').value;
    var ime=document.getElementById('ime').value
    var priimek=document.getElementById('priimek').value;
    var starost=document.getElementById('starost').value;
    if(!validEmail(email)|| !validPasswd(passwd)||starost<14|| ime==""|| priimek=="") return;

    var stranka={
        id: genEhrID(),
        email: email,
        passwd: passwd,
        ime: ime,
        priimek: priimek,
        starost: starost
    }

    fetch('/', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(stranka)
    }).then(response => console.log(response.status));
});*/