import React, { useState } from "react";
//React router
import { Link, useHistory } from "react-router-dom";
//Redux hoks
import { useDispatch } from "react-redux";
//User actions
import { logOutUser } from "../../redux/userActions";
//Styled components
import styled from "styled-components";
//MUI icons
import Home from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Notifications from "@mui/icons-material/Notifications";
import PhotoIcon from "@mui/icons-material/Photo";
//Test

import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.first};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.palette.second};
  }
`;

const MenuLabel = styled.label`
  background-color: ${(props) => props.theme.palette.first};
  position: fixed;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) =>
    props.clicked ? "transparent" : props.theme.palette.fifth};
  width: 2rem;
  height: 2px;
  display: inline-block;
  margin-top: 2rem;
  transition: all 0.3s;

  &::before,
  &::after {
    content: "";
    background-color: ${(props) => props.theme.palette.fifth};
    width: 2rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const data = [
  { icon: <Home />, text: "Home", to: "/" },
  { icon: <PhotoIcon />, text: "Lounge", to: "/lounge" },
  { icon: <Notifications />, text: "Notifications", to: "/notifications" },
  { icon: <AccountCircle />, text: "Account", to: "/account" },
];

const MobileNavBar = () => {
  const classes = useStyles();
  const [state, setState] = useState({ top: false });
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {data.map((item) => (
          <StyledLink key={item.text} to={item.to}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </StyledLink>
        ))}

        <StyledLink onClick={() => dispatch(logOutUser(history))}>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Log out"} />
          </ListItem>
        </StyledLink>
      </List>
    </div>
  );

  return (
    <div>
      <>
        <MenuLabel htmlFor="navi-toggle" onClick={toggleDrawer("top", true)}>
          <Icon clicked={state.top}>&nbsp;</Icon>
        </MenuLabel>
        <Drawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
        >
          {list("top")}
        </Drawer>
      </>
    </div>
  );
};

export default MobileNavBar;
