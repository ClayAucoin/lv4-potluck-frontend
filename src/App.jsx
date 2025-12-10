import { useState } from "react"
import PotluckMeals from "./components/PotluckMeals"
import PotluckBeverages from "./components/PotluckBeverages"
import PotluckUtensils from "./components/PotluckUtensils"
import GuestList from "./components/GuestList"
import GuestListPlain from "./components/GuestListPlain"
// import supabase from "./utils/supabase"
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("guest-list")
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null)

  function goToMeals() {
    setCurrentPage("meals")
  }

  function goToBeverages() {
    setCurrentPage("beverages")
  }

  function goToGuests() {
    setCurrentPage("guest-list")
  }

  function goToGuestsPlain() {
    setCurrentPage("guest-list-plain")
  }

  function goToUtensils() {
    setCurrentPage("utensils")
  }

  let pageContent

  if (currentPage === "guest-list") {
    pageContent = <GuestList />
  }

  if (currentPage === "guest-list-plain") {
    pageContent = <GuestListPlain />
  }

  if (currentPage === "meals") {
    pageContent = <PotluckMeals />
  }

  if (currentPage === "beverages") {
    pageContent = <PotluckBeverages />
  }

  if (currentPage === "utensils") {
    pageContent = <PotluckUtensils />
  }

  // async function handleLogin(e) {
  //   e.preventDefault()

  //   const email = e.target.elements.email.value
  //   const password = e.target.elements.email.value
  //   console.log(email, password)

  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: "example@email.com",
  //     password: "example-password",
  //   })

  //   if (data.user) {
  //     setUser(data.user)
  //   }

  //   if (error) {
  //     console.log(error)
  //     alert(error)
  //   }
  // }

  // const loginForm = (
  //   <div>
  //     <h3>Login</h3>
  //     <form onSubmit="handleLogin">
  //       <label htmlfor="">Email</label>
  //       <input type="email" name="email" id="email"></input>
  //       <label htmlfor="">Password</label>
  //       <input type="password" name="password" id="passowrd"></input>
  //       <button type="submit" onClick={handleLogin}>
  //         Login
  //       </button>
  //     </form>
  //   </div>
  // )

  return (
    <>
      <div className="container m-4">
        <div className="card p-2" style={{ width: "600px" }}>
          <div className="card-body text-center">
            <div className="d-flex justify-content-around row">
              <div className="col m-1">
                <button className="btn btn-primary m-1" onClick={goToGuests}>
                  Guest List
                </button>
                <button
                  className="btn btn-primary m-1"
                  onClick={goToGuestsPlain}
                >
                  Guest List Plain
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-around row">
              <div className="col">
                <button className="btn btn-primary m-1" onClick={goToMeals}>
                  Check Meals
                </button>
                <button className="btn btn-primary m-1" onClick={goToBeverages}>
                  Check Beverages
                </button>
                <button className="btn btn-primary m-1" onClick={goToUtensils}>
                  Check Utensils
                </button>
              </div>
            </div>
            {/* {loginForm} */}
          </div>
        </div>
      </div>
      {pageContent}
      {/* {user.email} */}
    </>
  )
}

export default App
