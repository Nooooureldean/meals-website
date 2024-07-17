
let lightlayer = document.querySelector('.lightlayer');
let container_data = document.querySelector('.row');
var spinner = document.querySelector('.loader');
var aside = document.querySelector('aside');
let searchPage = document.querySelector('.searchPage');
let searchName = document.querySelector('.searchName');
let Categories = document.querySelector('.linkCatogery');
let nour = document.querySelector('.nour');
let searchchar = document.querySelector('.searchchar');
let dataCatgoery = document.querySelector('.dataCatgoery');
let rowData = document.getElementById("row");
let searchContainer = document.getElementById("searchContainer");
let lightlayer2=document.querySelector('.lightlayer2');
let Contact =document.querySelector('.Contact')



async function searchAPI() {
    spinner.classList.remove('d-none');
    try {
        let data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        let response = await data.json();
        arr = response.meals;
        console.log(arr); // Debug: Log the response
        MainDisplay(response.meals); // Call MainDisplay function to display the data
        spinner.classList.add('d-none');
    } catch (error) {
        console.error('Error:', error);
        spinner.classList.add('d-none');
    }
}

async function searchAPIPage(id) {
    spinner.classList.remove('d-none');
    try {
        let url =` https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`;
        console.log('Fetching URL:', url); // Log the URL being fetched
        let data = await fetch(url);
        let response = await data.json();
        console.log('API Response:', response); // Log the response to inspect

        if (response && response.meals && response.meals.length > 0) {
          MainDisplaySreach(response.meals); // Display search results
        } else {
            console.log('No meals found'); // Log a message if no meals are found
            // Optionally, display a message or handle the absence of meals
        }

        spinner.classList.add('d-none');
    } catch (error) {
        console.error('Error:', error);
        spinner.classList.add('d-none');
    }
}

async function searchAPICharch(nameMeals) {
    spinner.classList.remove('d-none');
    try {
          
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${nameMeals}`;
        console.log('Fetching URL:', url); // Log the URL being fetched
        let data = await fetch(url);
        let response = await data.json();
        console.log('API Response:', response); // Log the response to inspect

        if (response && response.meals && response.meals.length > 0) {
           MainDisplaySreach(response.meals); // Display search results
        } else {
            console.log('No meals found'); // Log a message if no meals are found
            // Optionally, display a message or handle the absence of meals
        }

        spinner.classList.add('d-none');
    } catch (error) {
        console.error('Error:', error);
        spinner.classList.add('d-none');
    }
}

function showSearchPage() {
    container_data.classList.add('d-none');

    searchPage.classList.remove('d-none');
  
}

function MainDisplay(API) {
    let box = '';
    for (let i = 0; i < API.length; i++) {
        box += `
            <div class="col-md-3 demo " data-id="${API[i].idMeal}">
                <img src="${API[i].strMealThumb}" alt="" class="element rounded-3">
                <div class="name_respons">
                    <h3>${API[i].strMeal}</h3>
                </div>
            </div>;`
    }
    rowData.innerHTML = box;
    // nour.innerHTML = box; // Assuming nour is another element where you want to display the same content

    attachCardListeners();
    // Attach listeners after generating meal cards
}
function MainDisplaySreach(API) {
    let box = '';
    for (let i = 0; i < API.length; i++) {
        box += `
            <div class="col-md-3 demo " data-id="${API[i].idMeal}">
                <img src="${API[i].strMealThumb}" alt="" class="element rounded-3">
                <div class="name_respons">
                    <h3>${API[i].strMeal}</h3>
                </div>
            </div>;`
    }

    nour.innerHTML = box; // Assuming nour is another element where you want to display the same content

    attachCardListeners();
    // Attach listeners after generating meal cards
}

function displayDetails(API) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        if (API[`strIngredient${i}`]) {
            ingredients += `<li class='alert alert-info m-2 p-1'>${API[`strMeasure${i}`]} ${API[`strIngredient${i}`]}</li>`;
        }
    }

    let cartona = `
        <div class="col-md-12 d-flex justify-content-center align-items-center text-white">
            <div class="mx-5">
                <div>
                    <img src="${API.strMealThumb}" alt="" class="rounded-3  ">
                </div>
                <h2>${API.strMeal}</h2>
            </div>
            <div>
                <h2>Instructions</h2>
                <p>${API.strInstructions}</p>
                <h3>Area: ${API.strArea}</h3>
                <h3>Category: ${API.strCategory}</h3>
                <h3>Recipes: <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul></h3>
                <h3>Tags: <span class="badge badge-color">${API.strTags}</span></h3>
                <a href="${API.strSource}" class="btn btn-outline-success" target="_blank">Source</a>
                <a href="${API.strYoutube}" class="btn btn-outline-danger" target="_blank">Youtube</a>
                <button onclick="closeLightbox()" class="btn btn-outline-secondary">Close</button>
            </div>
        </div>`;
    lightlayer.innerHTML = cartona;
}

async function getMealdetails(mealId) {
      
    console.log('Fetching details for meal ID:', mealId); // Log the mealId
    const url = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const API = await url.json();
    console.log(API);
    if (API.meals && API.meals.length > 0) {
        displayDetails(API.meals[0]);
    }
}

function attachCardListeners() {
    const cards = document.querySelectorAll('.demo[data-id]');
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            const mealId = card.getAttribute('data-id');
            console.log('Card clicked, meal ID:', mealId); // Log the mealId
            lightlayer.classList.replace('d-none', 'd-flex');
            container_data.classList.replace('d-flex', 'd-none');
            getMealdetails(mealId);
        });
    });
}

function closeLightbox() {
    lightlayer.classList.add('d-none');
    lightlayer.classList.remove('d-flex');
    container_data.classList.replace('d-none', 'd-flex');
}

function openSideNav() {
    $('.side-nav-menu').animate({ left: 0 }, 500);
    $('.open-close-icon').removeClass('fa-align-justify').addClass('fa-x');
    for (let i = 0; i < 5; i++) {
        $('.links li').eq(i).animate({ top: 0 }, (i + 5) * 100);
    }
}

function closeSideNav() {
    let boxWidth = $('.side-nav-menu .nav-tab').outerWidth();
    $('.side-nav-menu').animate({ left: -boxWidth }, 500);
    $('.open-close-icon').addClass('fa-align-justify').removeClass('fa-x');
    $('.links li').animate({ top: 300 }, 500);
}

closeSideNav();

$('.open-close-icon').on('click', function () {
    if ($('.side-nav-menu').css('left') === '0px') {
        closeSideNav();
    } else {
        openSideNav();
    }
});

// Event listener for searchName input
searchName.addEventListener('input', function() {
  
    searchAPIPage(searchName.value);
    
   
});
searchchar.addEventListener('input', function() {
    
    searchAPICharch(searchchar.value);
   
  
});

// Event listener for Categories link
Categories.addEventListener('click', function() {
    getCategories();
});

// Initial call to fetch and display data when the page loads
searchAPI();

// Function to display categories
async function getCategories()
 {
    spinner.classList.remove('d-none');
    try {
        let data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        let response = await data.json();
        console.log(response.categories); // Debug: Log the response
        
        // Call MainDisplayCategory to display categories
        MainDisplayCategory(response.categories);

        spinner.classList.add('d-none');
    } catch (error) {
        console.error('Error:', error);
        spinner.classList.add('d-none');
    }
}

async function MainDisplayCategory(categories)
 {
    let box = '';
    for (let i = 0; i < categories.length; i++) {
        box +=
         `
           <div class="col-md-3 demo" data-category="${categories[i].strCategory}" onclick="filtersCategories('${categories[i].strCategory}');">
                <img src="${categories[i].strCategoryThumb}" alt="" class="element rounded-3">
                <div class="name_respons">
                    <h3>${categories[i].strCategory}</h3>
                    <p>${categories[i].strCategoryDescription.split(' ').slice(0, 20).join(' ')}</p>
                </div>
            </div>`;
    }
    rowData.innerHTML = box;
}

async function filtersCategories(category) 
{

    spinner.classList.remove('d-none');
    try {
        let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        console.log('Fetching URL:', url); // Log the URL being fetched

        let data = await fetch(url);
        let response = await data.json();
        console.log('API Response:', response); // Log the response to inspect

        if (response && response.meals && response.meals.length > 0) {
            MainDisplay(response.meals); // Call MainDisplay to display the meals under the category
        } else {
            console.log('No meals found'); // Log a message if no meals are found
            // Optionally, display a message or handle the absence of meals
        }

        spinner.classList.add('d-none');
    } catch (error) {
        console.error('Error fetching categories:', error); // Log detailed error message
        spinner.classList.add('d-none');
    }
}



async function getArea() {
    spinner.classList.remove('d-none');
    try {
        let data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        let response = await data.json();
        console.log(response.meals); // Debug: Log the response
        
        // Call MainDisplayArea to display areas
        MainDisplayArea(response.meals);

        spinner.classList.add('d-none');
    } catch (error) {
        console.error('Error:', error);
        spinner.classList.add('d-none');
    }
}

function MainDisplayArea(areas) {
    let box = '';
    for (let i = 0; i < areas.length; i++) {
        box += `
           <div class="col-md-3 demo" data-area="${areas[i].strArea}">
                <div>
                   <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${areas[i].strArea}</h3>
                </div>
            </div>`;
    }
    rowData.innerHTML = box;

    // Attach event listeners to the area elements
    attachAreaListeners();
}

async function filterByArea(area) {
    spinner.classList.remove('d-none');
    try {
        let url =` https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
        console.log('Fetching URL:', url); // Log the URL being fetched

        let data = await fetch(url);
        let response = await data.json();
        console.log('API Response:', response); // Log the response to inspect

        if (response && response.meals && response.meals.length > 0) {
            MainDisplay(response.meals); // Call MainDisplay to display the meals under the area
        } else {
            console.log('No meals found'); // Log a message if no meals are found
            // Optionally, display a message or handle the absence of meals
        }

        spinner.classList.add('d-none');
    } catch (error) {
        console.error('Error fetching meals by area:', error); // Log detailed error message
        spinner.classList.add('d-none');
    }
}

function attachAreaListeners() {
    const areas = document.querySelectorAll('.demo[data-area]');
    areas.forEach(area => {
        area.addEventListener('click', function () {
            const areaName = area.getAttribute('data-area');
            console.log('Area clicked:', areaName); // Log the area name
            filterByArea(areaName);
        });
    });
}
let areaButton = document.querySelector('.linkArea');
areaButton.addEventListener('click', function() {
    getArea();
});



async function getIngredients() {
    rowData.innerHTML = ""; // Clear previous content
    $(".inner-loading-screen").fadeIn(300); // Show loading indicator

    try {
        let data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        let response = await data.json();
        console.log(response);
        displayMealsIngredients(response.meals.splice(0, 20)); // Call function to display ingredients
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    } finally {
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to display ingredients
function displayMealsIngredients(meals) {
    let box = '';
    for (let i = 0; i < meals.length; i++) {
        box += `
            <div class="col-md-3 demo" data-id="${meals[i].strIngredient}">
                <div>
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${meals[i].strIngredient}</h3>
                </div>
            </div>`;
    }
    rowData.innerHTML = box;
   
    attachCardListenersIngredient(); // Reattach card listeners after updating the DOM
}

// Function to fetch and display meals by ingredient
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
        let data = await response.json();
        console.log(data.meals);
        if (data.meals && data.meals.length > 0) {
            MainDisplayIngredients(data.meals); // Display meals if available
        } else {
            console.log('No meals found by ingredient'); // Log if no meals are found
        }
    } catch (error) {
        console.error('Error fetching meals by ingredients:', error);
    } finally {
        $(".inner-loading-screen").fadeOut(300);
    }
}

// Function to display meals by ingredient
function MainDisplayIngredients(API) {
    let box = '';
    for (let i = 0; i < API.length; i++) {
        box += `
            <div class="col-md-3 demo" data-id="${API[i].idMeal}">
                <img src="${API[i].strMealThumb}" alt="" class="element rounded-3">
                <div class="name_respons">
                    <h3>${API[i].strMeal}</h3>
                </div>
            </div>`;
    }
    rowData.innerHTML = box;

    attachCardListeners(); // Attach listeners after generating meal cards
}

// Function to attach listeners to ingredient cards
function attachCardListenersIngredient() {
    const cards = document.querySelectorAll('.demo[data-id]');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const ingredient = card.getAttribute('data-id');
            console.log('Card clicked, ingredient:', ingredient); // Log the ingredient
           
            getIngredientsMeals(ingredient);
        });
    });
}

function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;






function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

