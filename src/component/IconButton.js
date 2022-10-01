import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { images } from "../images";
import { TouchableOpacity } from "react-native";

const Icon = styled.Image`
  tint-color: ${({ theme, completed }) =>
    completed ? theme.done : theme.text};
  width: 25px;
  height: 25px;
  margin: 13px;
`;

const IconButton = ({ type, onPressOut, id, completed }) => 
{
  const _onPressOut = () => {
    onPressOut(id);
  };

  return (
    <TouchableOpacity onPressOut={_onPressOut}>
      <Icon source={type} completed={completed} />
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
    onPressOut: () => {},
  };

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string,
  completed: PropTypes.bool,
};

export default IconButton;


/*투두리스트*/