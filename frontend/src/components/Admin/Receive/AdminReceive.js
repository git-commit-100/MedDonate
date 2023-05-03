import { useCallback, useEffect, useState } from "react";
import styles from "./AdminReceive.module.scss";
import { images } from "../../../assets/images";
import { BiBlock } from "react-icons/bi";
import Button from "../../layout/UI/Button";
import axios from "axios";
import LocalImage from "../../../utils/localImage";
import Section from "../../layout/UI/Section";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";
import Modal from "../../layout/UI/Modal";
import { useNavigate } from "react-router-dom";

function AdminReceive() {
  const [queryRes, setQueryRes] = useState([]);
  const [modal, setModal] = useState(false);
  const [reqMode, setReqMode] = useState("");
  const navigate = useNavigate();

  const getData = useCallback((data) => {
    // some query to fetch data
    // after getting data, mapping to UI
    return data.map((record) => {
      const {
        id,
        medInfo: {
          id: medId,
          medName,
          medDesc,
          medImg,
          medType,
          ndc,
          doe,
          prescription,
          donatingUserInfo,
          receivingUserInfo,
          adminApproveReceive,
        },
        order_dispatched,
        order_received,
      } = record;

      //get image as per status
      let image = "";
      let orderImage = "";

      if (order_dispatched && order_received) {
        orderImage = images.check;
      } else {
        orderImage = images.warning;
      }

      if (adminApproveReceive) {
        image = images.check;
      } else {
        image = images.warning;
      }

      return (
        <div className={styles["table-row"]} key={id}>
          <div className={styles["user-info"]}>
            <div className={styles["donated-by"]}>
              <p className={styles["name"]}>{donatingUserInfo.name}</p>
              <p className={styles["phone"]}>{donatingUserInfo.phone_number}</p>
              <p className={styles["email"]}>{donatingUserInfo.email}</p>
            </div>
            <div className={styles["status"]}>
              <img src={orderImage} alt="order-status" />
              <p className={styles["status"]} style={{ width: "100%" }}>
                {order_dispatched && order_received ? "Received" : "Pending"}
              </p>
            </div>
            <div className={styles["status"]}>
              <img src={image} alt="status" />
              <p className={styles["status"]} style={{ width: "100%" }}>
                {adminApproveReceive ? "Approved" : "Pending"}
              </p>
            </div>
            <div className={styles["received-by"]}>
              <p className={styles["name"]}>{receivingUserInfo.name}</p>
              <p className={styles["phone"]}>
                {receivingUserInfo.phone_number}
              </p>
              <p className={styles["email"]}>{receivingUserInfo.email}</p>
            </div>
            <div className={styles["actions-div"]}>
              {!adminApproveReceive && (
                <Button
                  type="success"
                  text={"Accept"}
                  Icon={MdCheckCircleOutline}
                  size="xs"
                  onClick={() => adminAcceptReceive(medId)}
                />
              )}
              <Button
                type="danger"
                text={"Reject"}
                Icon={MdOutlineCancel}
                size="xs"
                onClick={() => adminRejectReceive(medId)}
              />
            </div>
          </div>

          <details className={styles["med-details"]}>
            <summary style={{ margin: "1rem 0" }}>
              See Medicine Info and Prescription
            </summary>
            <h3>Medicine Information</h3>
            <div className={styles["med-info"]}>
              <div className={styles["about-med"]}>
                <div className={styles["med-img"]}>
                  <img src={LocalImage(medImg)} alt="Medicine" />
                </div>
                <div className={styles["med-info-info"]}>
                  <p className={styles["name"]}>
                    Name : <span>{medName}</span>
                  </p>
                  <p className={styles["ndc"]}>
                    NDC : <span>{ndc}</span>
                  </p>
                  <p className={styles["type"]}>
                    Medicine Type : <span>{medType}</span>
                  </p>
                  <p className={styles["description"]}>
                    Medicine description : <span>{medDesc}</span>
                  </p>
                  <p className={styles["quantity"]}>
                    Date of Expriy : <span>{doe}</span>
                  </p>
                </div>
              </div>
            </div>
            <h3 style={{ margin: "1rem 0" }}>Donating User Information</h3>
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
                    {donatingUserInfo.name}
                  </h4>
                  <h4>
                    <span>Ciry :&nbsp;</span>
                    {donatingUserInfo.city}
                  </h4>
                  <h4>
                    <span>Email :&nbsp;</span>
                    <a href={`mailto:${donatingUserInfo.email}`}>
                      {donatingUserInfo.email}
                    </a>
                  </h4>
                  <h4>
                    <span>Phone :&nbsp;</span>
                    <a href={`tel:${donatingUserInfo.phone_number}`}>
                      {`+91 ${donatingUserInfo.phone_number}`}
                    </a>
                  </h4>
                  <h4>
                    <span>Address :&nbsp;</span>
                    <p>{donatingUserInfo.address}</p>
                  </h4>
                </div>
              </div>
            </div>
            <h3 style={{ margin: "1rem 0" }}>Receiving User Information</h3>
            {prescription && (
              <div className={styles["prescription"]}>
                <div className={styles["prescription-img"]}>
                  <img src={prescription} alt="Prescription" />
                </div>
                <p>
                  Right-click on the prescription image, go to "Open Image in a
                  new Tab" to view it in full-screen
                </p>
              </div>
            )}
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
                    {receivingUserInfo.name}
                  </h4>
                  <h4>
                    <span>Ciry :&nbsp;</span>
                    {receivingUserInfo.city}
                  </h4>
                  <h4>
                    <span>Email :&nbsp;</span>
                    <a href={`mailto:${receivingUserInfo.email}`}>
                      {receivingUserInfo.email}
                    </a>
                  </h4>
                  <h4>
                    <span>Phone :&nbsp;</span>
                    <a href={`tel:${receivingUserInfo.phone_number}`}>
                      {`+91 ${receivingUserInfo.phone_number}`}
                    </a>
                  </h4>
                  <h4>
                    <span>Address :&nbsp;</span>
                    <p>{receivingUserInfo.address}</p>
                  </h4>
                </div>
              </div>
            </div>
          </details>
        </div>
      );
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/receive")
      .then(({ data }) => {
        const queryData = getData(data);
        setQueryRes(queryData);
      })
      .catch((err) => console.log(err));
  }, [getData]);

  const closeModalAndNavigate = () => {
    setModal(false);
    navigate(0);
  };

  const adminAcceptReceive = (medId) => {
    axios
      .post(`http://localhost:8080/admin/receive-approve/${medId}`)
      .then(() => {
        setReqMode("create");
        setModal(true);
      })
      .catch((err) => console.log(err));
  };
  const adminRejectReceive = (medId) => {
    axios
      .post(`http://localhost:8080/admin/receive-reject/${medId}`)
      .then(() => {
        setReqMode("reject");
        setModal(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 className={styles["title"]}>
        Track information about receive requests
      </h2>

      <Modal
        show={modal}
        hideModal={closeModalAndNavigate}
        closingButtonText={"Got it"}
        className={
          modal ? `${styles["modal"]} ${styles["active"]}` : styles["modal"]
        }
      >
        <div className={styles["img-div"]}>
          <img src={images.check} alt="check" className={styles["modal-img"]} />
        </div>
        {reqMode === "create" ? (
          <h2>Receive request Approved successfully !</h2>
        ) : (
          <h2>Receive request Deleted successfully !</h2>
        )}

        {reqMode === "create" && (
          <div className={styles["info"]}>
            <h3>Now users can find latest order status in :</h3>
            <h3 className={styles["cmd"]}>
              User role &gt; Dashboard &gt; My Orders
            </h3>
          </div>
        )}
      </Modal>

      <div className={styles["user-orders-div"]}>
        <div className={styles["orders-main"]}>
          {/* search box ??  */}
          {queryRes.length > 0 && (
            <div className={styles["table"]}>
              <div className={styles["table-header"]}>
                <h3>Donated By</h3>
                <h3 className={styles["status-header"]}>Order Status</h3>
                <h3 className={styles["status-header"]}>
                  Admin Approval Status
                </h3>
                <h3 className={styles["received-header"]}>Received By</h3>
                <h3 className={styles["action-header"]}>Action ?</h3>
              </div>

              <div className={styles["table-main"]}>{queryRes}</div>
            </div>
          )}

          {queryRes.length === 0 && (
            <div className={styles["empty-result"]}>
              <h3>
                <BiBlock className={styles["icon"]} />
                No records present in database !
              </h3>
              <h4>It seems at present, there are no receive requests</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Section(AdminReceive, "admin-receive", "secondary");
