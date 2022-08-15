import { chakra } from "@chakra-ui/react";
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
      <div>
        <chakra.button
          height={"100%"}
          borderRadius={"xl"}
          flex={1}
          key='Yes'
          name={buttons[0].name}
          value={buttons[0].value}
          onClick={handleClick}
          className={'Yes' === clickedId ? "active" : "inactive"}
        >
          
        </chakra.button>

        <chakra.button
          height={"100%"}
          borderRadius={"xl"}
          flex={1}
          key='No'
          name={buttons[1].name}
          value={buttons[1].value}
          onClick={(event) => handleClick(event, i)}
          className={'No' === clickedId ? "active" : "inactive"}
        >
         
        </chakra.button>
        </div>
    </React.Fragment>
  );
};

/*-------------------------------------
*------------- PropTypes  -------------
*------------------------------------*/

ButtonGroup.propTypes = {
  buttons: PropTypes.array,
  onClick: PropTypes.func,
};
