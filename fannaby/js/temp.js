/**
 * display differrent div in one page using onclick.
 * @author Shi Bai
 */
function displayErrorPage(){
    x = document.getElementById("link-processing");
    x.style.display="none";
    y = document.getElementById("link-error");
    y.style.display="block";
}

function displaySuccessPage(){
    x = document.getElementById("link-error");
    x.style.display="none";
    y = document.getElementById("link-success");
    y.style.display="block";
}