import React from "react";
import { Link } from "react-router-dom";

class NewAvenger extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        legalName: "",
        status: "Active",
        featured_image : null
      };
  
      this.onChange = this.onChange.bind(this);
      this.onImageChange = this.onImageChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    stripHtmlEntities(str) {
        return String(str)
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
      }

      onImageChange(event) { 
        this.setState({ featured_image : event.target.files[0] });
      };
    
      onSubmit(event) {
        event.preventDefault();
        const url = "/avengers/create";

        const { name, legalName, status, featured_image} = this.state;
    
        if (name.length == 0 || legalName.length == 0 || status.length == 0)
          return;
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('legalName', legalName);
        formData.append('status', status);

        if (featured_image != null){
          formData.append('featured_image', featured_image);
        }
    
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token
          },
          body:formData
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.props.history.push(`/avenger/${response.name.replace(/ /g, '')}`))
          .catch(error => console.log(error.message));
      }

      render() {
        return (
          <div className="container mt-5" style = { {backgroundImage : "url(background2.jpeg)" , backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
            <div className="row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5">
                  Add an Avenger to the catalogue, yo!
                </h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="AvengerLegalName">Avenger legal name</label>
                    <input
                      type="text"
                      name="legalName"
                      id="AvengerLegalName"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="AvengerName">Avenger name</label>
                    <input
                      type="text"
                      name="name"
                      id="AvengerName"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <select className="form-control" id="avengerStatus" name = "status" onChange={this.onChange} defaultValue="Active">
                    <option value= "Active">Active</option>
                    <option value= "Inactive">Inactive</option>
                    <option value= "He ded">He ded</option>
                  </select>
                    <label htmlFor="featured_image">Upload an avatar</label>
                    <input type="file" accept="image/*" multiple={false} name = "featured_image" id= "AvengerImage" className="form-control" onChange={this.onImageChange}/>
                  <button type="submit" className="btn btn-outline-danger mt-3" >
                    Create Avenger!
                  </button>
                  <Link to="/avengers" className="btn btn-link mt-3">
                    Back to Avengers
                  </Link>
                </form>
              </div>
            </div>
          </div>
        );
      }
    
  }
  
  export default NewAvenger;