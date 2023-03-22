import React from "react";
import styled from "styled-components";
import { ArrowRight, ArrowLeft } from "../atoms/NavigationIcons";
import SingleImage from "../atoms/SingleImage";
import Input from "../atoms/Input";
import Loader from "../atoms/Loader";

const MainImage = ({
  onSearchSubmit,
  searchTerm,
  onInputSearch,
  src,
  clickRight,
  clickLeft,
  onFullSizeImage,
  isLoading
}) => (
  <Wrapper>
    {isLoading ? (
      <Div>
        <Loader />
      </Div>
    ) : (
      <>
        <Input
          searchTerm={searchTerm}
          onInputSearch={event => onInputSearch(event)}
          onSearchSubmit={onSearchSubmit}
        />
        <Div>
          <SingleImage
            onShowImage={onFullSizeImage}
            src={src}
            fullSize={true}
          />
        </Div>
        <ArrowRight clickRight={clickRight} />
        <ArrowLeft clickLeft={clickLeft} />
      </>
    )}
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 20px 0 20px 0;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  width: 500px;
  height: 420px;
  padding: 20px;
  border: 1px solid white;
  &:hover {
    border: 1px solid black;
  }
`;

export default MainImage;
