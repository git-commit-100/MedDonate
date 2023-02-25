import { useState, useContext, useEffect } from "react";
import styles from "./Login.module.scss";
import { images } from "../../assets/images";
import Card from "../layout/UI/Card";
import Input from "../layout/UI/Input";
import Button from "../layout/UI/Button";
import { FiLogIn } from "react-icons/fi";
import useInput from "../../utils/hooks/useInput";
import { AppContext } from "../../utils/store/appContext";
import { useNavigate } from "react-router-dom";

// const url = `https://api.dicebear.com/5.x/initials/svg?seed=${RNINputValue}`;

function Login() {
  const [wantToRegister, setWantToRegister] = useState(false);
  const ctx = useContext(AppContext);
  const navigate = useNavigate();

  // when route ot login page, clear all loggedIn history
  const { logout } = ctx;
  useEffect(() => {
    logout();
  }, [logout]);

  // login form
  const {
    value: LEInputValue,
    hasError: LEHasError,
    handleInputChange: LEChangeHandler,
    handleInputBlur: LEBlurHandler,
  } = useInput(
    (email) => email.trim() !== "" && email.includes("@") && email.includes(".")
  );

  const {
    value: LPInputValue,
    hasError: LPHasError,
    handleInputBlur: LPBlurHandler,
    handleInputChange: LPChangeHandler,
  } = useInput((pass) => pass.trim() !== "" && pass.length > 7);

  let validLoginForm =
    !LEHasError && !LPHasError && LEInputValue !== "" && LPInputValue !== "";

  function handleLoginFormSubmit(e) {
    e.preventDefault();
    const loginFormObject = {
      token: Math.random().toString(),
      email: LEInputValue,
      pass: LPInputValue,
    };

    // make get req to db -> validate -> login

    // admin login
    const { email, pass, token } = loginFormObject;
    if (email === "admin@medDonate.com" && pass === "admin123") {
      ctx.login({
        token: loginFormObject.token,
        email: loginFormObject.email,
        role: "admin",
      });

      navigate("/admin");

      return;
    }

    ctx.login({
      token: token,
      email: email,
      role: "user",
    });

    // redirect user to index
    navigate("/dashboard");
  }

  // register from
  const {
    value: RNINputValue,
    handleInputBlur: RNBlurHanlder,
    handleInputChange: RNChangeHandler,
    hasError: RNHasError,
  } = useInput((name) => name.trim() !== "" && name.length > 2);

  const {
    value: REINputValue,
    handleInputBlur: REBlurHanlder,
    handleInputChange: REChangeHandler,
    hasError: REHasError,
  } = useInput(
    (email) => email.trim() !== "" && email.includes("@") && email.includes(".")
  );

  const {
    value: RPINputValue,
    handleInputBlur: RPBlurHanlder,
    handleInputChange: RPChangeHandler,
    hasError: RPHasError,
  } = useInput((pass) => pass.trim() !== "" && pass.length > 7);

  const {
    value: RP2INputValue,
    handleInputBlur: RP2BlurHanlder,
    handleInputChange: RP2ChangeHandler,
    hasError: RP2HasError,
  } = useInput(
    (pass) => pass.trim() !== "" && pass.length > 7 && pass === RPINputValue
  );

  const {
    value: RPNInputValue,
    handleInputChange: RPNChangeHandler,
    handleInputBlur: RPNBlurHandler,
    hasError: RPNHasError,
  } = useInput((phone) => phone.trim() !== "" && phone.length === 10);

  const {
    value: RAInputValue,
    handleInputChange: RAChangeHandler,
    handleInputBlur: RABlurHandler,
    hasError: RAHasError,
  } = useInput((address) => address.trim() !== "");

  let validRegisterForm =
    !RNHasError &&
    !REHasError &&
    !RPHasError &&
    !RP2HasError &&
    !RPNHasError &&
    !RAHasError &&
    RNINputValue !== "" &&
    REINputValue !== "" &&
    RPINputValue !== "" &&
    RP2INputValue !== "" &&
    RPNInputValue !== "" &&
    RAInputValue !== "";

  function handleRegisterFormSubmit(e) {
    e.preventDefault();
    const registerFormObj = {
      token: Math.random().toString(),
      name: RNINputValue,
      email: REINputValue,
    };

    // make post req to db -> validate -> login

    ctx.login({
      email: registerFormObj.email,
      token: registerFormObj.token,
    });

    // redirect user to index
    navigate("/dashboard");
  }

  return (
    <div className={styles["login-div"]}>
      <div className={styles["img-div"]}>
        <img src={images.syringe} alt="syringe" />
      </div>
      {!wantToRegister && (
        <div className={styles["login-section"]}>
          <Card className={styles["login-card"]}>
            <h3>Login Here</h3>

            <form action="POST">
              <Input
                label={"Enter your email"}
                inputConfig={{
                  type: "email",
                  autoComplete: "none",
                  name: "loginEmail",
                }}
                useInputHook={{
                  value: LEInputValue,
                  handleInputBlur: LEBlurHandler,
                  handleInputChange: LEChangeHandler,
                  hasError: LEHasError,
                }}
                required={true}
                errorText={"Please enter a valid email address"}
              />

              <Input
                label={"Password"}
                inputConfig={{
                  type: "password",
                  autoComplete: "none",
                  name: "loginPassword",
                }}
                useInputHook={{
                  value: LPInputValue,
                  hasError: LPHasError,
                  handleInputBlur: LPBlurHandler,
                  handleInputChange: LPChangeHandler,
                }}
                required={true}
                errorText={"Please enter a password of 8 or more characters"}
              />

              <div className={styles["form-actions"]}>
                <Button
                  text={"Register"}
                  type="secondary"
                  onClick={() => setWantToRegister(true)}
                />
                <Button
                  text={"Login"}
                  Icon={FiLogIn}
                  onClick={handleLoginFormSubmit}
                  disabled={!validLoginForm}
                />
              </div>
            </form>
          </Card>
        </div>
      )}
      {wantToRegister && (
        <div className={styles["register-section"]}>
          <Card className={styles["register-card"]}>
            <h3>Register Here</h3>

            <form action="POST">
              <Input
                label={"Enter your name"}
                inputConfig={{ type: "text", autoComplete: "none" }}
                useInputHook={{
                  value: RNINputValue,
                  handleInputChange: RNChangeHandler,
                  handleInputBlur: RNBlurHanlder,
                  hasError: RNHasError,
                }}
                required={true}
                errorText={"Please enter a name of 3 or more characters"}
              />

              <Input
                label={"Enter your email"}
                inputConfig={{ type: "email", autoComplete: "none" }}
                useInputHook={{
                  value: REINputValue,
                  handleInputChange: REChangeHandler,
                  handleInputBlur: REBlurHanlder,
                  hasError: REHasError,
                }}
                required={true}
                errorText={"Please enter a valid email address"}
              />

              <Input
                label={"Enter your phone number"}
                inputConfig={{ type: "number", autoComplete: "none" }}
                useInputHook={{
                  value: RPNInputValue,
                  handleInputChange: RPNChangeHandler,
                  handleInputBlur: RPNBlurHandler,
                  hasError: RPNHasError,
                }}
                required={true}
                errorText={"Please enter a valid phone number"}
              />

              <Input
                label={"Enter your residence address"}
                inputConfig={{
                  type: "number",
                  autoComplete: "none",
                }}
                useInputHook={{
                  value: RAInputValue,
                  handleInputChange: RAChangeHandler,
                  handleInputBlur: RABlurHandler,
                  hasError: RAHasError,
                }}
                required={true}
                errorText={"Residence Address cannot be empty"}
                textarea={true}
              />

              <Input
                label={"Password"}
                inputConfig={{ type: "password", autoComplete: "none" }}
                useInputHook={{
                  value: RPINputValue,
                  handleInputChange: RPChangeHandler,
                  handleInputBlur: RPBlurHanlder,
                  hasError: RPHasError,
                }}
                required={true}
                errorText={"Please enter a password of 8 or more characters"}
              />

              <Input
                label={"Re-enter Password"}
                inputConfig={{ type: "password", autoComplete: "none" }}
                useInputHook={{
                  value: RP2INputValue,
                  handleInputChange: RP2ChangeHandler,
                  handleInputBlur: RP2BlurHanlder,
                  hasError: RP2HasError,
                }}
                required={true}
                errorText={"Both passwords should match"}
              />

              <p className={styles["disclaimer"]}>
                By registering, I hereby declare that the information provided
                above is accurate to the best of my knowledge. Should any
                incorrect information have been recorded, I accept full
                responsibility for any actions taken as a result.
              </p>

              <div className={styles["form-actions"]}>
                <Button
                  text={"Login"}
                  type="secondary"
                  onClick={() => setWantToRegister(false)}
                />
                <Button
                  text={"Register"}
                  Icon={FiLogIn}
                  onClick={handleRegisterFormSubmit}
                  disabled={!validRegisterForm}
                />
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Login;
