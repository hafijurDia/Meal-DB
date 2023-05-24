const loadMeal = async(serachText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${serachText}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMeal(data.meals);
    } catch (error) {
        console.log(error);
    }
    
}

const displayMeal = (meals) => {
    console.log(meals);
    const mealWrap = document.getElementById('meal-wrap');
    mealWrap.innerHTML = '';
    const classlists = ['col-6', 'blog-gutter'];
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add(...classlists);
        const instructions = meal.strInstructions;
        const shortIns = instructions.slice(0,80);
        mealDiv.innerHTML = `
        <div class="row rounded border">
        <div class="col-sm-5 p-0">
          <img class="d-block w-100" src="${meal.strMealThumb}" alt="">
        </div>
        <div class="col-sm-7">
          <div class="card-block mt-4">
            <h4 class="mb-3">${meal.strMeal}</h4>
            <p>${shortIns}...</p>
            <button onclick="showDetails(${meal.idMeal})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#mealModal">Details</button>
          </div>
        </div>
      </div>
        `
        mealWrap.appendChild(mealDiv);
    });
}

const showDetails = async(idMeal) => {
   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
   try {
    const res = await fetch(url);
    const data = await res.json();
    openModal(data.meals[0]);
   } catch (error) {
    console.log(error);
   }

}
const openModal = (singleMeal) => {
  document.getElementById('exampleModalLabel').innerText = singleMeal.strMeal;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
       <img class="mb-3" width="100%" src="${singleMeal.strMealThumb}"/>
       <p><strong>Category: </strong> ${singleMeal.strCategory}</p>
       <p><strong>Area: </strong> ${singleMeal.strArea}</p>
       <p><strong>Instructions: </strong> ${singleMeal.strInstructions}</p>
       <p><strong>YouTube: </strong> <a href="${singleMeal.strYoutube}" target="_blank" style="text-decoration:none;">${singleMeal.strYoutube}</a></p>
       
    `
}

  document.getElementById('search-btn').addEventListener('click',function(){
    const searchInput = document.getElementById('search-input').value;
    loadMeal(searchInput);

})

loadMeal('fish');