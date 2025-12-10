import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import beveragesImage from "../images/beverages.jpg";

function PotluckBeverages() {
  const isTesting = false;

  const [beverages, setBeverages] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  // retrieve data from potluck_beverages
  async function handleFetch() {
    // get data from supabase using rpc function
    const { data, error } = await supabase.rpc("get_potluck_beverages");

    // check for error
    if (error) {
      console.log(error);
      setErrMsg(error.message);
      setBeverages([]);
      return;
    }
    // update useState with latest data
    setBeverages(data);
  }

  // load data on open
  useEffect(() => {
    handleFetch();
  }, []);

  // handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // get values from form
    const bevName = e.target.elements.bevName.value;
    const guestName = e.target.elements.guestName.value;
    const serves = e.target.elements.serves.value;

    // create new object
    const newBeverage = {
      beverage_name: bevName,
      guest_name: guestName,
      serves: parseInt(serves),
    };

    // insert new data into potluck_beverages
    const { error } = await supabase
      .from("potluck_beverages")
      .insert(newBeverage);

    // retrieve latest data from supabase using rpc function
    const response = await supabase.rpc("get_potluck_beverages");
    const data = response.data;

    // if not testing, reset all fields to blank
    if (!isTesting) {
      e.target.elements.bevName.value = "";
      e.target.elements.guestName.value = "";
      e.target.elements.serves.value = "";
    }

    // check for error
    if (error) {
      console.log(error);
      setErrMsg(error.message);
      setBeverages([]);
      return;
    }
    // update useState with latest data
    setBeverages(data);
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
                    src={beveragesImage}
                    className="card-img-top rounded"
                    alt="Potluck Beverages"
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="mt-4">
                  <h5 className="text-center">Add Beverage</h5>

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
                      <label className="col-form-label-sm" htmlFor="bevName">
                        What are you bringing?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="bevName"
                        defaultValue={isTesting ? "some liquid" : ""}
                      />
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
                        Add Beverage
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-7">
                {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                <div className="d-flex nowrap">
                  <h2 className="flex-fill align-self-center text-center">
                    Beverages
                  </h2>
                  <button className="btn refresh-button" onClick={handleFetch}>
                    🔄
                  </button>
                </div>
                <div>
                  {beverages.length === 0 ? (
                    <p>No beverages yet.</p>
                  ) : (
                    <div>
                      {beverages.map((beverage) => (
                        <div key={`${beverage.guest_name}`} className="mb-2">
                          <span className="name">{beverage.guest_name}</span>
                          <div style={{ whiteSpace: "pre-wrap" }}>
                            {beverage.beverage}
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
export default PotluckBeverages;
