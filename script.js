var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

async function loadHTML(id, file) {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  }

async function loadElements() {
    await loadHTML("nav", "elements/nav.html");
    await loadHTML("footer", "elements/footer.html");
    await loadHTML("header", "elements/header.html");
    main();
}

function main() {
    const sidebar = document.querySelector(".sidebar-hidden");
    const caret = document.querySelector(".caret");
    const themeIcon = document.querySelector(".theme-icon");

    themeIcon.onclick = () => {
        document.body.classList.toggle("light-theme");
        themeIcon.classList.toggle("moon");
        themeIcon.classList.toggle("sun");
    };

    if (isMobile) {
        caret.onclick = () => {
            sidebar.classList.toggle("sidebar-shown");
            caret.classList.toggle("caret-clicked");
        };
        document.querySelector("main").onclick = () => {
            if (sidebar.classList.contains("sidebar-shown")) {
                sidebar.classList.remove("sidebar-shown");
                caret.classList.remove("caret-clicked");
            }
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

loadElements().catch(error => {
    console.error("Error loading elements:", error);
});