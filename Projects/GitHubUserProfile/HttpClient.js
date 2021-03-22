// <!--
//
// Author: Awais Akram
// Creation Date: 21.03.2021
// -->

var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) {
        aCallback(anHttpRequest.responseText, "success", anHttpRequest.status);
      } else if (anHttpRequest.status == 403) {
        let jsonData = anHttpRequest.responseText;
        let json = JSON.parse(jsonData);
        aCallback(anHttpRequest.responseText, json.message, anHttpRequest.status);
      } else if (anHttpRequest.status == 404) {
        let jsonData = anHttpRequest.responseText;
        let json = JSON.parse(jsonData);
        aCallback(anHttpRequest.responseText, json.message, anHttpRequest.status);
      }
    }

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  }
}