import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import MainImage from "./components/molecules/MainImage";
import ImagesRow from "./components/molecules/ImagesRow";
import FullImage from "./components/molecules/FullImage";
import { reducer } from "./reducer";
import * as apiCalls from "./apiCalls";

const currentPhotoSelector = state => {
  return state.photos.filter(x => x.isActive)[0] || { urls: {} };
};

const Photon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValue = {
    photos: [],
    pageIndex: 1,
    isFullSizeImage: false,
    searchTerm: "",
    searchTermAfterSubmit: ""
  };

  const [photoData, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    setIsLoading(true);
    if (photoData.searchTermAfterSubmit.length !== 0) {
      apiCalls
        .searchPhotos(photoData.pageIndex, photoData.searchTermAfterSubmit)
        .then(result => {
          dispatch({ type: "photos", payload: result.results });
        });
    } else {
      apiCalls.getPhotos(photoData.pageIndex).then(result => {
        dispatch({ type: "photos", payload: result });
      });
    }
    setIsLoading(false);
  }, [photoData.pageIndex, photoData.searchTermAfterSubmit]);

  const nextPage = () => {
    dispatch({ type: "nextPage" });
  };

  const prevPage = () => {
    dispatch({ type: "prevPage" });
  };

  const nextPhoto = () => {
    dispatch({ type: "nextPhoto" });
  };

  const prevPhoto = () => {
    dispatch({ type: "previousPhoto" });
  };

  const fullSizeImage = () => {
    dispatch({ type: "setFullSizeImage", payload: true });
  };

  const closeFullSizeImage = () => {
    dispatch({ type: "setFullSizeImage", payload: false });
  };

  const showImage = photo => {
    dispatch({ type: "showImage", payload: photo });
  };

  const handleSearchInput = event => {
    dispatch({ type: "changeSearchTerm", payload: event.target.value });
  };

  const submitSearch = e => {
    setIsLoading(true);
    e.preventDefault();
    apiCalls.searchPhotos(1, photoData.searchTerm).then(result => {
      dispatch({
        type: "searchedPhotos",
        payload: { photos: result.results, searchedTerm: photoData.searchTerm }
      });
    });
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Photon for Photos</h1>
      <FullImage
        oncloseFullSizeImage={closeFullSizeImage}
        clickRight={nextPhoto}
        clickLeft={prevPhoto}
        isFullSizeImage={photoData.isFullSizeImage}
        src={currentPhotoSelector(photoData).urls.regular}
        description={currentPhotoSelector(photoData).description}
      />
      <MainImage
        isLoading={isLoading}
        onFullSizeImage={fullSizeImage}
        clickRight={nextPhoto}
        clickLeft={prevPhoto}
        onInputSearch={handleSearchInput}
        onSearchSubmit={submitSearch}
        src={currentPhotoSelector(photoData).urls.regular}
        searchTerm={photoData.searchTerm}
      />

      <ImagesRow
        clickRight={nextPage}
        clickLeft={prevPage}
        onShowImage={showImage}
        photoData={photoData.photos}
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
`;

export default Photon;
