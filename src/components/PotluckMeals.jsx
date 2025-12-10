import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import mealsImage from "../images/meals.jpg";

function PotluckMeals() {
  const isTesting = false;

  const [meals, setMeals] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  // retrieve data from potluck_meals
  async function handleFetch() {
    // get data from supabase using rpc function
    const { data, error } = await supabase.rpc("get_potluck_meals");

    // check for error
    if (error) {
      console.log(error);
      setErrMsg(error.message);
      setMeals([]);
      return;
    }
    // update useState with latest data
    setMeals(data);
  }

  // load data on open
  useEffect(() => {
    handleFetch();
  }, []);

  // handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // get values from form
    const mealName = e.target.elements.mealName.value;
    const guestName = e.target.elements.guestName.value;
    const dishType = e.target.elements.dishType.value;
    const serves = e.target.elements.serves.value;

    // create new object
    const newMeal = {
      meal_name: mealName,
      guest_name: guestName,
      dish_type: dishType.toLowerCase(),
      serves: parseInt(serves),
    };

    // insert new data into potluck_meals
    const { error } = await supabase.from("potluck_meals").insert(newMeal);

    // retrieve latest data from supabase using rpc function
    const response = await supabase.rpc("get_potluck_meals");
    const data = response.data;

    // if not testing, reset all fields to blank
    if (!isTesting) {
      e.target.elements.mealName.value = "";
      e.target.elements.guestName.value = "";
      e.target.elements.dishType.value = "";
      e.target.elements.serves.value = "";
    }

    // check for error
    if (error) {
      console.log(error);
      setErrMsg(error.message);
      setMeals([]);
      return;
    }
    // update useState with latest data
    setMeals(data);
  }

  return (
    <>
      <div className="container m-4">
        <div className="card p-2" style={{ width: "600px" }}>
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Friday's Potluck</h1>

            <div className="row">
              <div className="col-5">
                <div className="text-center">
                  <img
                    src={mealsImage}
                    className="card-img-top rounded"
                    alt="Potluck Meals"
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="mt-4">
                  <h5 className="text-center">Add Meal</h5>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="guestName">
                        What is your name?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="guestName"
                        defaultValue={isTesting ? "Bob" : ""}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="mealName">
                        What are you bringing?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="mealName"
                        defaultValue={isTesting ? "dirt" : ""}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="dishType">
                        What type of dish is this?
                      </label>
                      <select
                        className="form-control form-control-sm"
                        name="dishType"
                        defaultValue={isTesting ? "entree" : ""}
                      >
                        <option value="" disabled>
                          Select a type of dish
                        </option>
                        <option value="entree">Entree</option>
                        <option value="side">Side</option>
                        <option value="snack">Snack</option>
                        <option value="dessert">Dessert</option>
                        <option value="drink">Drink</option>
                      </select>
                    </div>

                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="serves">
                        How many people will it feed?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="number"
                        name="serves"
                        defaultValue={isTesting ? "6" : ""}
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-sm">
                        Add Meal
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-7">
                {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                <div className="d-flex nowrap">
                  <h2 className="flex-fill align-self-center text-center">
                    Meals
                  </h2>
                  <button className="btn refresh-button" onClick={handleFetch}>
                    🔄
                  </button>
                </div>
                <div>
                  {meals.length === 0 ? (
                    <p>No meals yet.</p>
                  ) : (
                    <div>
                      {meals.map((meal) => (
                        <div key={`${meal.guest_name}`} className="mb-2">
                          <span className="name">{meal.guest_name}</span>
                          <div style={{ whiteSpace: "pre-wrap" }}>
                            {meal.meal}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PotluckMeals;
