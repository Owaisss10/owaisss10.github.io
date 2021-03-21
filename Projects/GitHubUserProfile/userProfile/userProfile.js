// <!--
//
// Author: Awais Akram
// Creation Date: 21.03.2021
// -->
/* Variables */

/* Document Ready Function */
jQuery(document).ready(function($) {
  console.log("User Profile Page - Last Updated: 21.03.2021");

  // fetching saved userName in localStorage
  let savedUserName = localStorage.getItem("userName");
  console.log(savedUserName);

  if (savedUserName == null || savedUserName == "") {
    // no username found go back to home screen
    window.location.href = "../home/index.html";
  } else {
    // fetch user data from api
    getUserDataFromAPI(savedUserName);
    // fetch user repos from api
    getUserReposFromAPI(savedUserName);
  }

});

/* Functions */

function getUserDataFromAPI(userName) {
  // accessing the api base url
  const baseURL = Constants.baseURL;

  // accessing the http client for making api call
  var client = new HttpClient();
  client.get(baseURL + userName, function(response) {
    let jsonData = JSON.parse(response);

    // removing the dimScreen class
    let dimScreen = document.getElementById("dimScreen");
    dimScreen.classList.remove("overlay");

    // updating the user data content on Page
    updateUserDataUI(jsonData);

  });
}

function getUserReposFromAPI(userName) {
  // accessing the api base url
  const baseURL = Constants.baseURL;
  const repoEndPoint = Constants.repoEndPoint;

  // accessing the http client for making api call
  var client = new HttpClient();
  client.get(baseURL + userName + repoEndPoint, function(response) {
    let jsonData = JSON.parse(response);

    // removing the dimScreen class
    let dimScreen = document.getElementById("dimScreen");
    dimScreen.classList.remove("overlay");

    // updating the repo data on Page
    updateRepoDataUI(jsonData);

  });
}

function updateUserDataUI(data) {
  // page title heading
  let username = document.getElementById("username");
  username.innerHTML = data.login;


  // left top card data
  let imgURL = document.getElementById("imgURL");
  let fullName = document.getElementById("fullName");
  let company = document.getElementById("company");
  let location = document.getElementById("location");
  let followers = document.getElementById("followers");
  let following = document.getElementById("following");

  imgURL.src = data.avatar_url;
  fullName.innerHTML = data.name;
  company.innerHTML = data.company;
  location.innerHTML = data.location;
  followers.innerHTML = data.followers;
  following.innerHTML = data.following;

  // left bottom card data
  let github = document.getElementById("github");
  let twitter = document.getElementById("twitter");
  let repos = document.getElementById("repos");
  let gists = document.getElementById("gists");
  let joinedOn = document.getElementById("joinedOn");


  github.innerHTML = data.login;

  twitter.innerHTML = data.twitter_username ? "@" + data.twitter_username : "-";
  repos.innerHTML = data.public_repos;
  gists.innerHTML = data.public_gists;
  joinedOn.innerHTML = formatDate(data.created_at);


  // left top card data
  let fullNameee = document.getElementById("fullNameee");
  let biooo = document.getElementById("biooo");
  // let emailll = document.getElementById("emailll");
  let websiteee = document.getElementById("websiteee");
  let addresss = document.getElementById("addresss");
  let hireable = document.getElementById("hireable");
  let hireableText = document.getElementById("hireableText");

  fullNameee.innerHTML = data.name;
  biooo.innerHTML = data.bio;
  // emailll.innerHTML = data.email;
  websiteee.innerHTML = data.blog;
  addresss.innerHTML = data.location;
  let hireableState = data.hireable;

  if (hireableState) {
    hireableText.innerHTML = "Yes";
    hireable.className = 'indicator online';
  } else {
    hireableText.innerHTML = "No";
    hireable.className = 'indicator offline';
  }

}

function updateRepoDataUI(jsonData) {
  console.log(jsonData);

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
    divRepoUrl.className = "col-sm-9 text-secondary";
    divRepoUrl.style.display = "block";
    divRepoUrl.innerHTML = repoDetails.html_url;

    // append divRepoUrl div -> divRow div
    divRow.appendChild(divRepoUrl);

    // create horizantal line
    var hr = document.createElement("HR");

    // append the whole div
    let reposDiv = document.getElementById("reposDiv");
    reposDiv.appendChild(divRow);

    if (idx === 2) {
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
  console.log(finalDateString);
  return finalDateString;
}



function showAlert(message) {
  alert(message);
}