/* <!--

Author: Awais Akram
Creation Date: 21.03.2021
--> */

/* Variables */

/* Document Ready Function */
jQuery(document).ready(function($) {
  console.log("Home Page - Last Updated: 22.03.2021");
  // fetching saved userName in localStorage
  let savedUserName = localStorage.getItem("userName");
  console.log(savedUserName);

  loadTheme();


  $(document).on('change', '#darkThemeSwitch', function(e) {
    let state = $(this).is(':checked');
    console.log(state);
    $(this).attr("checked", state);
    $(this).trigger("click");
    if (state == false) {
      $("#ref-css").attr("href", "../../../light-theme-style.css");
      document.getElementById('gitHubImg').src = "../assets/images/GitHub_logo_black.png";
      $("#navBar").css("background-color", "#EAECEF"); // nav bar grey color
      // saving theme path in localStorage
      localStorage.setItem("themePath", "../../../light-theme-style.css");
    } else {
      $("#ref-css").attr("href", "../../../dark-theme-style.css");
      document.getElementById('gitHubImg').src = "../assets/images/GitHub_logo_white.png";
      $("#navBar").css("background-color", "#EC612D"); // nav bar orange color
      // saving theme path in localStorage
      localStorage.setItem("themePath", "../../../dark-theme-style.css");
    }
  });



});




/* Functions */

function loadTheme() {
  // fetching saved themePath from localStorage
  let savedThemePath = localStorage.getItem("themePath");
  console.log(savedThemePath);
  if (savedThemePath != undefined) {
    // applying saved Theme
    $("#ref-css").attr("href", savedThemePath);
    if (savedThemePath == "../../../dark-theme-style.css") {
      document.getElementById('gitHubImg').src = "../assets/images/GitHub_logo_white.png";
      $("#navBar").css("background-color", "#EC612D"); // nav bar orange color
      $("#darkThemeSwitch").attr("checked", true);
    } else {
      document.getElementById('gitHubImg').src = "../assets/images/GitHub_logo_black.png";
      $("#navBar").css("background-color", "#EAECEF"); // nav bar grey color
      $("#darkThemeSwitch").attr("checked", false);
    }
  }
}

// Form validation code will come here.
function validateSearchData() {
  let searchForm = document.getElementById("searchForm");
  let userName = searchForm.UserName.value;
  if (userName == "") {
    alert("Please provide a GitHub username!");
    searchForm.UserName.focus();
    return false;
  }

  // saving userName in localStorage
  localStorage.setItem("userName", userName);
  window.location.href = "../userProfile/userProfile.html";
  return false;
}