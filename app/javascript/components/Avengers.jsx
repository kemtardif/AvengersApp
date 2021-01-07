import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

class Avengers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        avengers: []
      };
    }

    componentDidMount() {
        const url = "avengers/index";
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Problem with response");
          })
          .then(response => this.setState({ avengers: response }))
          .catch(() => this.props.history.push("/"));
    }
    render() {
        const { avengers } = this.state;
        const allAvengers = avengers.map((avenger, index) => (
          <div key={index}>
            <img
                src={avenger.featured_image.url}
                className="card-img-top"
                alt={`${avenger.name} image`}
            />
            <Link to={`/avenger/${avenger.name.replace(/ /g, '')}`} className="btn custom-button">
                  {avenger.name}
            </Link>
              <h5>{avenger.legalName}</h5>
              <p>{avenger.status}</p>
          </div>        
        ));

        const indicators = avengers.map((avenger, index) => (
          <li data-target="#carouselExampleIndicators" data-slide-to={index} class="active"></li>        
        ));

        const noAvenger = (
          <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
              No Avenger yet. Create one!<Link to="/avenger">AVENGERS YAY</Link>
            </h4>
          </div>
        );
    
        return (
          <>
            <section className="jumbotron jumbotron-fluid text-center" style = { {backgroundImage : "url(marvel-banner.jpg)" , backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
              <div className="container py-5" >
                <h1 className="display-4" style = { {color : "white" , fontFamily: 'verdana'}}> CATALOGUE</h1>
                <p className="lead text-muted">

                </p>
              </div>
            </section>
            <div className="py-5" style = { {backgroundImage : "url(background.jpeg)" , backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
              <main className="container">
                <div className="text-right mb-3">
                  <Link to="/avenger" className="btn custom-button">
                    Create New Avenger
                  </Link>
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <Carousel width="250px">
                    {allAvengers}
                  </Carousel>
                </div>
              </main>
            </div>
          </>
        );
      }
  
  }
  export default Avengers;