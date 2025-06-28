const sidebar = document.querySelector(".sidebar-hidden");
const caret = document.querySelector(".caret");
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function loadHTML(id, file){
    fetch(file)
    .then(response => {
        if (response.ok) {
            return response.text()
        }
        throw new Error(`Could not load ${file}`);
    })
    .then(html => document.getElementById(id).innerHTML = html);
}


loadHTML("header", "elements/header.html");
loadHTML("nav", "elements/nav.html");
loadHTML("footer", "elements/footer.html");


if (isMobile){
    caret.onclick = () => {
        sidebar.classList.toggle("sidebar-shown");
        caret.classList.toggle("caret-clicked");        
    }
}

