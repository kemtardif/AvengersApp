import React from "react";
import { Link } from "react-router-dom";
var md5 = require('md5');

class Avenger extends React.Component {
    constructor(props) {
      super(props);
      this.state = { name: "", 
                    description: "No description available", 
                    thumbnail: "",
                    extension: "" };
  
    }
    componentDidMount() {
        const {
          match: {
            params: { name }
          }
        } = this.props;
    
        let baseUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${ name }&`;
        
        const publicKey = "6429deaf421bde956b828a9cf6f5fe3b"
        const privateKey = "f3b8e217acc71850f6cbbca17adb9e92aa6744a1"
        const ts = Date.now(); 
        const stringToHash = ts + privateKey + publicKey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Couldn't find heroe in Marvel API!");
          })
          .then(response => this.setState({ name : response.data.results[0].name,
                                            description: response.data.results[0].description,
                                            thumbnail: response.data.results[0].thumbnail.path,
                                            extension:response.data.results[0].thumbnail.extension}))
          .catch(() => this.props.history.push("/avengers"));
      }
      render() {
        const avenger  = this.state;
      
        return (
          <div style = { {backgroundImage : "url(background.jpeg)" , backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
            <div className="hero position-relative d-flex align-items-center justify-content-center">
              <img
                src={`${avenger.thumbnail}/landscape_incredible.${avenger.extension}`}
                alt={`${avenger.name} image`}
                className="img-fluid position-absolute"
                style = {{ objectFit: "cover"}}
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
              </div>
              <Link to="/avengers" className="btn btn-link">
                Back to Avengers
              </Link>
            </div>
          </div>
        );
      }
  }
 
  
  export default Avenger;