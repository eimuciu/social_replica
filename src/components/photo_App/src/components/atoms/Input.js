import React from "react";
import styled from "styled-components";

const Input = ({ searchTerm, onSearchSubmit, onInputSearch }) => (
  <form onSubmit={onSearchSubmit}>
    <StyledInput
      type="text"
      placeholder="search and press Enter..."
      value={searchTerm}
      onChange={onInputSearch}
      readonly
    />
  </form>
);

const StyledInput = styled.input`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 15%;
  transition: right 1s ease, top 1s ease, transform 1s ease;
  &:focus {
    transform: scale(2);
    right: 50%;
    top: 20%;
    margin-right: -7.5%;
  }
  padding: 5px;
  text-align: center;
  border: none;
  @media (max-width: 768px) {
    width: 8%;
    &:focus {
      transform: scale(2);
      width: 30%;
      margin-right: -15%;
    }
  }
`;

export default Input;
