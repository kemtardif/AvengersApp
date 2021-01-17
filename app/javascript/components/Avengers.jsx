import React from "react";
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import  isAdministrator from "../components/isAdministrator";
import MarvelBanner from "../images/marvel-banner.jpg"
import Backgrounds from "../images/background.jpeg"




class Avengers extends React.Component {
  _isMounted = false;

    constructor(props) {
      super(props);
      this.state = {
        avengers: []

      };
    }


    componentDidMount() {
        this._isMounted = true;
        const url = "/api/v1/avengers";

        if(this.props.location.state?.isNotAllowed)
        {
          window.flash("You are not authorized on this page!", "danger");
        }
      
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Problem with response");
          })
          .then(response => {if (this._isMounted) {
              this.setState({ avengers: response})
          }});


    }

    componentWillUnmount() {
      this._isMounted = false;
    }
  
    render() {
        const { avengers} = this.state;
        const isAdmin = localStorage.getItem('isAdmin');
        
        const allAvengers = avengers.map((avenger) => (
          <div key={avenger.id} className="container">
            <img
                src={avenger.featured_image.url}
                alt={`${avenger.name} image`}
                width="200px" height="280px"
            />
            <div class="container">
              <div class="row">
                <div class="col">
                  <Link to=
                            {{
                              pathname: `/avengers/${avenger.id}`,

                            }}
                   className="btn-danger btn-lg btn-block" style = { { fontFamily: 'Bangers'}}>
                    {avenger.name}
                  </Link>
                </div>
                <div class="col"></div>
                <div class="w-100"></div>
                <div class="col">
                  <h5 style = { { fontFamily: 'Bangers'}}>{avenger.legalName}</h5>
                </div>
                <div class="col">
                  <p style = { { fontFamily: 'Bangers'}}>{avenger.status}</p>
                </div>
              </div>
            </div>
          </div>        
        ));


    
        return (
          <>
            <section className="jumbotron jumbotron-fluid text-center" style = { {backgroundImage : `url(${MarvelBanner})` , backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
              <div className="container py-5" >
                <h1 className="display-4" style = { {color : "black" , fontFamily: 'Bangers'}}> CATALOGUE</h1>
              </div>
            </section>
            <div className="py-5" style = { {backgroundImage : `url(${Backgrounds})` , backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
              <main className="container">
                <div className="text-right mb-3">
                  { (isAdmin === 'true') &&
                  <Link to="/avenger" className="btn btn-danger" style={{ fontFamily: "Bangers" }}>
                    Create New Avenger
                  </Link>
                  }
                  <a data-method="delete" href="/users/sign_out" >
                      <button type="button" className="btn btn-info" style={{ fontFamily: "Bangers" }}>Logout</button>
                  </a> 
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