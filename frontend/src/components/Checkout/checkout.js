import React, { useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../layout/UI/Button";
import { FaHandHoldingMedical } from "react-icons/fa";
import axios from "axios";
import localImage from "../../utils/localImage";
import { images } from "../../assets/images";
import Modal from "../layout/UI/Modal.js";

function Checkout() {
  const { id } = useParams();
  const naivgate = useNavigate();
  const [dataObj, setDataObj] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const [modal, setModal] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(true);

  useEffect(() => {
    // initiate db query
    axios
      .get(`http://localhost:8080/user/donate/${id}`)
      .then(({ data }) => {
        if (data) {
          setDataObj(data);
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const createOrder = () => {
    axios
      .post(`http://localhost:8080/user/receive/${dataObj.id}`)
      .then(() => {
        // display modal
        setShowCreateOrder(false);
        setModal(true);
        // setIsHidden(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {dataObj && (
        <>
          <Modal
            show={modal}
            hideModal={() => setModal(false)}
            closingButtonText={"Okay, got it"}
            className={
              modal ? `${styles["modal"]} ${styles["active"]}` : styles["modal"]
            }
          >
            <div className={styles["img-div"]}>
              <img
                src={images.check}
                alt="check"
                className={styles["modal-img"]}
              />
            </div>
            <h2>Donating User's details revealed !</h2>

            <div className={styles["info"]}>
              <h3>You can find your orders in :</h3>
              <h3 className={styles["cmd"]}>
                Dashboard &gt; My Donations &gt; Received by me{" "}
              </h3>
            </div>
          </Modal>
          <div className={styles["checkout-div"]}>
            <h2>Checkout Page</h2>
            <h3>Medcine Information</h3>
            <div className={styles["med-info-div"]}>
              <div className={styles["img-div"]}>
                <img src={localImage(dataObj.medImg)} alt="medicine" />
              </div>
              <div className={styles["medicine-info"]}>
                <h4>{dataObj.medName}</h4>
                <p>{dataObj.medDesc}</p>
                <h4>
                  <span>National Drug Code(NDC) :&nbsp;</span>
                  {dataObj.ndc}
                </h4>
                <h4>
                  <span>Date of expiry:&nbsp;</span>
                  {dataObj.doe}
                </h4>
              </div>
            </div>
            <h3>User Information</h3>
            <div className={styles["user-info-div"]}>
              <div className={styles["user-info"]}>
                <div className={styles["img-div"]}>
                  <img
                    src={images.userAvatar}
                    alt="profile"
                    className={styles["img"]}
                  />
                </div>
                <div className={styles["info-div"]}>
                  <h4>
                    <span>Name :&nbsp;</span>
                    {dataObj.donatingUserInfo.name}
                  </h4>
                  <h4>
                    <span>Ciry :&nbsp;</span>
                    {dataObj.donatingUserInfo.city}
                  </h4>
                  <h4>
                    <span>Email :&nbsp;</span>
                    <a
                      href={
                        !isHidden && `mailto:${dataObj.donatingUserInfo.email}`
                      }
                      className={isHidden ? styles["hidden"] : ""}
                    >
                      {isHidden
                        ? "Content is hidden"
                        : dataObj.donatingUserInfo.email}
                    </a>
                  </h4>
                  <h4>
                    <span>Phone :&nbsp;</span>
                    <a
                      href={
                        !isHidden &&
                        `tel:${dataObj.donatingUserInfo.phone_number}`
                      }
                      className={isHidden ? styles["hidden"] : ""}
                    >
                      {isHidden
                        ? "Content is hidden"
                        : `+91 ${dataObj.donatingUserInfo.phone_number}`}
                    </a>
                  </h4>
                  <h4>
                    <span>Address :&nbsp;</span>
                    <p className={isHidden ? styles["hidden"] : ""}>
                      {isHidden
                        ? "Content is hidden"
                        : dataObj.donatingUserInfo.address}
                    </p>
                  </h4>
                </div>
              </div>
              <div className={styles["actions-div"]}>
                {showCreateOrder && (
                  <Button
                    text={"I will take it "}
                    // db entry to take meds
                    onClick={createOrder}
                    Icon={FaHandHoldingMedical}
                  />
                )}
                <Button
                  text={"Take me back"}
                  type={"secondary"}
                  onClick={() => naivgate("/receive")}
                />
              </div>
            </div>
            <div className={styles["msg-div"]}>
              <p>
                To reveal the details of the donating user, click on{" "}
                <span style={{ fontWeight: "bold" }}>"I will Take it"</span>
              </p>
              <br />
              <p>
                <span style={{ fontWeight: "bold" }}>Note: &nbsp;</span>
                By clicking this, I agree that the donated medicine provided by
                the organization "MedDonate" is to only be used for personal and
                medicinal purposes only. Any attempt to use the donated medicine
                for commercial or business purposes is strictly prohibited may
                result it a legal action. If found to attempt any malicious
                practice involving the donated medicine, I am solely responsible
                for my actions and not the organization "MedDonate".
              </p>
            </div>
          </div>
        </>
      )}

      {!dataObj && <h3 style={{ textAlign: "center" }}>Invalid Route :(</h3>}
    </>
  );
}

export default Checkout;
