import React, { useEffect, useState } from 'react';
import FlashMessage from "react-flash-message"
import Bus from '../Utils/Bus';


 const Flash = () => {
  
    let [showMessage, setShowMessage] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        Bus.addListener('flash', ({message, type}) => {
            setShowMessage(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setShowMessage(false);
            }, 4000);
        });

    }, []);

    useEffect(() => {
        if(document.querySelector('.close') !== null) {
            document.
            querySelector('.close').
            addEventListener('click', () => setShowMessage(false));
        }
    })



    return (
        showMessage &&
            <FlashMessage duration={5000} persistOnHover={true}>
            <div className = {`alert alert-${type}`}>{message}</div>
          </FlashMessage>
          
    )
}

export default Flash;