import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center" style = { {backgroundImage : "url(mainbackground.jpg)" , backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4" style={{ color: 'white',fontFamily: "Bangers"}}>Avengers catalogue</h1>
        <p className="lead" style={{ color: 'white',fontFamily: "Bangers"}}>
          Welcome to the avengers catalogue, homie
        </p>
        <hr className="my-4" />
        <Link
          to="/avengers"
          className="btn btn-lg custom-button"
          role="button"
          style={{ fontFamily: "Bangers"}}
        >
          Go to catalogue
        </Link>
        <a data-method="delete" href="/users/sign_out" >
            <button type="button" class="btn btn-lg custom-button" style={{ fontFamily: "Bangers" }}>Logout</button>
        </a> 

      </div>
    </div>
  </div>
);