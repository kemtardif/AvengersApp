import React from "react";
import { Link, useLocation } from "react-router-dom";
var md5 = require('md5');

class Avenger extends React.Component {
    constructor(props) {
      super(props);
      this.state = { id: "",
                    name: "",
                    legalName: "",
                    status: "",
                    firstAppearance: "",
                    placeOfBirth: "",
                    race:"",
                    description: "No description available", 
                    thumbnail: "",
                    extension: ""
                     };
      this.destroyHero = this.destroyHero.bind(this);
  
    }

    destroyHero(event) {
      event.preventDefault();
      let id = this.state.id;
      
      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(`/avengers/destroy/${ id }`, 
      {method: 'DELETE', 
      headers: {
        "X-CSRF-Token": token
      }})
      .then(response => {
        if (response.ok) {
          return this.props.history.push(`/avengers`);
        }
        throw new Error("Couldn`t destroy hero!");
      })
    }

    
    componentDidMount() {
      const {
        match: {
          params: { name }
        },
        location:{
          state: { id }
        }
      } = this.props;
    
        let baseUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${ name }&`;
        
        const publicKey = "6429deaf421bde956b828a9cf6f5fe3b"
        const privateKey = "f3b8e217acc71850f6cbbca17adb9e92aa6744a1"
        const ts = Date.now(); 
        const stringToHash = ts + privateKey + publicKey;
        const hash = md5(stringToHash);
        const urlMarvel = baseUrl + 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
        const urlInfo = `https://superheroapi.com/api/1748179568683239/search/${ name }`
    
        Promise.all([
          fetch(`/avengers/show/${ id }`),
          fetch(urlMarvel),
          fetch(urlInfo)
        ]).then(([responseBackEnd, responseMarvel, responseInfo]) => {
            if (responseBackEnd.ok && responseMarvel.ok && responseInfo.ok ) {
              return Promise.all([responseBackEnd.json(), responseMarvel.json(), responseInfo.json()]);
            }
            throw new Error("Problem with calls!");
          })
          .then(([respBack, respMarvel, respInfo]) => {
            this.setState({   id : respBack.id,   
                              name : respBack.name,
                              regalName : respBack.legalName,
                              status : respBack.status,
                              firstAppearance: respInfo.results[0].biography["first-appearance"],
                              placeOfBirth: respInfo.results[0].biography["place-of-birth"],
                              race:respInfo.results[0].appearance.race,
                              description: respMarvel.data.results[0].description,
                              thumbnail: respMarvel.data.results[0].thumbnail.path,
                              extension:respMarvel.data.results[0].thumbnail.extension

                          })
                });
          
      }
      render() {
        const avenger  = this.state;
      
        return (
          <div>
            <div className="hero position-relative d-flex align-items-center justify-content-center">
              <img
                src={`${avenger.thumbnail}/landscape_incredible.${avenger.extension}`}
                alt={`${avenger.name} image`}
                className="img-fluid position-absolute"
                style = {{ objectFit: "cover", display: "block"}}
              />
              <div className="overlay bg-dark position-absolute" />
              <h1 className="display-4 position-relative text-white" style={{fontFamily:"fantasy"}}>
                {avenger.name}
              </h1>
            </div>
            <div className="container py-5" >
              <div className="row">
                <div className="col-sm-12 col-lg-3">
                    <h5 className="mb-2">Description</h5>
                    {avenger.description}
                </div>
                <div className="col-sm-12 col-lg-3">
                  <h5 className="mb-2">Personnal Information</h5>
                  <div className="row">
                  <h5 className="mb-2">Name :</h5>
                      {avenger.name}
                  </div>
                  <div className="row">
                  <h5 className="mb-2">Legal Name :</h5>
                      {avenger.legalName}
                  </div>
                  <div className="row">
                  <h5 className="mb-2">Status :</h5>
                      {avenger.status}
                  </div>
                </div>
                <div className="col-md-auto col-lg-3">
                  <h5 className="mb-2">Additional Information</h5>
                  <div className="row">
                  <h5 className="mb-2">Place of Birth:</h5>
                      {avenger.placeOfBirth}
                  </div>
                  <div className="row">
                  <h5 className="mb-2">First Appearance :</h5>
                      {avenger.firstAppearance}
                  </div>
                  <div className="row">
                  <h5 className="mb-2">Race :</h5>
                      {avenger.race}
                  </div>
                </div>
                <div className="col-md-auto col-lg-3">
                <button  className="btn btn-outline-success mt-3" >
                    Update {avenger.name}
                  </button>
                  <button className="btn btn-outline-danger mt-3" onClick={this.destroyHero}>
                    Destroy {avenger.name}!
                  </button>
                  <Link to="/avengers" className="btn btn-link mt-3">
                    Back to Avengers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      }
  }
 
  
  export default Avenger;