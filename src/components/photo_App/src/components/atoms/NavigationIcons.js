import React from "react";
import styled from "styled-components";

export const ArrowRight = ({ clickRight, isTop }) => (
  <Div right onClick={clickRight} isTop={isTop}>
    ❯
  </Div>
);

export const ArrowLeft = ({ clickLeft, isTop }) => (
  <Div left onClick={clickLeft} isTop={isTop}>
    ❮
  </Div>
);

export const ClosePage = ({ oncloseFullSizeImage }) => (
  <Div2 onClick={oncloseFullSizeImage}>X</Div2>
);

const Div = styled.div`
  right: ${props => (props.right ? "20px" : "auto")};
  left: ${props => (props.left ? "20px" : "auto")};
  top: ${props => (props.isTop ? "none" : "42%")};
  cursor: pointer;
  position: absolute;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border-radius: 0 3px 3px 0;
  &:hover {
    transform: scale(2);
  }
`;
const Div2 = styled.div`
  position: absolute;
  top: 0px;
  right: 5px;
  color: white;
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(2);
  }
`;
