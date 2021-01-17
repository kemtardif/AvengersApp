import React from 'react';

async function isAdministrator()  {
    const response = await fetch("/api/v1/avengers/isAdmin");
    const data = await response.json();

    return data.isAdmin;
} 

export default isAdministrator;


