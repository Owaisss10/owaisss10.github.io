// <!--
//
// Author: Awais Akram
// Creation Date: 21.03.2021
// -->
/* Variables */

/* Document Ready Function */
jQuery(document).ready(function($) {
  console.log("User Profile Page - Last Updated: 22.03.2021");
  // load theme from localStorage
  loadTheme();

  $(document).on('change', '#darkThemeSwitch', function(e) {
    let state = $(this).is(':checked');
    console.log(state);
    $(this).attr("checked", state);
    $(this).trigger("click");
    if (state) {
      $("#ref-css").attr("href", "../../../dark-theme-style.css");
      $("#navBar").css("background-color", "#EC612D"); // nav bar orange color
      // saving theme path in localStorage
      localStorage.setItem("themePath", "../../../dark-theme-style.css");
    } else {
      $("#ref-css").attr("href", "../../../light-theme-style.css");
      $("#navBar").css("background-color", "#EAECEF"); // nav bar grey color
      // saving theme path in localStorage
      localStorage.setItem("themePath", "../../../light-theme-style.css");
    }
  });

  // fetching saved userName in localStorage
  let savedUserName = localStorage.getItem("userName");
  console.log(savedUserName);

  if (savedUserName == null || savedUserName == "") {
    // no username found go back to searchUser screen
    window.location.href = "../searchUser/index.html";
  } else {
    // fetch user data from api
    getUserDataFromAPI(savedUserName);
  }

});

/* Functions */

function loadTheme() {
  // fetching saved themePath from localStorage
  let savedThemePath = localStorage.getItem("themePath");
  if (savedThemePath != undefined) {
    // applying saved Theme
    $("#ref-css").attr("href", savedThemePath);

    if (savedThemePath == "../../../dark-theme-style.css") {
      $("#navBar").css("background-color", "#EC612D"); // nav bar orange color
      $("#darkThemeSwitch").attr("checked", true);
      console.log("Loading Dark theme stylesheet from: " + savedThemePath);
    } else {
      $("#navBar").css("background-color", "#EAECEF"); // nav bar grey color
      $("#darkThemeSwitch").attr("checked", false);
      console.log("Loading Light theme stylesheet from: " + savedThemePath);

    }
  }
}

function getUserDataFromAPI(userName) {
  // accessing the api base url
  const baseURL = Constants.baseURL;

  // accessing the http client for making api call
  var client = new HttpClient();
  client.get(baseURL + userName, function(response, message, statusCode) {
    let jsonData = JSON.parse(response);


    if (statusCode == 200) {
      // fetch user repos from api
      getUserReposFromAPI(userName);

      // updating the user data content on Page
      updateUserDataUI(jsonData);

    } else if (statusCode == 403) {
      alert(message + "\n Status Code: " + statusCode);
    } else if (statusCode == 404) {
      alert("Username " + message + "\n Status Code: " + statusCode);
      // no username found go back to searchUser screen
      window.location.href = "../searchUser/index.html";
    } else {
      alert("An unknown error occured \n Status Code: " + statusCode);
    }

  });
}

function getUserReposFromAPI(userName) {
  // accessing the api base url
  const baseURL = Constants.baseURL;
  const repoEndPoint = Constants.repoEndPoint;

  // accessing the http client for making api call
  var client = new HttpClient();
  client.get(baseURL + userName + repoEndPoint, function(response, message, statusCode) {
    let jsonData = JSON.parse(response);

    if (statusCode == 200) {
      // removing the dimScreen class
      let dimScreen = document.getElementById("dimScreen");
      dimScreen.classList.remove("overlay");

      // updating the repo data on Page
      updateRepoDataUI(jsonData);

    } else if (statusCode == 403) {
      alert(message + "\n Status Code: " + statusCode);
    } else if (statusCode == 404) {
      alert("Repos " + message + "\n Status Code: " + statusCode);
    } else {
      alert("An unknown error occured \n Status Code: " + statusCode);
    }

  });
}

function updateUserDataUI(data) {
  // fetching saved userName in localStorage
  let savedUserName = localStorage.getItem("userName");

  // page title heading
  let username = document.getElementById("username");
  username.innerHTML = data.login ? data.login : savedUserName;


  // left top card data
  let imgURL = document.getElementById("imgURL");
  let fullName = document.getElementById("fullName");
  let company = document.getElementById("company");
  let location = document.getElementById("location");
  let followers = document.getElementById("followers");
  let following = document.getElementById("following");

  imgURL.src = data.avatar_url ? data.avatar_url : "https://cdn0.iconfinder.com/data/icons/octicons/1024/mark-github-512.png";
  fullName.innerHTML = data.name ? data.name : "-";
  company.innerHTML = data.company ? data.company : "-";
  location.innerHTML = data.location ? data.location : "-";
  followers.innerHTML = data.followers ? data.followers : "0";
  following.innerHTML = data.following ? data.following : "0";

  // left bottom card data
  let github = document.getElementById("github");
  let twitter = document.getElementById("twitter");
  let repos = document.getElementById("repos");
  let gists = document.getElementById("gists");
  let joinedOn = document.getElementById("joinedOn");


  github.innerHTML = data.login ? data.login : savedUserName;

  twitter.innerHTML = data.twitter_username ? "@" + data.twitter_username : "-";
  repos.innerHTML = data.public_repos ? data.public_repos : "-";
  gists.innerHTML = data.public_gists ? data.public_gists : "-";
  joinedOn.innerHTML = data.created_at ? formatDate(data.created_at) : "-";


  // left top card data
  let fullNameee = document.getElementById("fullNameee");
  let biooo = document.getElementById("biooo");
  // let emailll = document.getElementById("emailll");
  let websiteee = document.getElementById("websiteee");
  let addresss = document.getElementById("addresss");
  let hireable = document.getElementById("hireable");
  let hireableText = document.getElementById("hireableText");

  fullNameee.innerHTML = data.name ? data.name : "-";
  biooo.innerHTML = data.bio ? data.bio : "-";
  // emailll.innerHTML = data.email ? data.email : "-";
  websiteee.innerHTML = data.blog ? data.blog : "-";
  addresss.innerHTML = data.location ? data.location : "-";
  let hireableState = data.hireable ? data.hireable : false;

  if (hireableState) {
    hireableText.innerHTML = "Yes";
    hireable.className = 'indicator online';
  } else {
    hireableText.innerHTML = "No";
    hireable.className = 'indicator offline';
  }

}

function updateRepoDataUI(jsonData) {
  // console.log(jsonData);

  jsonData.forEach(function(repoDetails, idx, array) {

    if (idx > 2) {
      return;
    }

    var divRow = document.createElement("div");
    divRow.className = "row";

    var divRepoName = document.createElement("div");
    divRepoName.className = "col-sm-6";
    divRepoName.style.display = "inline-block";

    var nameHeading = document.createElement("H6");
    nameHeading.className = "float-left";
    var repoName = document.createTextNode(repoDetails.name);
    nameHeading.appendChild(repoName);

    var divRepoLanguage = document.createElement("div");
    divRepoLanguage.className = "col-sm-6";
    divRepoLanguage.style.display = "inline-block";

    var languageHeading = document.createElement("H6");
    languageHeading.className = "float-right text-danger";
    var repoLanguage = document.createTextNode(repoDetails.language);
    languageHeading.appendChild(repoLanguage);

    // append h6 -> divRepoName div -> divRow div
    divRepoName.appendChild(nameHeading);
    divRepoLanguage.appendChild(languageHeading);
    divRow.appendChild(divRepoName);
    divRow.appendChild(divRepoLanguage);


    var divRepoUrl = document.createElement("div");
    divRepoUrl.className = "col-sm-9";
    divRepoUrl.style.display = "block";

    var repoLinkTag = document.createElement("a");
    var repoLink = document.createTextNode(repoDetails.html_url);
    repoLinkTag.href = repoDetails.html_url;
    repoLinkTag.appendChild(repoLink);
    divRepoUrl.className = "col-sm-9";

    divRepoUrl.appendChild(repoLinkTag);

    // append divRepoUrl div -> divRow div
    divRow.appendChild(divRepoUrl);

    // create horizantal line
    var hr = document.createElement("HR");

    // append the whole div
    let reposDiv = document.getElementById("reposDiv");
    reposDiv.appendChild(divRow);

    if (idx === 2 || idx === array.length - 1) {
      // don't append horizontal row because last item
    } else {
      // append horizantal line
      reposDiv.appendChild(hr);
    }

  });


}

// converts ISO date to normal date
// 2013-03-10T02:00:00Z -> 05-02-2016
function formatDate(dateee) {
  let date = new Date(dateee);
  let year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  let finalDateString = dt + '-' + month + '-' + year;
  return finalDateString;
}



function showAlert(message) {
  alert(message);
}