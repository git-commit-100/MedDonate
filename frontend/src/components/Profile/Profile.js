import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import Card from "../layout/UI/Card";
import { images } from "../../assets/images";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Button from "../layout/UI/Button";
import { FiEdit } from "react-icons/fi";
import Input from "../layout/UI/Input";
import useInput from "../../utils/hooks/useInput";
import axios from "axios";
import Modal from "../layout/UI/Modal";

function generateAsterisk(pass) {
  let string = "";

  for (let i = 0; i < pass.toString().length; i++) {
    string = string.concat(" *");
  }

  return string;
}

function Profile() {
  const [userData, setUserData] = useState({});
  const [pass, setPass] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [showform, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePassChange = () => {
    setIsHidden((prevState) => !prevState);
  };

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();

    const formObject = {
      name: RNINputValue,
      email: REINputValue,
      password: RP2INputValue,
      phone_number: RPNInputValue,
      city: RCInputValue,
      address: RAInputValue,
    };

    axios
      .post("http://localhost:8080/user/profile", formObject)
      .then(() => {
        setShowModal(true);
        setShowForm(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/profile")
      .then(({ data }) => {
        return setUserData(data);
      })
      .then(() => {
        let string = generateAsterisk(userData.password);
        setPass(string);
      })
      .catch((err) => console.log(err));
  }, [userData.password]);

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

  const {
    value: RCInputValue,
    handleInputChange: RCChangeHandler,
    handleInputBlur: RCBlurHandler,
    hasError: RCHasError,
  } = useInput((city) => city.trim() !== "");

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

  return (
    <div className={styles["profile-div"]}>
      <h2 className={styles["header"]}>My Profile Page</h2>
      <Modal
        show={showModal}
        closingButtonText={"Okay, got it"}
        hideModal={() => setShowModal(false)}
        className={styles["modal"]}
      >
        <div className={styles["img-div"]}>
          <img src={images.check} alt="check" className={styles["modal-img"]} />
        </div>
        <h2>User details successfully updated</h2>
        <h3>Refresh the page to see your changes !</h3>
      </Modal>
      <Card className={styles["profile-card"]}>
        <div className={styles["img-div"]}>
          <img src={images.userAvatar} alt="pr0file" />
        </div>
        <div className={styles["user-info"]}>
          <div className={styles["account-info"]}>
            <h4>Account Information</h4>
            <p>
              Name : <span>{userData.name}</span>
            </p>
            <p>
              Email : <span>{userData.email}</span>
            </p>
            <div className={styles["password-div"]}>
              <p>Password : </p>
              <p className={styles["pass"]}>
                {isHidden ? pass : userData.password}
              </p>
              <div onClick={handlePassChange} className={styles["icon-eye"]}>
                {isHidden ? (
                  <AiOutlineEyeInvisible className={styles["icon-eye"]} />
                ) : (
                  <AiOutlineEye className={styles["icon-eye"]} />
                )}
              </div>
            </div>
          </div>
          <div className={styles["personal-info"]}>
            <h4>Personal Information</h4>
            <p>
              Phone Number : <span>{userData.phone_number}</span>
            </p>
            <p>
              City : <span>{userData.city}</span>
            </p>
            <p>
              Address : <span>{userData.address}</span>
            </p>
          </div>
          <div className={styles["actions-div"]}>
            <Button
              Icon={FiEdit}
              onClick={() => setShowForm(true)}
              text={"Edit Details"}
              type="secondary"
            />
          </div>
        </div>
      </Card>

      {showform && (
        <Card className={styles["form-card"]}>
          <h3>Update User Details</h3>

          <form action="POST">
            <Input
              label={"Enter your name"}
              inputConfig={{
                type: "text",
                autoComplete: "none",
                name: "name",
              }}
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
              inputConfig={{
                type: "email",
                autoComplete: "none",
                name: "email",
              }}
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
              inputConfig={{
                type: "number",
                autoComplete: "none",
                name: "phone_number",
              }}
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
                type: "text",
                autoComplete: "none",
                name: "address",
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
              label={"Enter your city"}
              inputConfig={{
                type: "text",
                autoComplete: "none",
                name: "city",
              }}
              useInputHook={{
                value: RCInputValue,
                handleInputChange: RCChangeHandler,
                handleInputBlur: RCBlurHandler,
                hasError: RCHasError,
              }}
              required={true}
              errorText={"City name cannot be empty"}
            />

            <Input
              label={"Password"}
              inputConfig={{
                type: "password",
                autoComplete: "none",
                name: "password",
              }}
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

            <div className={styles["form-actions"]}>
              <Button
                text={"Discard changes"}
                type="secondary"
                Icon={AiOutlineArrowLeft}
                iconAlignment="left"
                onClick={() => setShowForm(false)}
              />
              <Button
                text={"Save changes"}
                Icon={AiOutlineArrowRight}
                onClick={handleRegisterFormSubmit}
                disabled={!validRegisterForm}
              />
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

export default Profile;
