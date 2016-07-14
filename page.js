developerMode = true;
urlRelianceLogin = "http://reliancebroadband.co.in/reliance/startportal_isg.do";
//urlRelianceLogin = "http://192.168.0.4/PMS/Account/Logout";
urlToTestInternet = "http://www.w3schools.com/angular/customers.php";//this url may be any url which allowes cross-origin call
_isInternetConnectionAvailable = false;
userName = '388798464962';
password = '34443380';

_waitTime1sec = 1000;
_waitTime2sec = 2000;
_waitTimeRetryAutoLogin = 21000

// // Listen for messages
// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
// // If the received message has the expected format...
// //if (msg.text === 'report_back') {
// // Call the specified callback, passing
// // the web-page's DOM content as argument
// sendResponse(document.all[0].outerHTML);
// //}
// });
console.log("---------------------------------------");
console.log('%c Autologin plugin execution started !', 'background: #06a4f8; color: #fff');
console.log("---------------------------------------");
setTimeout(function () {
    AutoLogin()
}, _waitTime2sec);

function AutoLogin() {
    //consoleLog("Inside AutoLogin()");
    //debugger;
    if (!doesConnectionExist()) {
        console.log("---------------------------------------");
        console.log('%c Internet connection NOT available ', 'background: red; color: #fff');
        console.log("---------------------------------------");
        //window.open(urlRelianceLogin, '_self');
        AttemptLogin();
    }
    else {
        //consoleLog("%c==== Internet connection is available...", "color:green");
        console.log("---------------------------------------");
        console.log('%c Internet connection is available           :[Rajiv Bhardwaj] ', 'background: green; color: #fff');
        console.log("---------------------------------------");
        console.log("");
        consoleLog("Reload login page after "+_waitTimeRetryAutoLogin/1000+" seconds");

        setTimeout(function () {
            consoleLog("Reloading page...");
            window.open(urlRelianceLogin, '_self');
        }, _waitTimeRetryAutoLogin);
    }
}

function AttemptLogin() {
    consoleLog('Attempting Login...');
    //debugger;
    var eleUser = document.getElementsByName('userId');
    var elePwd = document.getElementsByName('password');
    //var eleLoginBtton = document.getElementById("btnLogin");

    if (eleUser != null && elePwd != null) {
        eleUser[0].value = userName;
        elePwd[0].value = password;
        consoleLog("Login clicked !");
        document.forms[0].submit();
        //eleLoginBtton.click();
    }
}

function doesConnectionExist() {
    //consoleLog("Inside doesConnectionExist()");
    var xhr = new XMLHttpRequest();
    var file = urlToTestInternet;
    var randomNum = Math.round(Math.random() * 10000);

    xhr.open('HEAD', file + "?rand=" + randomNum, false);

    try {
        xhr.send();

        if (xhr.status >= 200 && xhr.status < 304) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

function consoleLog(content) {
    if (developerMode) {
        //console.debug(new Date() + ": " + content);
        console.debug(content);
    }
}