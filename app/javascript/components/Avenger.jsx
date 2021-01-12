import React from "react";
import { Link, useLocation } from "react-router-dom";
import {isAdministrator} from "../components/isAdministrator";
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
                    extension: "",
                    isAdmin: false
                     };
      this.destroyHero = this.destroyHero.bind(this);


  
    }

    destroyHero(event) {
      event.preventDefault();
      let id = this.state.id;
      
      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(`/api/v1/avengers/${ id }`, 
      {method: 'DELETE', 
      headers: {
        "X-CSRF-Token": token
      }})
      .then( () => this.props.history.push(`/avengers`) )
      
    }

    
    componentDidMount() {
      const {
        match: {
          params: { id }
        }
      } = this.props;


           
        const publicKey = "6429deaf421bde956b828a9cf6f5fe3b"
        const privateKey = "f3b8e217acc71850f6cbbca17adb9e92aa6744a1"

        const ts = Date.now(); 
        const stringToHash = ts + privateKey + publicKey;
        const hash = md5(stringToHash);
       

          fetch(`/api/v1/avengers/${ id }`)
            .then((response) => {
              if ( response.ok ) {
                return response.json();
              }
              throw new Error("Problem with back-end call!");
            })
              .then( (response) => { 
                this.setState({   
                  id : response.id,   
                  name : response.name,
                  legalName : response.legalName,
                  status : response.status
                })

                let baseUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${ response.name }&`;
                const urlMarvel = baseUrl + 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
                const urlInfo = `https://superheroapi.com/api/1748179568683239/search/${ response.name }`

                return Promise.all([fetch(urlMarvel), fetch(urlInfo)]);
              })
                .then(([responseMarvel, responseInfo]) => {
                    if (responseMarvel.ok && responseInfo.ok ) {
                      return Promise.all([responseMarvel.json(), responseInfo.json()]);
                    }
                    throw new Error("Problem with api calls!");
                  })
                  .then(([respMarvel, respInfo]) => {
                    this.setState({   
                                      firstAppearance: respInfo.results[0].biography["first-appearance"],
                                      placeOfBirth: respInfo.results[0].biography["place-of-birth"],
                                      race:respInfo.results[0].appearance.race,
                                      description: respMarvel.data.results[0].description,
                                      thumbnail: respMarvel.data.results[0].thumbnail.path,
                                      extension:respMarvel.data.results[0].thumbnail.extension

                                  })
                        })

  isAdministrator(this);   
                 
          
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
              <h1 className="display-4 position-relative text-white" style={{ fontFamily: "Bangers"}}>
                {avenger.name}
              </h1>
            </div>
            <div className="container py-5" >
              <div className="row">
                <div className="col-sm-12 col-lg-3">
                    <h5 className="mb-2" style={{ fontFamily: "Bangers"}}>Description</h5>
                    {avenger.description}
                </div>
                <div className="col-sm-12 col-lg-3">
                  <h5 className="mb-2" style={{ fontFamily: "Bangers"}}>Personnal Information</h5>
                  <div className="row">
                  <h5 className="mb-2" style={{ fontFamily: "Bangers"}}>Name :</h5>
                      {avenger.name}
                  </div>
                  <div className="row">
                  <h5 className="mb-2" style={{ fontFamily: "Bangers"}}>Legal Name :</h5>
                      {avenger.legalName}
                  </div>
                  <div className="row">
                  <h5 className="mb-2" style={{ fontFamily: "Bangers"}}>Status :</h5>
                      {avenger.status}
                  </div>
                </div>
                <div className="col-md-auto col-lg-3">
                  <h5 className="mb-2" style={{ fontFamily: "Bangers"}}>Additional Information</h5>
                  <div className="row">
                  <h5 className="mb-2" style={{ fontFamily: "Bangers"}}>Place of Birth:</h5>
                      {avenger.placeOfBirth}
                  </div>
                  <div className="row">
                  <h5 className="mb-2" style={{ fontFamily: "Bangers"}}>First Appearance :</h5>
                      {avenger.firstAppearance}
                  </div>
                  <div className="row">
                  <h5 className="mb-2" style={{ fontFamily: "Bangers"}}>Race :</h5>
                      {avenger.race}
                  </div>
                </div>
                <div className="col-md-auto col-lg-3">
                { avenger.isAdmin &&
                  <Link to={{pathname: `/avengers/${avenger.id}/edit`,}}className="btn btn-outline-success mt-3" style={{ fontFamily: "Bangers"}}>
                    Edit {avenger.name}
                  </Link>
                  }{ avenger.isAdmin &&
                  <button className="btn btn-outline-danger mt-3" onClick={this.destroyHero} style={{ fontFamily: "Bangers"}}>
                    Destroy {avenger.name}!
                  </button>
                    }
                  <Link to="/avengers" className="btn btn-link mt-3" style={{ fontFamily: "Bangers"}}>
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