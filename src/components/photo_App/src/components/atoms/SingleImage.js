import React from "react";
import styled from "styled-components";

const SingleImage = ({ src, onShowImage, isActive, fullSize }) => {
  return (
    <Img
      onClick={() => onShowImage()}
      src={src}
      isActive={isActive}
      fullSize={fullSize}
    />
  );
};
const Img = styled.img`
  border: ${(props) => (props.isActive ? "solid white" : "none")};
  height: ${(props) => (props.fullSize ? "100%" : "80px")};
  width: 100%;
  cursor: pointer;
  object-fit: cover;
`;

export default SingleImage;
