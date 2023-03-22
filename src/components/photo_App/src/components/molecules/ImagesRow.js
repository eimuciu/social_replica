import React from "react";
import styled from "styled-components";
import { ArrowRight, ArrowLeft } from "../atoms/NavigationIcons";
import SingleImage from "../atoms/SingleImage";

const ImagesRow = ({ photoData, clickRight, clickLeft, onShowImage }) => (
  <Wrapper>
    {photoData.map(photo => (
      <Div key={photo}>
        <SingleImage
          src={photo.urls.small}
          isActive={photo.isActive}
          onShowImage={() => onShowImage(photo)}
        />
      </Div>
    ))}
    <ArrowRight clickRight={clickRight} isTop={true} />
    <ArrowLeft clickLeft={clickLeft} isTop={true} />
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  padding: 10px 0 0 0;
  margin: 10px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-flow: row wrap;
  }
`;

const Div = styled.div`
  width: 8%;
  margin: 5px;
  position: relative;
  transition: transform 0.1s;
  &:hover {
    top: -5px;
  }
  &:active {
    transform: scale(1.2);
  }
  @media (max-width: 768px) {
    width: 16%;
  }
`;

export default ImagesRow;
