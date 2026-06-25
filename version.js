const APP_VERSION = "1.1.2";

document.addEventListener("DOMContentLoaded", () => {

    const versionElement =
    document.getElementById("version");

    if(versionElement){

        versionElement.textContent =
        `Ver ${APP_VERSION}`;

    }

});