import React from 'react';
//React router
import { Link } from 'react-router-dom';
//MUI Components
import { Card as CardMaterial } from '@mui/material/';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

const LoungePanel = () => {
  return (
    <>
      <Card>
        <Header>Lounge</Header>
        <Container>
          <FlexItemOne>
            <StyledLink to="/lounge/theme_changer">Change Theme</StyledLink>
            <StyledLink to="/lounge/photo_album">Photo album</StyledLink>
          </FlexItemOne>
        </Container>
      </Card>
    </>
  );
};

export default LoungePanel;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  color: ${(props) => props.theme.palette.first};
  &:hover {
    color: ${(props) => props.theme.palette.second};
  }
`;

const Header = styled(Typography).attrs((props) => ({
  variant: 'h4',
}))`
  padding-bottom: 20px;
  text-align: center;
`;

const Card = styled(CardMaterial)`
  height: 80vh;
  position: fixed;
`;

const Container = styled(Grid).attrs((props) => ({
  container: true,
}))`
  height: 100%;
  width: 100%;
`;

const FlexItemOne = styled(Grid).attrs((props) => ({
  item: true,
  md: 12,
}))`
  height: 15%;
  text-align: center;
`;
