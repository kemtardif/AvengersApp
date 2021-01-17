import React,{ useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import isAdministrator from "../components/isAdministrator";

    
    
    
const PrivateRoute=  ({ component: Component, ...rest }) => {
    const isAdmin = localStorage.getItem('isAdmin');

                                             return  (  
                                                            <Route
                                                            {...rest}
                                                            render={props =>
                                                                (isAdmin === 'true') ? 
                                                                (
                                                                    <Component {...props} />
                                                                ) : 
                                                                (
                                                                    <Redirect to={{ 
                                                                    pathname: '/avengers', 
                                                                    state: { from: props.location,
                                                                    isNotAllowed: true }                                     
                                                                    }} 
                                                                    />
                                                            )
                                                            }
                                                            />
                                                        );
                                           
                                        }      
     
                                                                                                                          
export default PrivateRoute;