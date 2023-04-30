import React, { useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import Button from "../layout/UI/Button";
import { FaHandHoldingMedical } from "react-icons/fa";
import axios from "axios";

function Checkout() {
  const { id } = useParams();
  const naivgate = useNavigate();
  const [dataObj, setDataObj] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // initiate db query
    axios
      .get(`http://localhost:8080/user/donate/${id}`)
      .then(({ data }) => {
        setDataObj(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      {dataObj && (
        <div className={styles["checkout-div"]}>
          <h2>Checkout Page</h2>
          <h3>Medcine Information</h3>
          <div className={styles["med-info-div"]}>
            <div className={styles["img-div"]}>
              <img src={dataObj.medImg} alt="medicine" />
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
                  // src={images.userAvatar}
                  alt="profile"
                  className={styles["img"]}
                />
              </div>
              <div className={styles["info-div"]}>
                <h4>
                  <span>Name :&nbsp;</span>
                  {dataObj.UserId.name}
                </h4>
                <h4>
                  <span>Ciry :&nbsp;</span>
                  {dataObj.UserId.city}
                </h4>
                <h4>
                  <span>Email :&nbsp;</span>
                  <a
                    href={!isHidden && `mailto:${dataObj.UserId.email}`}
                    className={isHidden ? styles["hidden"] : ""}
                  >
                    {isHidden ? "Content is hidden" : dataObj.UserId.email}
                  </a>
                </h4>
                <h4>
                  <span>Phone :&nbsp;</span>
                  <a
                    href={!isHidden && `tel:${dataObj.UserId.phone_number}`}
                    className={isHidden ? styles["hidden"] : ""}
                  >
                    {isHidden
                      ? "Content is hidden"
                      : `+91 ${dataObj.UserId.phone_number}`}
                  </a>
                </h4>
                <h4>
                  <span>Address :&nbsp;</span>
                  <p className={isHidden ? styles["hidden"] : ""}>
                    {isHidden ? "Content is hidden" : dataObj.UserId.address}
                  </p>
                </h4>
              </div>
            </div>
            <div className={styles["actions-div"]}>
              <Button
                text={"I will take it "}
                // db entry to take meds
                onClick={() => setIsHidden(false)}
                Icon={FaHandHoldingMedical}
              />
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
      )}
    </>
  );
}

export default Checkout;
