import { Link } from 'react-router-dom';
//MUI components
import CardMediaMaterial from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMaterial from '@mui/material/Card';
//Styled components
import styled from 'styled-components';

const CardMedia = styled(CardMediaMaterial)`
  height: 250px;
  object-fit: cover;
  object-position: 100% 40%;
`;

const RouterLink = styled(Link)`
  text-decoration: none;
`;

const Card = styled(CardMaterial)`
  position: relative;
  cursor: pointer;
  &:hover {
    top: -5px;
  }
`;

const data = [
  {
    to: '/lounge/theme_changer',
    text: 'Theme changer',
    imgSrc:
      'https://i.pinimg.com/originals/c9/bc/84/c9bc84b1d7ff7125b082fd9e1d3cda3c.jpg',
  },
  {
    to: '/lounge/photo_album',
    text: 'Photo album',
    imgSrc:
      'http://xdesktopwallpapers.com/wp-content/uploads/2012/04/Old%20Picture%20Album%20On%20The%20Wall.jpg',
  },
];

const LoungeLinksCard = ({ text, imgSrc, to }) => (
  <RouterLink to={to}>
    <Card>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h4">{text}</Typography>
        </Grid>
        <Grid item>
          <CardMedia component="img" image={imgSrc}></CardMedia>
        </Grid>
      </Grid>
    </Card>
  </RouterLink>
);

const Lounge = () => {
  return (
    <>
      <Typography
        variant="h2"
        style={{ paddingBottom: '20px', textAlign: 'center' }}
      >
        Lounge
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {data.map((item) => (
          <Grid item xs={11} sm={11} md={5}>
            <LoungeLinksCard
              text={item.text}
              imgSrc={item.imgSrc}
              to={item.to}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Lounge;
