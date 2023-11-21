import { checkAuth } from "../src/index.js";
export var recipes = [];
let IngrNum = 4;
let InstrNum = 4;
export let idxVal = -1;
let editIngrNum = 4;
let editInstrNum = 4;


function removeRecipe(idx) {
	recipes.splice(idx,1)
}
function setIndexValue(num) {
	idxVal = num;
	console.log(idxVal);
}
function isImage(url) {
	return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
export function addEditListener() {
	$(".IngredEditBtn").on("click", (e) => {
		$(".formIngred").append(
			`<input type="text" placeholder="Ingredient #${editIngrNum}" id="Ingred${
				editIngrNum - 1
			}" />`
		);
		editIngrNum++;
	});
	$(".InstrEditBtn").on("click", (e) => {
		$(".formInstr").append(
			`<input type="text" placeholder="Instruction #${editInstrNum}" id="Instr${
				editInstrNum - 1
			}" />`
		);
		editInstrNum++;
	});
	$(".submitChangesBtn").on("click", (e) => {
		if (isImage(document.getElementById("imagePath").value) == true) {
			let RecipeObj = {};
			RecipeObj.IngrList = [];
			RecipeObj.InstrList = [];
			console.log(RecipeObj);
			RecipeObj.imagePath = document.getElementById("imagePath").value;
			RecipeObj.itemName = document.getElementById("itemName").value;
			console.log(`Path: ${document.getElementById("imagePath").value}`);
			console.log(`Name: ${document.getElementById("itemName").value}`);
			for (let i = 0; i < editIngrNum - 1; i++) {
				let value = document.getElementById(`Ingr${i}`).value;
				if (value !== "") {
					let IngrObj = {
						idx: i,
						ingredient: value,
					};

					RecipeObj.IngrList.push(IngrObj);
				}
			}
			for (let i = 0; i < editInstrNum - 1; i++) {
				let value = document.getElementById(`Instr${i}`).value;
				if (value !== "") {
					let InstrObj = {
						idx: i,
						instruction: value,
					};
					RecipeObj.InstrList.push(InstrObj);
					
				}
				
			}
			recipes.splice(idxVal, 1);
			addRecipe(RecipeObj);
			
		} else {
			alert("Your Image Path is Invalid. Please Try Again");
		}
	});
}
export function addFormListener() {
	$(".IngredAddBtn").on("click", (e) => {
		$(".formIngred").append(
			`<input type="text" placeholder="Ingredient #${IngrNum}" id="Ingred${
				IngrNum - 1
			}" />`
		);
		IngrNum++;
	});
	$(".InstrAddBtn").on("click", (e) => {
		$(".formInstr").append(
			`<input type="text" placeholder="Instruction #${InstrNum}" id="Instr${
				InstrNum - 1
			}" />`
		);
		InstrNum++;
	});
	$(".SubmitBtn").on("click", (e) => {
		if (isImage(document.getElementById("imagePath").value) == true) {
			let RecipeObj = {};
			RecipeObj.IngrList = [];
			RecipeObj.InstrList = [];
			console.log(RecipeObj);
			RecipeObj.imagePath = document.getElementById("imagePath").value;
			RecipeObj.itemName = document.getElementById("itemName").value;
			console.log(`Path: ${document.getElementById("imagePath").value}`);
			console.log(`Name: ${document.getElementById("itemName").value}`);
			for (let i = 0; i < IngrNum - 1; i++) {
				let value = document.getElementById(`Ingred${i}`).value;
				if (value !== "") {
					let IngrObj = {
						idx: i,
						ingredient: value,
					};

					RecipeObj.IngrList.push(IngrObj);
				}
			}
			for (let i = 0; i < InstrNum - 1; i++) {
				let value = document.getElementById(`Instr${i}`).value;
				if (value !== "") {
					let InstrObj = {
						idx: i,
						instruction: value,
					};
					RecipeObj.InstrList.push(InstrObj);
				}
			}

			addRecipe(RecipeObj);
		} else {
			alert("Your Image Path is Invalid. Please Try Again");
		}
	});
}
export function changePage(pageID) {
	if (pageID == "") {
		$.get(`pages/home.html`, (data) => {
			$("#app").html(data);
		}).fail(() => {
			alert("FAIL");
		});
		$("#app").html("home");
		console.log("HOME HOME HOME");
		$("#bread-crumb").html(``);
	} else {
		if (pageID == "create-recipe") {
			$.get(`pages/${pageID}.html`, (data) => {
				$("#app").html(data);
				checkAuth();
				addFormListener();
			}).fail(() => {
				alert("ERROR 404: PAGE NOT FOUND");
			});
		} else if (pageID == "my-recipes") {
			$.get(`pages/${pageID}.html`, (data) => {
				$("#app").html(data);
				checkAuth();
				if (recipes.length == 0) {
					console.log("NO RECIPES");
					$(".my-recipes").append(
						`<h1 class="no-recipes-msg">You have no recipes available.</h1>`
					);
				} else {
					$.each(recipes, (idx, recipe) => {
						$(".my-recipes").append(`  <div class="my-recipe-box-holder">
		<div class="recipe-box">
			<div class="recipe-photo" style="background-image:url(${
				recipe.imagePath
			})"></div>
			<div class="recipe-desc">
				<div class="recipe-desc-title">${recipe.itemName}</div>
				<div class="recipe-desc-border"></div>
				<div class="recipe-desc-text">
					This is a recipe that you created! Enjoy!
				</div>
				<div class="recipe-desc-time">
                    <div class="recipe-desc-time-logo"></div>
                    <div class="recipe-desc-time-desc">Not Set</div>
                </div>
				<div class="recipe-desc-serving-size">
                    <div class="recipe-desc-serving-logo"></div>
                    <div class="recipe-desc-serving-desc">Not Set</div>
                </div>
			</div>
            
		</div>
        <div class="button-holder">
            <button class="edit-button" onclick = "${setIndexValue(
							idx
						)}"><a href="#edit-recipe">Edit Recipe</a></button>
            <button class="delete-button" onclick="${setIndexValue(idx)}">
			Delete
			</button>
        </div>
        <div class="view-button-holder">
        <button class="view-button" ${setIndexValue(
					idx
				)}><a href="#view-recipe">View</a></button>
        </div>
        </div>`);
					});
				}
			}).fail(() => {
				alert("ERROR 404: PAGE NOT FOUND");
			});
		} else if (pageID == "edit-recipe") {
			$.get(`pages/${pageID}.html`, (data) => {
				$("#app").html(data);
				checkAuth();

				if (idxVal !== -1) {
					console.log("RECIPE", recipes[idxVal]);
					$("#edit-recipe-form").append(`	<div class="formHolder">
			<div class="form-title">Recipe</div>
			<div class="formTop">
				<div class="imageBtn">Attach Image</div>
				<input id="imagePath" type="text" placeholder="Image URL / Image Name" value="${
					recipes[idxVal].imagePath
				}" />
				<input type="text" placeholder="Item Name" id="itemName" value=${
					recipes[idxVal].itemName
				} />
			</div>
			<div class="formIngred">
				${(() => {
					let htmlString = "";
					$.each(recipes[idxVal].IngrList, (idx, ingredient) => {
						htmlString += `<input type="text" placeholder="Ingredient #${idx}" id="Ingr${idx}"  value="${ingredient.ingredient}"/>`;
					});
					return `${htmlString}`;
				})()}
				<div class="IngredEditBtn">+</div>
			</div>
			<div class="formInstr">
				${(() => {
					let htmlString = "";
					$.each(recipes[idxVal].InstrList, (idx, ingredient) => {
						htmlString += `<input type="text" placeholder="Instruction #${idx}" id="Instr${idx}"  value="${ingredient.instruction}"/>`;
					});
					return `${htmlString}`;
				})()}
				<div class="InstrEditBtn">+</div>
			</div>
			<div class="submitChangesBtn">Submit Changes</div>
		</div>`);
				} else {
					console.log("NO RECIPES");
					$("#edit-recipe-form").append(
						`<h1 class="no-recipes-msg">You have no recipes available.</h1>`
					);
				}
				addEditListener();
			});
		} else if (pageID == "view-recipe") {
			$.get(`pages/${pageID}.html`, (data) => {
				$("#app").html(data);
				checkAuth();
				if (idxVal !== -1) {
					$(".view-recipe").append(`
			
<!-- NAV BAR -->
<div class="nav-holder">
    <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="169" height="55" viewBox="0 0 169 55">
            <g id="Group_1" data-name="Group 1" transform="translate(-50 -38)">
                <circle id="Ellipse_1" data-name="Ellipse 1" cx="16" cy="16" r="16" transform="translate(52 38)"
                    fill="#c7eae4" />
                <circle id="Ellipse_2" data-name="Ellipse 2" cx="15" cy="15" r="15" transform="translate(76 54)"
                    fill="#ffd972" />
                <circle id="Ellipse_3" data-name="Ellipse 3" cx="27" cy="27" r="27" transform="translate(103 39)"
                    fill="#a7e8bd" />
                <circle id="Ellipse_4" data-name="Ellipse 4" cx="12" cy="12" r="12" transform="translate(185 57)"
                    fill="#efa7a7" />
                <text id="The_Jungle_Cook" data-name="The Jungle Cook" transform="translate(50 74)" font-size="25"
                    font-family="Caveat-Regular, Caveat" letter-spacing="0.1em">
                    <tspan x="0" y="0">The Jungle Cook</tspan>
                </text>
            </g>
        </svg>
    </div>

    <div class="nav-links">
        <ul>
            <li>
                <a href="#home">Home</a>
            </li>
            <li><a href="#browse">Browse</a></li>
            <li><a href="#create-recipe">Create Recipe</a></li>
            <li>
                <a href="#my-recipes" id="my-recipes">My Recipes</a>
                <div class="border"></div>
            </li>

            <li class="login"><a href="#login">Login</a></li>
            <li class="logout" id="logoutbutton"><a href="#login">Log Out</a></li>
        </ul>
    </div>
    <div class="hamburger-menu" onclick="toggleMenu(this)">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <ul class="mobile-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#browse">Browse</a></li>
            <li><a href="#create-recipe">Create Recipe</a></li>
            <li class="my-recipes"><a href="#my-recipes" class="my-recipes">My Recipes</a></li>
            <li class="login"><a href="#login">Login</a></li>
            <li class="logout" id="logoutbutton"><a href="#login">Log Out</a></li>
        </ul>
    </div>
</div>
<!-- END OF NAV BAR -->
<div class="view-recipe-holder">
    <div class="view-recipe-desc">
    <div class="desc-left">
        <div class="desc-title">Supreme Pizza</div>
        <div class="desc-image" style="background-image: url('${
					recipes[idxVal].imagePath
				}')"></div>
    </div>
    <div class="desc-right">
        <div class="desc-right-title">Description:</div>
        <div class="desc-right-description">This recipe is your own! You set it!</div>
        <div class="desc-right-time-title">Total Time:</div>
        <div class="desc-right-time">${Math.floor(
					Math.random() * 5
				)}h ${Math.floor(Math.random() * 59)}m</div>
        <div class="desc-right-serving-title">Servings:</div>
        <div class="desc-right-time">${Math.floor(
					Math.random() * 10
				)} servings</div>
    </div>
    </div>
    <div class="view-recipe-ingredients">
        <div class="ingredients-title">Ingredients:</div>
        <ul>
            ${(() => {
							let htmlString = "";
							$.each(recipes[idxVal].IngrList, (idx, ingredient) => {
								htmlString += `<li>${ingredient.ingredient}</li>`;
							});
							return `${htmlString}`;
						})()}
        </ul>
    </div>
    <div class="view-recipe-instructions">
        <div class="instructions-title">Instructions:</div>
        <ol>
            ${(() => {
							let htmlString = "";
							$.each(recipes[idxVal].InstrList, (idx, instruction) => {
								htmlString += `<li>${instruction.instruction}</li>`;
							});
							return `${htmlString}`;
						})()}
        </ol>
    </div>
    <div class="button-holder"><button class="edit-button"><a href="#edit-recipe">Edit Recipe</a></button></div>

</div>
<!-- BEGINNING OF FOOTER -->
<div class="footer">
    <div class="copyright">Copyright © 2019 The Jungle Cook</div>
    <div class="links">
        <a href="#login" class="login">Login</a>
        <a href="#browse">Recipes by Category</a>
        <a href="#copyright">Privacy and Copyright</a>
        <a href="#create-recipe">Create Recipe</a>
        <a href="#my-recipes">Your Recipes</a>
    </div>
    <div class="socials">
        <div class="facebook"></div>
        <div class="instagram"></div>
    </div>
</div>
<!-- END OF FOOTER -->


					`);
				}
			}).fail(() => {
				alert("ERROR 404: PAGE NOT FOUND");
			});
		} else {
			$.get(`pages/${pageID}.html`, (data) => {
				$("#app").html(data);
				checkAuth();
			}).fail(() => {
				alert("ERROR 404: PAGE NOT FOUND");
			});
		}
	}
}

export function addRecipe(newRecipe) {
	console.log("ADDED RECIPE");
	recipes.push(newRecipe);
}
