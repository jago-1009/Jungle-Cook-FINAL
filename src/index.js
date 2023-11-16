//variable initialize
let IngrNum = 4;
let InstrNum = 4;
var recipes = [];

// Import the functions you need from the SDKs and Files you need
import { changePage, addFormListener } from "./model.js";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInWithCredential,
	updateProfile,
} from "firebase/auth";

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
	measurementId: "G-F367M6XX1Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function loggedInSass() {
	$(".login").css("display", "none");
	$(".logout").css("display", "flex");
	$(".create-signed-in").css("display", "flex");
	$(".create-not-signed-in").css("display", "none");
	$("#my-recipes").css("display", "flex");
}
function loggedOutSass() {
	$(".login").css("display", "flex");
	$(".logout").css("display", "none");
	$(".create-signed-in").css("display", "none");
	$(".create-not-signed-in").css("display", "flex");
	$("#my-recipes").css("display", "none");
}
export function checkAuth() {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			const uid = user.uid;
			const splitName = user.displayName.split(" ");

			loggedInSass();
			$(".form-title").html(`Hey ${splitName[0]}, Create a recipe here!`);
		} else {
			// User is signed out
			console.log("NO USER");
		}
	});
}

function route() {
	let hashtag = window.location.hash;
	let pageID = hashtag.replace("#", "");
	let path = pageID.split("/");
	// console.log("hash ", hashtag)
	// console.log("SubName" , subPage)
	changePage(path);
}

function initListeners() {
	$("#app").on("click", "#signupbutton", function (e) {
		e.preventDefault();
		let fName = $("#fName").val();
		let lName = $("#lName").val();
		let email = $("#emailS").val();
		let password = $("#passwordS").val();
		let name = `${fName} ${lName}`;
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				//Signed up

				const user = userCredential.user;
				console.log(user);
				loggedInSass();
				updateProfile(user, { displayName: name });
				checkAuth();
				alert(`Thanks for signing up!`);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMsg = error.message;
				alert(`ERROR: Error code ${errorCode}: ${errorMsg}`);
			});
	});
	$("#app").on("click", "#logoutbutton", function (e) {
		e.preventDefault();
		signOut(auth)
			.then(() => {
				//Signed Out
				loggedOutSass();
				alert("You have signed out!");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMsg = error.message;
				alert(`ERROR: Error code ${errorCode}: ${errorMsg}`);
			});
	});
}

function initSite() {
	$(window).on("hashchange", route);
	route();
}

$(document).ready(function () {
	initListeners();
	initSite();
	checkAuth();
});
