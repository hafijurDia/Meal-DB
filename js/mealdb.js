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
    const classlists = ['col-6', 'blog-gutter']  
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
            <!--           <h4 class="card-title">Small card</h4> -->
            <h4 class="mb-3">${meal.strMeal}</h4>
            <p>${shortIns}...</p>
            <button onclick="showDetails(${meal.idMeal})" data-toggle="modal" data-target="#exampleModal"  class="btn btn-warning">Details</button>
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
    const modalBody = document.getElementById('modal-body');
    // modalBody.innerHTML = `
    //     <p>${singleMeal.strMeal}</p>
    // `
}

loadMeal('fish');