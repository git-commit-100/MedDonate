import { useState, useEffect, useCallback } from "react";
import Section from "../../layout/UI/Section";
import Modal from "../../layout/UI/Modal";
import Button from "../../layout/UI/Button";
import styles from "./AdminUsers.module.scss";
import { BiBlock } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { images } from "../../../assets/images";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import Card from "../../layout/UI/Card";
import useInput from "../../../utils/hooks/useInput";
import Input from "../../layout/UI/Input";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function AdminUsers() {
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [reqType, setReqType] = useState("");

  const deleteAUser = (userId) => {
    axios
      .post(`http://localhost:8080/admin/delete-user/${userId}`)
      .then(() => {
        setReqType("delete");
        setShowModal(true);
        setShowForm(false);
      })
      .catch((err) => console.log(err));
  };

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

  const closeModalandRefresh = () => {
    setShowModal(false);
    window.location.reload();
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
      .post("http://localhost:8080/admin/create-user", formObject)
      .then(() => {
        setReqType("create");
        setShowModal(true);
        setShowForm(false);
      })
      .catch((err) => console.log(err));
  };

  const getUsers = useCallback((users) => {
    if (users.length === 0) {
      return (
        <div className={styles["empty-result"]}>
          <h3>
            <BiBlock className={styles["icon"]} />
            No records present in database !
          </h3>
          <h4>It seems at present, there are no receive requests</h4>
        </div>
      );
    }
    return users.map((user) => {
      return (
        <div className={styles["table-row"]}>
          <div className={styles["user-info"]} key={user.id}>
            <div className={styles["img-div"]}>
              <img src={images.userAvatar} alt="profile" />
            </div>
            <div className={styles["users-summary"]}>
              <p>
                Name : <span>{user.name}</span>
              </p>
              <p>
                Email :{" "}
                <span>
                  <a href={`mailto:${user.email}`} style={{ color: "black" }}>
                    {user.email}
                  </a>
                </span>
              </p>
              <p>
                Is Logged In :{" "}
                <span style={{ color: "#2191f7" }}>
                  {user.isLoggedIn ? "Yes" : "No"}
                </span>
              </p>
            </div>
            <div className={styles["actions-div"]}>
              <Button
                type="danger"
                text={"Delete"}
                Icon={MdOutlineCancel}
                onClick={() => deleteAUser(user.id)}
                size="xs"
              />
            </div>
          </div>
          <details>
            <summary>Click to view more details</summary>
            <div className={styles["users-details"]}>
              <p>
                Phone Number : <span>{user.phone_number}</span>
              </p>
              <p>
                City : <span>{user.city}</span>
              </p>
              <p>
                Address : <span>{user.address}</span>
              </p>
            </div>
          </details>
        </div>
      );
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/users")
      .then(({ data }) => {
        let allUsers = getUsers(data);
        setUsers(allUsers);
      })
      .catch((err) => console.log(err));
  }, [getUsers]);

  return (
    <>
      <Modal
        show={showModal}
        closingButtonText={"Okay, got it"}
        hideModal={closeModalandRefresh}
        className={styles["modal"]}
      >
        <div className={styles["img-div"]}>
          <img src={images.check} alt="check" className={styles["modal-img"]} />
        </div>
        <h2>
          {reqType === "create"
            ? "User created successfully"
            : "User deleted successfully"}
        </h2>
        <h3>Refresh the page to see your changes !</h3>
      </Modal>
      <div className={styles["admin-users-div"]}>
        <h2 className={styles["title"]}>Manager Users</h2>
        <Button
          className={styles["create-user"]}
          text={"Create a User"}
          type="primary"
          size="xs"
          onClick={() => setShowForm(true)}
          Icon={FiEdit}
        />
        <div className={styles["table"]}>
          <div className={styles["table-header"]}>
            <h3 className={styles["img-header"]}>User avatar</h3>
            <h3 className={styles["user-header"]}>User Information</h3>
            <h3 className={styles["action-header"]}>Action ?</h3>
          </div>

          <div className={styles["table-main"]}>{users}</div>
        </div>
      </div>
      {showForm && (
        <Card className={styles["form-card"]}>
          <h3>Create a User</h3>

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
                text={"Create User"}
                Icon={AiOutlineArrowRight}
                onClick={handleRegisterFormSubmit}
                disabled={!validRegisterForm}
              />
            </div>
          </form>
        </Card>
      )}
    </>
  );
}

export default Section(AdminUsers, "admin-users", "secondary");
