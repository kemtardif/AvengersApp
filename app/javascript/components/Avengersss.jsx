import React from "react";
import { Link } from "react-router-dom";
var md5 = require('md5');

class Avengers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        avengers: []
      };
    }

    componentDidMount() {

        let baseUrl = "https://gateway.marvel.com:443/v1/public/characters/1009165";
        
        const publicKey = "6429deaf421bde956b828a9cf6f5fe3b"
        const privateKey = "f3b8e217acc71850f6cbbca17adb9e92aa6744a1"
        const ts = Date.now();
        const stringToHash = ts + privateKey + publicKey;
        const hash = md5(stringToHash);
        const url = baseUrl + '?ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;

        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Something's wrong with the api call");
          })
          .then(response => this.setState({ avengers: response }))
          .catch(() => this.props.history.push("/"));
    }
    render() {
        const { avengers } = this.state;
        const allAvengers = avengers.map((avenger, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{avenger.name}</h5>
              </div>
            </div>
          </div>
        ));
        const noAvenger = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
              <h4>
                No Avenger yet. Why not create one?
              </h4>
            </div>
          );
    
        return (
          <>
            <section className="jumbotron jumbotron-fluid text-center">
              <div className="container py-5">
                <h1 className="display-4">List of super heroes, yo</h1>
                <p className="lead text-muted">
                  TEST TEST TEST 
                </p>
              </div>
            </section>
            <div className="py-5">
              <main className="container">
                <div className="row">
                  {avengers.length > 0 ? allAvengers : noAvenger}
                </div>
                <Link to="/" className="btn btn-link">
                  Home
                </Link>
              </main>
            </div>
          </>
        );
      }
  
  }
  export default Avengers;