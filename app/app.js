import { changePage } from "../services/model.js";



function route() {
    let hashtag = window.location.hash;
    let pageID = hashtag.replace("#","");
    let path = pageID.split("/")
    // console.log("hash ", hashtag)
    // console.log("SubName" , subPage)
    changePage(path) 
}

function initListeners() {
    
    $(".login").on("click", (e) => {
        if (userID != "" || pass != "") {
            $("#signed-in").toggle();
        }
        else {
        $("#modal").toggle()
        }
    })
     $(".close").on("click",(e) => {
        $("#modal").toggle();
    })
    $("#submit").on("click",(e) => {
LogIn();
    })
    $("#logout").on("click",(e) => {
        $("#signed-in").toggle();
        LogOut()
    })
      $(".sign-close").on("click",(e) => {
        $("#signed-in").toggle();
    })
}


function initSite(){
    $(window).on("hashchange",route)
    route();
}
 
$(document).ready(function () {
initListeners();
initSite();
});




