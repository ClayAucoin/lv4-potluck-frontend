import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import beveragesImage from "../images/beverages.jpg";

export default function GuestList() {
  const isTesting = false;

  const [guests, setGuests] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  // retrieve data from potluck_guests
  async function handleFetch() {
    // get data from supabase
    const { data, error } = await supabase
      .from("potluck_guests")
      .select()
      .order("first_name")
      .order("last_name");

    // check for error
    if (error) {
      console.log(error);
      setErrMsg(error.message);
      setGuests([]);
      return;
    }
    // update useState with latest data
    setGuests(data);
  }

  // load data on open
  useEffect(() => {
    handleFetch();
  }, []);

  // handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // get values from form
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;

    // create new object
    const newFullName = {
      first_name: firstName,
      last_name: lastName,
    };

    // insert new data into potluck_guests
    const { error } = await supabase.from("potluck_guests").insert(newFullName);

    // update with the latest data from supabase
    handleFetch();

    // if not testing, reset all fields to blank
    if (!isTesting) {
      e.target.elements.firstName.value = "";
      e.target.elements.lastName.value = "";
    }

    // check for error
    if (error) {
      console.log(error);
      setErrMsg(error.message);
      setGuests([]);
      return;
    }
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
                  <h5 className="text-center">Add Guest</h5>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="firstName">
                        What is your first name?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="firstName"
                        defaultValue={isTesting ? "Bob" : ""}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="lastName">
                        What is your last name?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="lastName"
                        defaultValue={isTesting ? "Newman" : ""}
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-sm">
                        Add Guest
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-7">
                {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                <div className="d-flex nowrap">
                  <h2 className="flex-fill align-self-center text-center">
                    Who's Coming
                  </h2>
                  <button className="btn refresh-button" onClick={handleFetch}>
                    🔄
                  </button>
                </div>
                <div>
                  {guests.length === 0 ? (
                    <p>No guests yet.</p>
                  ) : (
                    <div>
                      {guests.map((guest) => (
                        <div key={`${guest.id}`} className="mb-2">
                          <div style={{ whiteSpace: "pre-wrap" }}>
                            <span className="name">{`${guest.first_name} ${guest.last_name}`}</span>
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
