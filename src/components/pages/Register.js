import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//MUI
import { makeStyles } from "@mui/styles";
// Actions
import { registerUser } from "../../redux/userActions";
//Redux hooks
import { useDispatch, useSelector } from "react-redux";
//Components
import TextInputField from "../atoms/TextInputField";
import InitialPageLayout from "../layouts/InitialPageLayout";
import { registerValidation } from "../../utils/formValidation";

const useStyles = makeStyles({
  root: { marginBottom: 20 },
});

const Register = () => {
  const dispatch = useDispatch();
  const userErrors = useSelector((state) => state.user.errors);

  const history = useHistory();
  const classes = useStyles();
  const [input, setInput] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    userName: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors((prev) => ({ ...prev, email: userErrors.registrationError }));
  }, [userErrors]);

  const handleChange = (event) => {
    setErrors({});
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const submitRegistration = () => {
    if (registerValidation(input)) {
      setErrors(registerValidation(input));
    } else {
      dispatch(
        registerUser(
          {
            user: input.email,
            password: input.password,
            userName: input.userName,
            profilePicture:
              "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/142254553/original/1e2ee54a4a189717e267e7110319f4b64e674a71/draw-an-avatar-portrait-cartoon-form-your-pet.png",
          },
          history
        )
      );
    }
  };
  return (
    <>
      <InitialPageLayout
        mainText="Register"
        onButtonClick={submitRegistration}
        buttonText="Register"
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
        <TextInputField
          variant="outlined"
          error={errors.repeatPassword}
          className={classes.root}
          name="repeatPassword"
          label="repeat password"
          type="password"
          value={input.repeatPassword}
          onChange={handleChange}
          fullWidth
          helperText={errors.repeatPassword}
        />
        <TextInputField
          variant="outlined"
          error={errors.userName}
          className={classes.root}
          name="userName"
          label="@user_name"
          type="text"
          value={input.userName}
          onChange={handleChange}
          fullWidth
          helperText={errors.userName}
        />
      </InitialPageLayout>
    </>
  );
};

export default Register;
