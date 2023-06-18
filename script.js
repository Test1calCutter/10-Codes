var userLang = navigator.language || navigator.userLanguage;
var langCode = userLang.substring(0, 2);

function startCountdown(seconds) {
    let counter = seconds;
    document.getElementById('seconds').innerHTML = counter;

    const interval = setInterval(() => {
        counter--;
        document.getElementById('seconds').innerHTML = counter;
        console.log(counter)

        if (counter < 1) {
            clearInterval(interval);
            console.log(counter)
            console.log(langCode)
            if (langCode === "de") {
                window.location.assign('de/index')
            }else if (langCode === "en"){
                window.location.assign('en/index')
            }else if (langCode !== "en" | langCode !== "de"){
                window.location.assign('en/')
            }
        }
    }, 1000);
}

startCountdown(3);
