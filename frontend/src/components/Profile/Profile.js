import React, { useState } from "react";
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

const USER_INFO = {
  name: "Bhargav Kashiya",
  email: "bhargavkashiya@gmail.com",
  password: "bhargav123",
  phone: "+91 9175899936",
  address: "D-01, Abhilasha, Sai Nagar, Vasai (West)",
  city: "Vasai",
};

function generateAsterisk(pass) {
  let string = "";

  for (let i = 0; i < pass.toString().length; i++) {
    string = string.concat(" *");
  }

  return string;
}

function Profile() {
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState(USER_INFO);
  const [showPass, setShowPass] = useState(false);

  const { name, email, phone, address, city, gender, password } = userData;
  const passwordAsterisk = generateAsterisk(password);

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

  let isFormValid =
    !REHasError &&
    !RNHasError &&
    !RAHasError &&
    !RCHasError &&
    !RPNHasError &&
    !RPHasError &&
    !RP2HasError &&
    REINputValue.trim() !== "" &&
    RNINputValue.trim() !== "" &&
    RAInputValue.trim() !== "" &&
    RCInputValue.trim() !== "" &&
    RPNInputValue.trim() !== "" &&
    RPINputValue.trim() !== "" &&
    RP2INputValue.trim() !== "";

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    const updatedUserDetails = {
      name: RNINputValue,
      email: REINputValue,
      phone: RPNInputValue,
      password: RP2INputValue,
      address: RAInputValue,
      city: RCInputValue,
    };

    console.log(updatedUserDetails);

    // POST db query

    setUserData({ ...updatedUserDetails });
    setShowForm(false);
  }

  return (
    <div className={styles["profile-div"]}>
      <h2 className={styles["header"]}>My Profile Page</h2>
      <div className={styles["profile-card"]}>
        <div className={styles["img-div"]}>
          <img src={images.userAvatar} alt="profile" />
        </div>
        <div className={styles["user-info"]}>
          <div className={styles["account-info"]}>
            <h4>Account Info</h4>
            <p>
              Name:&nbsp;
              <span>{name}</span>
            </p>
            <p>
              Email:&nbsp;
              <span>{email}</span>
            </p>
            <div className={styles["password-div"]}>
              <p>Password:&nbsp;</p>
              <div className={styles["pass"]}>
                <span>{showPass ? password : passwordAsterisk}</span>
                {showPass ? (
                  <AiOutlineEye
                    onClick={() => setShowPass((prevState) => !prevState)}
                    className={styles["icon-eye"]}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPass((prevState) => !prevState)}
                    className={styles["icon-eye"]}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles["personal-info"]}>
            <h4>Personal Info</h4>
            <p>
              Phone Number:&nbsp;
              <span>{phone}</span>
            </p>
            <p>
              Address:&nbsp;
              <span>{address}</span>
            </p>
            <p>
              City:&nbsp;
              <span>{city}</span>
            </p>
          </div>

          {!showForm && (
            <div className={styles["actions-div"]}>
              <Button
                type="secondary"
                Icon={FiEdit}
                text="Edit details "
                onClick={() => setShowForm(true)}
              ></Button>
            </div>
          )}
        </div>
      </div>

      {/* form  */}
      {showForm && (
        <Card className={styles["edit-div"]}>
          <h3>Edit your details</h3>
          <form action="" method="POST" onSubmit={handleFormSubmit}>
            <div className={styles["input-fields"]}>
              <Input
                label={"Enter your name"}
                inputConfig={{
                  type: "text",
                  autoComplete: "none",
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
                label={"Your city"}
                useInputHook={{
                  value: RCInputValue,
                  handleInputChange: RCChangeHandler,
                  handleInputBlur: RCBlurHandler,
                  hasError: RCHasError,
                }}
                required={true}
                errorText={"City field cannot remain empty"}
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
            </div>
            <div className={styles["actions-div"]}>
              <Button
                text={"Discard changes"}
                type="secondary"
                Icon={AiOutlineArrowLeft}
                iconAlignment={"left"}
              />
              <Button
                text={"Submit changes"}
                Icon={AiOutlineArrowRight}
                disabled={!isFormValid}
              />
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

export default Profile;
