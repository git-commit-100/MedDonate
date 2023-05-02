import React, { useEffect, useState } from "react";
import styles from "./AdminReviewMeds.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../layout/UI/Button";
import axios from "axios";
import localImage from "../../../utils/localImage";
import { images } from "../../../assets/images";
import Modal from "../../layout/UI/Modal";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";

function AdminReviewMeds() {
  const { medId } = useParams();
  const navigate = useNavigate();
  const [dataObj, setDataObj] = useState(null);
  const [modal, setModal] = useState(false);
  const [reqMode, setReqMode] = useState("");

  const adminApproveDonation = (medId) => {
    axios
      .post(`http://localhost:8080/admin/donate-approve/${medId}`)
      .then(() => {
        setReqMode("create");
        setModal(true);
      })
      .catch((err) => console.log(err));
  };
  const adminRejectDonation = (medId) => {
    axios
      .post(`http://localhost:8080/admin/donate-reject/${medId}`)
      .then(() => {
        setReqMode("reject");
        setModal(true);
      })
      .catch((err) => console.log(err));
  };

  const closeModalAndNavigate = () => {
    setModal(false);
    navigate("/admin/donations");
  };

  useEffect(() => {
    // initiate db query
    axios
      .get(`http://localhost:8080/admin/donate/${medId}`)
      .then(({ data }) => {
        if (data) {
          setDataObj(data);
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  }, [medId]);

  return (
    <>
      {dataObj && (
        <>
          <Modal
            show={modal}
            hideModal={closeModalAndNavigate}
            closingButtonText={"Got it"}
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
            {reqMode === "create" ? (
              <h2>Donation Approved successfully !</h2>
            ) : (
              <h2>Donation Deleted successfully !</h2>
            )}

            {reqMode === "create" && (
              <div className={styles["info"]}>
                <h3>Now users can find medicines in :</h3>
                <h3 className={styles["cmd"]}>
                  User role &gt; Dashboard &gt; Receive Medicines
                </h3>
              </div>
            )}
          </Modal>
          <div className={styles["review-div"]}>
            <h2>Review Donating Medicine</h2>
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
            <h3>Donating User Information</h3>
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
                    <a href={`mailto:${dataObj.donatingUserInfo.email}`}>
                      {dataObj.donatingUserInfo.email}
                    </a>
                  </h4>
                  <h4>
                    <span>Phone :&nbsp;</span>
                    <a href={`tel:${dataObj.donatingUserInfo.phone_number}`}>
                      {`+91 ${dataObj.donatingUserInfo.phone_number}`}
                    </a>
                  </h4>
                  <h4>
                    <span>Address :&nbsp;</span>
                    <p>{dataObj.donatingUserInfo.address}</p>
                  </h4>
                </div>
              </div>
              <div className={styles["actions-div"]}>
                {!dataObj.adminApproveDonation && (
                  <Button
                    text={"Accept"}
                    Icon={MdCheckCircleOutline}
                    type="primary"
                    onClick={() => adminApproveDonation(medId)}
                  />
                )}
                <Button
                  text={"Remove"}
                  type={"danger"}
                  Icon={MdOutlineCancel}
                  onClick={() => adminRejectDonation(medId)}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {!dataObj && (
        <h3 style={{ textAlign: "center", padding: "2rem 0" }}>
          Invalid Route :(
        </h3>
      )}
    </>
  );
}

export default AdminReviewMeds;
