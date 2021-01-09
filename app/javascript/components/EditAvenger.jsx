import React from "react";
import { Link } from "react-router-dom";

class EditAvenger extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: "",
            name: "",
            legalName: "",
            status: "",
            featured_image: null,
            attachment: null,
            imageURL:""        
        };

    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onImageChange(event) { 
        this.setState({ attachment: event.target.files[0],
                        imageURL: URL.createObjectURL(event.target.files[0]) });
      };
   
    onSubmit(event) {
        event.preventDefault();

        const { id, name, legalName, status, attachment} = this.state;
        const url = `/avengers/update/${ id }`;

        if (name.length == 0 || legalName.length == 0 || status.length == 0)
          return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('legalName', legalName);         
        formData.append('status', status);       
        if (attachment != null){
            formData.append('featured_image', attachment);
          }

    
        const token = document.querySelector('meta[name="csrf-token"]').content;          
        fetch(url , {
            method: "PUT",
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
        .then(response => this.props.history.push(`/avenger/${response.name.replace(/ /g, '')}`, {id: response.id}))
        .catch(error => console.log(error.message));
    }

    componentDidMount() {
        const {
            location:{
              state: { id }
            }
          } = this.props;

        const url = `/avengers/show/${ id }`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();            
                }
                throw new Error("Problem with response");
            })
            .then(response => {
                this.setState({ id: response.id,
                                name: response.name,
                                legalName: response.legalName,
                                status: response.status,
                                featured_image: response.featured_image,
                                imageURL: response.featured_image.url
                            })
            })
            .catch(() => this.props.history.push("/"));
    }

    render() {
        const  avenger  = this.state;

        return (
          <div className="container mt-5" style = { {backgroundImage : "url(background2.jpeg)" , backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
            <div className="row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5" style={{ color: 'red', fontFamily: "Bangers" }}>
                  Update {avenger.name}!
                </h1>
                <div className="row">
                    <div className="col"> 
                    <img
                        src={avenger.imageURL}
                        alt={`${avenger.name} image`}
                        width="200px" height="280px"
                    />         
                    </div>
                    <div className="col">  
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="AvengerLegalName" style={{ color: 'blue', fontFamily: "Bangers" }}>Avenger legal name</label>
                                <input
                                type="text"
                                name="legalName"
                                value= {avenger.legalName}
                                id="AvengerLegalName"
                                className="form-control"
                                required
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="AvengerName" style={{ color: 'red', fontFamily: "Bangers" }}>Avenger name</label>
                                <input
                                type="text"
                                name="name"
                                value= {avenger.name}
                                id="AvengerName"
                                className="form-control"
                                required
                                onChange={this.onChange}
                                />
                            </div>
                            <select className="form-control" id="avengerStatus" name = "status" onChange={this.onChange} value= {avenger.status}>
                                <option value= "Active">Active</option>
                                <option value= "Inactive">Inactive</option>
                                <option value= "He ded">He ded</option>
                            </select>
                                <label htmlFor="featured_image" style={{ color: 'blue', fontFamily: "Bangers" }}>Upload an avatar</label>
                                <input type="file" accept="image/*" multiple={false} name = "featured_image" id= "AvengerImage" className="form-control" onChange={this.onImageChange}/>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-outline-danger mt-3" style = { { fontFamily: 'Bangers'}}>
                                        Update {avenger.name}!
                                    </button>
                                </div>
                                <div className="col">
                                    <Link to="/avengers" className="btn btn-outline-primary mt-3" style = { { fontFamily: 'Bangers'}}>
                                        Back to Avengers
                                    </Link>
                                </div>
                            </div>
                        </form>        
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default EditAvenger;