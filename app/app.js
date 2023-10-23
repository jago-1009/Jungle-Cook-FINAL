function initListeners() {}
 
$(document).ready(function () {
initListeners();
});

function changeRoute() {
let hashTag = window.location.hash;
 let pageID = hashTag.replace('#', '');
//   console.log(hashTag + ' ' + pageID);

if (pageID != '') {
$.get(`pages/pageID/pageID.html`, function (data) {
 console.log('data ' + data);
 $('#app').html(data);
});
} else {
$.get(`pages/home/home.html`, function (data) {
console.log('data ' + data);
 $('#app').html(data);
});
}
}

function initURLListener() {
$(window).on('hashchange', changeRoute);
changeRoute();
}

$(document).ready(function () {
initURLListener();
});





function toggleMenu(menu) {
    menu.classList.toggle("open")
}