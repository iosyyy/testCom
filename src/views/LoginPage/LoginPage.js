import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// core components
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import cookie from "react-cookies";
import { LOGIN_API } from "../../utils/APIS";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [usernameOpen, setUsernameOpen] = useState(false);

  const classes = useStyles();
  const handleClick = () => {
    setLoading(true);
    if (username === "") setUsernameOpen(true);
    if (password === "") setOpen(true);
    axios
      .post(LOGIN_API, { username, password })
      .then((r) => {
        if (!r.data.code) {
          cookie.save("user", r.data.data, {
            path: "/",
            maxAge: new Date().setDate(new Date().getDate() + 15),
          });
          // eslint-disable-next-line react/prop-types
          props.history.push("/profile-page");
        }

        setLoading(false);
      })
      .catch((r) => {
        console.log(r);
        setLoading(false);
      });
  };
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage:
            "url('https://tests-1305221371.cos.ap-nanjing.myqcloud.com/K~QZWYUOHQ~)(N~%40TDX1%253F.png')",

          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[(cardAnimaton, "rightback")]}>
                <form className={classes.form}>
                  <CardHeader color={"primary"} className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      color="secondary"
                      labelText="username"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (event) => setUsername(event.target.value),
                        error: username === "",
                        helperText: "Incorrect entry.",
                        value: username,
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccountCircleIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <CustomInput
                      color="secondary"
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (event) => setPassword(event.target.value),
                        error: password === "",
                        helperText: "Incorrect entry.",
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <LoadingButton
                      size="lager"
                      color="secondary"
                      loadingPosition="start"
                      startIcon={<LoginIcon />}
                      variant="contained"
                      onClick={handleClick}
                      loading={loading}
                    >
                      Get started
                    </LoadingButton>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Snackbar
          open={usernameOpen}
          autoHideDuration={2000}
          onClose={() => {
            setUsernameOpen(false);
          }}
        >
          <Alert
            onClose={() => {
              setUsernameOpen(false);
            }}
            severity="error"
            sx={{ width: "100%" }}
          >
            username is undefined!
          </Alert>
        </Snackbar>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Alert
            onClose={() => {
              setOpen(false);
            }}
            severity="error"
            sx={{ width: "100%" }}
          >
            password is undefined!
          </Alert>
        </Snackbar>
        <Footer whiteFont />
      </div>
    </div>
  );
}
