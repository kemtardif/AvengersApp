import React from 'react';



export async function isAdministrator (obj) {


    const fetchAdmin = async () => {
        fetch("/api/v1/avengers/isAdmin")
        .then((response) => response.json())
            .then((response) => obj.setState({isAdmin: response.isAdmin}) );
       
    };

      return fetchAdmin();
};



