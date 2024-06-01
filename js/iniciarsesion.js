function iniciarSesion(){
var user = document.getElementById('user').value;
var password = document.getElementById('password').value;
    if(user == "general" && password == "123") {
        window.location.href = 'html/menugeneral.html';
    }else if (user == "administrador" && password == "123") {
        window.location.href = "html/menuadministrador.html";
    } else {
        alert("Usuario o contraseña errado");
        nuevo();
    }
}

function nuevo() {
    user.value = "";
    password.value = "";
    user.focus();
}