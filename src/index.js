// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUql_SIOlDML1Z6z8hbgR2j46m2fyfGIs",
  authDomain: "n315-jacogarw.firebaseapp.com",
  projectId: "n315-jacogarw",
  storageBucket: "n315-jacogarw.appspot.com",
  messagingSenderId: "1084176107346",
  appId: "1:1084176107346:web:e4f354a5916e1f100a1c8b",
  measurementId: "G-F367M6XX1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export function changePage(pageID) {

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



