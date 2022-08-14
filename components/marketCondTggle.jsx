import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";


/*
--------  ButtonGroup Component -----
* @Description : 
* Creates a group of buttons that 
* where only one can be clicked (selected) at once.
*/

export const ButtonGroup = ({ buttons, onClick }) => {


  const [clickedId, setClickedId] = useState(-1);

  //set onClick per button Id
  const handleClick = (event, id) => {
    event.preventDefault();
    setClickedId(id);
    onClick(event);
  };

  //use effect sets 1st button to clicked
  useEffect(() => {
    setClickedId(0);
  }, []);

  /*-------------------------------------
  *-------- RENDERED CONTENT ------------
  *------------------------------------*/

  return (
    <React.Fragment>
      <div className="flex flex-row justify-center items-center h-14 bg-[gray] rounded-xl">
      {buttons.map((buttonObject, i) => (
        <button
          key={i}
          name={buttonObject.name}
          value={buttonObject.value}
          onClick={(event) => handleClick(event, i)}
          className={i === clickedId ? "bg-[#B6F563] w-1/2 h-14 rounded-xl" : "bg-[gray] w-1/2 h-14 rounded-xl"}
        >
          {buttonObject.name}
        </button>
      ))}
      </div>
    </React.Fragment>
  );


/*-------------------------------------
*------------- PropTypes  -------------
*------------------------------------*/

ButtonGroup.propTypes = {
  buttons: PropTypes.array,
  onClick: PropTypes.func,
};

}

