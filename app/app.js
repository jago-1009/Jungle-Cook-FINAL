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
    console.log()
}
function initSite(){
    $(window).on("hashchange",route)
    route();
}
 
$(document).ready(function () {
initListeners();
initSite();
});




