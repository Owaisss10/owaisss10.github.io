/* <!--

Author: Awais Akram
Creation Date: 21.03.2021
--> */

/* Variables */

/* Document Ready Function */
jQuery(document).ready(function($) {
  console.log("Home Page - Last Updated: 21.03.2021");
  // fetching saved userName in localStorage
  let savedUserName = localStorage.getItem("userName");
  console.log(savedUserName);
});

/* Functions */

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