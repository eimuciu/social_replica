import React from "react";
import styled from "styled-components";
import { ArrowRight, ArrowLeft, ClosePage } from "../atoms/NavigationIcons";

const FullImage = ({
  description,
  src,
  isFullSizeImage,
  clickRight,
  clickLeft,
  oncloseFullSizeImage,
}) => (
  <Wrapper isFullSizeImage={isFullSizeImage}>
    <Div>
      <PictureContainer src={src}>
        <ArrowRight clickRight={clickRight} />
        <ArrowLeft clickLeft={clickLeft} />
        <ClosePage oncloseFullSizeImage={oncloseFullSizeImage} />
      </PictureContainer>
    </Div>
  </Wrapper>
);

const Wrapper = styled.div`
  display: ${(props) => (props.isFullSizeImage ? "block" : "none")};
  z-index: 1;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 50%;
  margin-left: -50%;
  top: 0%;
  background-color: rgba(0, 0, 0);
`;

const Div = styled.div`
  z-index: 1;
  position: fixed;
  height: 95%;
  width: 95%;
  left: 50%;
  top: 70px;
  margin-left: -47.5%;
  background-color: rgba(0, 0, 0);
`;

const PictureContainer = styled.div`
  z-index: 1;
  height: 100%;
  width: 100%;
  position: relative;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.src});
  animation-name: slider;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  @keyframes slider {
    0% {
      top: -120%;
    }
    100% {
      top: 0;
    }
  }
`;

export default FullImage;
