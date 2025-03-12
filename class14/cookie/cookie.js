//all you need is to use cookie set and get function in your page
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    let cInfo = cname + "=" + cvalue + ";" + expires + ";path=/"
    console.log(cInfo);
    document.cookie = cInfo;
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        console.log(c.substring(name.length, c.length));
        return c.substring(name.length, c.length);
      }
    }
    return false;
  }

  function getCookieGPT(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null; // Return null if the cookie is not found
}

  
