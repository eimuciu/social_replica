import { React, useEffect, useState } from "react";
// MUI
import { makeStyles } from "@mui/styles";
//Actions
import { loginUser } from "../../redux/userActions";
//Redux hooks
import { useDispatch, useSelector } from "react-redux";
//Components
import TextInputField from "../atoms/TextInputField";
import { loginValidation } from "../../utils/formValidation";
import InitialPageLayout from "../layouts/InitialPageLayout";

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
  },
});

const Login = (props) => {
  const dispatch = useDispatch();
  const userErrors = useSelector((state) => state.user.errors);
  const classes = useStyles();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors((prev) => ({ ...prev, email: userErrors.loginError }));
  }, [userErrors]);

  const handleChange = (event) => {
    setErrors({});
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const submitLogin = () => {
    if (loginValidation(input)) {
      setErrors(loginValidation(input));
    } else {
      dispatch(
        loginUser(
          input.email,
          input.password,
          props.history,
          props.setAuthenticated,
          props.setToken
        )
      );
    }
  };
  return (
    <>
      <InitialPageLayout
        mainText="Login"
        onButtonClick={submitLogin}
        buttonText="Login"
        loginPage={true}
      >
        <TextInputField
          variant="outlined"
          error={errors.email}
          className={classes.root}
          name="email"
          label="email"
          type="text"
          value={input.email}
          onChange={handleChange}
          fullWidth
          helperText={errors.email}
        />

        <TextInputField
          variant="outlined"
          error={errors.password}
          className={classes.root}
          name="password"
          label="password"
          type="password"
          value={input.password}
          onChange={handleChange}
          fullWidth
          helperText={errors.password}
        />
      </InitialPageLayout>
    </>
  );
};

export default Login;
