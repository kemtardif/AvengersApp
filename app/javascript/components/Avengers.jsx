import React from "react";
import { Link } from "react-router-dom";
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
//import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
          <div key={index} >
            <img
                src={avenger.featured_image.url}
                alt={`${avenger.name} image`}
                width="200px" height="280px"
            />
            <div class="container">
              <div class="row">
                <div class="col">
                  <Link to={`/avenger/${avenger.name.replace(/ /g, '')}`} className="btn btn-primary btn-block">
                    {avenger.name}
                  </Link>
                </div>
                <div class="col"></div>
                <div class="w-100"></div>
                <div class="col">
                  <h5>{avenger.legalName}</h5>
                </div>
                <div class="col">
                  <p>{avenger.status}</p>
                </div>
              </div>
            </div>
          </div>        
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
                  <Link to="/avenger" className="btn btn-danger">
                    Create New Avenger
                  </Link>
                </div>
                  <Carousel   
                            additionalTransfrom={0}
                            arrows
                            autoPlaySpeed={3000}
                            centerMode={false}
                            className=""
                            containerClass="container-with-dots"
                            dotListClass=""
                            draggable
                            focusOnSelect={false}
                            infinite
                            itemClass=""
                            keyBoardControl
                            minimumTouchDrag={80}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            responsive={{
                              desktop: {
                                breakpoint: {
                                  max: 3000,
                                  min: 1024
                                },
                                items: 3,
                                partialVisibilityGutter: 40
                              },
                              mobile: {
                                breakpoint: {
                                  max: 464,
                                  min: 0
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                              },
                              tablet: {
                                breakpoint: {
                                  max: 1024,
                                  min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                              }
                            }}
                            showDots={false}
                            sliderClass=""
                            slidesToSlide={1}
                            swipeable>
                    {allAvengers}
                  </Carousel>
              </main>
            </div>
          </>
        );
      }
  
  }
  export default Avengers;