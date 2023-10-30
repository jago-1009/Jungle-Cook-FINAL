

function changePage(pageID) {

        if (pageID =="") {
            $.get(`pages/home.html`, (data) => {
                $("#app").html(data)
            }).fail(() =>  {
                alert("FAIL")
            })
        $("#app").html("home");
        console.log("HOME HOME HOME")
         $("#bread-crumb").html(``)
        
    } else {
        
        if(pageID.length == 1 ) {
             $("#bread-crumb").html(``)
             $.get(`pages/${pageID}.html`, (data) => {
                $("#app").html(data)
            }).fail(() =>  {
                alert("ERROR 404: PAGE NOT FOUND")
            
            })
        }
        else {
             $("#bread-crumb").html(`<a href="#${pageID[0]}">${pageID[0]}/</a>${pageID[1]}`)
             $.get(`pages/${pageID[1]}.html`, (data) => {
                $("#app").html(data)
            }).fail(() =>  {
                alert("ERROR 404: PAGE NOT FOUND")
            
            })
        }
  
            
    }
}
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



