import React from "react";
import { Link } from "react-router-dom";
import MainBackground from "../images/mainbackground.jpg"
import  isAdministrator from "../components/isAdministrator";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
     
        };
    }
    componentDidMount() {
        isAdministrator()
            .then((response) => localStorage.setItem('isAdmin', response));
    }
    render() {
        return (      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center" style = { {backgroundImage : `url(${MainBackground})` , backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
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
     )

    }
}
 export default Home;    