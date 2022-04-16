let btnMenu = document.querySelector('.btn-menu');
let menu = document.querySelector('.list-cont');
let containerMenu = document.querySelector('.menu');
let des = document.querySelector('.bt');
let activador = true;

// MENU DE NAVEGACION ANIMACION
btnMenu.addEventListener('click', () => {

    document.querySelector('.btn-menu i').classList.toggle('fa-times');

    if (activador) {
        menu.style.left = "0";
        menu.style.transition = "0.9s";

        activador = false;

    } else {

        menu.style.left = "-100%";
        menu.style.transition = "0.5s";

        activador = true;
    }
    

});

// btnMenu.addEventListener('click', () => {

//     document.querySelector('.list-cont .lists li a').classList.toggle('fa-times');

//     if (activador) {
//         menu.style.left = "-100%";
//         menu.style.transition = "0.5s";

//         activador = false;
//     }

//     });

// INTERCALAR CLASE ACTIVE
let enlaces = document.querySelectorAll('.lists li a');

enlaces.forEach((element) => {
    element.addEventListener('click', (event) => {
        enlaces.forEach( (link) => {
            link.classList.remove('activo');
        });
        event.target.classList.add('activo');
    });
});

// EFECTOS SCROLL

let prevScrollPos = window.pageYOffset;
let goTop = document.querySelector('.ir-arriba');

window.onscroll = () => {

    let currenScrollPos = window.pageYOffset;

    // mostrar y ocultar menu
    if (prevScrollPos > currenScrollPos) {
        containerMenu.style.top = "0";
        containerMenu.style.transition = "0.5s";
    }else{
        containerMenu.style.top = "-60px";
        containerMenu.style.transition = "0.5s";
    }

    prevScrollPos = currenScrollPos;

    //mostrar y ocultar scroll estilos 
    
    let arriba = window.pageYOffset;

    if (arriba <= 600) {
        containerMenu.style.borderBottom = "none"

        goTop.style.right = "-100%";

    } else{
        containerMenu.style.borderBottom = "2px solid #ff2e63"

        goTop.style.right = "0";
        goTop.style.transition = "0.5s";
    }

}

goTop.addEventListener('click', ()  => {
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

});

let verAbajo = document.querySelector('#abajo');

verAbajo.addEventListener('click', () => {
    document.body.scrollTop = 600;
    document.documentElement.scrollTop = 600;
});

((d) => {
    const $form = d.querySelector(".form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contacto-formulario-responde");

    $form.addEventListener("submit",(e) => {
        e.preventDefault();
        $loader.classList.remove("none");
        fetch("https://formsubmit.co/ajax/juan.falco21@gmail.com",{
            method:"POST",
            body:new FormData(e.target),
        })
            .then((res) => (res.ok ? res.json():Promise.reject(res)))
            .then(json=>{
                console.log(json);
                location.hash = "#gracias";
                $form.reset();
            })
            .catch((err) => {
                console.log(err);
                let message = err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
                $response.querySelector("h3").innerHTML = `Eror ${err.status}:${message}`;
            })
            .finally(()=>{
                $loader.classList.add("none");
                setTimeout(()=>{
                    location.hash="#close"
                },3000);
            });     
    });
})(document);

function submitUserForm(){
    var response = grecaptcha.getResponse();
    if(response.length == 0){
        document.getElementById('error').innerHTML = '<span style="color: red;">Es necesario completar el captcha. </span>';
        return false;
    }
    return true;
}
function verificarCaptcha(){
    document.getElementById('error').innerHTML = '';
}