var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

async function loadHTML(id, file) {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  }

Promise.all([
  loadHTML("header", "elements/header.html"),
  loadHTML("nav", "elements/nav.html"),
  loadHTML("footer", "elements/footer.html")
]).then(() => {
  main();
}).catch(err => console.error(err));

function main() {
    const sidebar = document.querySelector(".sidebar-hidden");
    const caret = document.querySelector(".caret");
    const themeIcon = document.querySelector(".theme-icon");
    const nav = document.querySelector("nav");
    const body = document.body;
    
    var theme = localStorage.getItem("theme") || "dark";
    if (theme === "light") {
        body.classList.add("light-theme");
        themeIcon.classList.add("moon");
        themeIcon.classList.toggle("sun");
    }

    themeIcon.onclick = () => {
        body.classList.toggle("light-theme");
        themeIcon.classList.toggle("moon");
        themeIcon.classList.toggle("sun");
        localStorage.setItem("theme", body.classList.contains("light-theme") ? "light" : "dark");
        theme = localStorage.getItem("theme");
    };

    if (isMobile) {
        caret.onclick = () => {
            sidebar.classList.toggle("sidebar-shown");
            caret.classList.toggle("caret-clicked");
            nav.classList.toggle("nav-active");
        }
        document.querySelector("main").onclick = () => {
            sidebar.classList.toggle("sidebar-shown", false);
            caret.classList.toggle("caret-clicked", false);
            nav.classList.toggle("nav-active", false);
        }
    } else {
        caret.onmouseover = () => {
            caret.classList.add("caret-hover");
        };
        sidebar.onmouseover = () => {
            caret.classList.add("caret-hover");
        };
        document.querySelector("nav").onmouseout = () => {
            caret.classList.remove("caret-hover");
        };
    }
}