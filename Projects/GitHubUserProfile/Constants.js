// <!--
// 
// Author: Awais Akram
// Creation Date: 21.03.2021
// -->

/* Variables/Constants */
const baseURL = "https://api.github.com/users/";

const repos = "/repos";


/* Class */
class Constants {

  /* Functions */
  static get baseURL() {
    return baseURL;
  }
  static get repoEndPoint() {
    return repos;
  }

}