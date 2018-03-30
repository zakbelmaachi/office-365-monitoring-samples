import React from 'react';
import Button from '../Button/Button';
import './ButtonGroup.css';

// not currently used

const ButtonGroup = (props) => (

    props.data.map((data, id) => {
        <Button 
            className="button-spacing" 
            onClick={data.handleClick} 
            action={data.action} 
            key={id} 
        />
    })

    <div className="button-container">
        {/* <Button className="button-spacing" action="Get Activity for Past 7 Days" />
        <Button className="button-spacing" action="Get Activity for Past 30 Days" />
        <Button className="button-spacing" action="Get Activity for Past 90 Days" />
        <Button className="button-spacing" action="Get Activity for Past 180 Days" /> */}
    </div>
);

export default ButtonGroup;
