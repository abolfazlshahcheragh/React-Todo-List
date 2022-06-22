let toggle = false;

document.getElementById("mode").addEventListener('click', () => {
    if (toggle) {
        document.querySelector('.container').style = `
        grid-template-areas:
            "maker maker maker maker"
            "list list list list"
            "count filter filter btn";
    `;
    toggle=false
    } else {
        document.querySelector('.container').style = `
        grid-template-areas:
            "maker maker maker maker"
            "list list list list"
            "count count btn  btn"
            "filter filter filter filter";
    `;
    toggle=true
    }
});