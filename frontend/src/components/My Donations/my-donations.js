import { useEffect, useState } from "react";
import styles from "./my-donations.module.scss";
import { images } from "../../assets/images";
import { BiBlock } from "react-icons/bi";
import Button from "../layout/UI/Button";
import axios from "axios";
import LocalImage from "../../utils/localImage";
import { useNavigate } from "react-router-dom";

const changeOrderState = (orderId, type) => {
  axios
    .post(`http://localhost:8080/user/order-status/${orderId}/${type}`)
    .then(() => {
      console.log("Order status changed");
      window.location.reload();
    })
    .catch((err) => console.log(err));
};

function getData(pageState, data) {
  // some query to fetch data
  // after getting data, mapping to UI
  return data.map((record) => {
    const { id, order_dispatched, order_received, medInfo } = record;

    //get image as per status
    let orderImage = "";
    let adminImage = "";
    if (order_received && order_dispatched) {
      orderImage = images.check;
    } else {
      orderImage = images.warning;
    }

    if (pageState === "donate") {
      if (medInfo.adminApproveReceive) {
        adminImage = images.check;
      } else {
        adminImage = images.warning;
      }
    } else {
      if (medInfo.adminApproveDonation) {
        adminImage = images.check;
      } else {
        adminImage = images.warning;
      }
    }

    return (
      <div className={styles["table-row"]} key={id}>
        <div className={styles["user-info"]}>
          <div className={styles["donated-by"]}>
            {pageState === "donate" ? (
              <>
                <p className={styles["name"]}>
                  {medInfo.donatingUserInfo.name}
                </p>
                <p className={styles["phone"]}>
                  {medInfo.donatingUserInfo.phone_number}
                </p>
                <p className={styles["email"]}>
                  {medInfo.donatingUserInfo.email}
                </p>
              </>
            ) : (
              <>
                {medInfo.adminApproveReceive ? (
                  <>
                    <p className={styles["name"]}>
                      {medInfo.donatingUserInfo.name}
                    </p>
                    <p className={styles["phone"]}>
                      {medInfo.donatingUserInfo.phone_number}
                    </p>
                    <p className={styles["email"]}>
                      {medInfo.donatingUserInfo.email}
                    </p>
                  </>
                ) : (
                  <h4 className={styles["not-approved"]}>
                    Admin has not approved the donation yet !
                  </h4>
                )}
              </>
            )}
          </div>
          <div className={styles["status"]}>
            <img src={orderImage} alt="status" />
            <p className={styles["status"]} style={{ width: "100%" }}>
              {order_received && order_dispatched ? "Received" : "Pending"}
            </p>
          </div>
          <div className={styles["status"]}>
            <img src={adminImage} alt="status" />
            <p className={styles["status"]} style={{ width: "100%" }}>
              {pageState === "donate"
                ? medInfo.adminApproveReceive
                  ? "Approved"
                  : "Waiting"
                : medInfo.adminApproveDonation
                ? "Approved"
                : "Waiting"}
            </p>
          </div>
          <div className={styles["received-by"]}>
            {pageState === "receive" ? (
              <>
                <p className={styles["name"]}>
                  {medInfo.receivingUserInfo.name}
                </p>
                <p className={styles["phone"]}>
                  {medInfo.receivingUserInfo.phone_number}
                </p>
                <p className={styles["email"]}>
                  {medInfo.receivingUserInfo.email}
                </p>
              </>
            ) : (
              <>
                {medInfo.adminApproveDonation ? (
                  <>
                    <p className={styles["name"]}>
                      {medInfo.receivingUserInfo.name}
                    </p>
                    <p className={styles["phone"]}>
                      {medInfo.receivingUserInfo.phone_number}
                    </p>
                    <p className={styles["email"]}>
                      {medInfo.receivingUserInfo.email}
                    </p>
                  </>
                ) : (
                  <h4 className={styles["not-approved"]}>
                    Admin has not approved the donation yet !
                  </h4>
                )}
              </>
            )}
          </div>
          <div className={styles["order-state"]}>
            {pageState === "donate" && (
              <>
                <p
                  className={
                    order_dispatched === false ? styles["no"] : styles["yes"]
                  }
                >
                  {order_dispatched ? "Yes" : "No"}
                </p>
                {order_dispatched === false && (
                  <Button
                    text={"Change state ?"}
                    size={"xs"}
                    type={"secondary"}
                    disabled={medInfo.adminApproveReceive ? false : true}
                    onClick={() => changeOrderState(id, "dispatch")}
                  ></Button>
                )}
              </>
            )}
            {pageState === "receive" && (
              <>
                <p
                  className={
                    order_received === false ? styles["no"] : styles["yes"]
                  }
                >
                  {order_received ? "Yes" : "No"}
                </p>
                {order_received === false && (
                  <Button
                    text={"Change state ?"}
                    size={"xs"}
                    type={"secondary"}
                    disabled={medInfo.adminApproveDonation ? false : true}
                    // initiate a update db query
                    onClick={() => changeOrderState(id, "receive")}
                  ></Button>
                )}
              </>
            )}
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
                <img src={LocalImage(medInfo.medImg)} alt="Medicine" />
              </div>
              <div className={styles["med-info-info"]}>
                <p className={styles["name"]}>
                  Name : <span>{medInfo.medName}</span>
                </p>
                <p className={styles["ndc"]}>
                  NDC : <span>{medInfo.ndc}</span>
                </p>
                <p className={styles["type"]}>
                  Medicine Type : <span>{medInfo.medType}</span>
                </p>
                <p className={styles["description"]}>
                  Medicine description : <span>{medInfo.medDesc}</span>
                </p>
                <p className={styles["quantity"]}>
                  Date of Expriy : <span>{medInfo.doe}</span>
                </p>
              </div>
            </div>
            {medInfo.prescription && (
              <div className={styles["prescription"]}>
                <div className={styles["prescription-img"]}>
                  <img src={medInfo.prescription} alt="Prescription" />
                </div>
                <p>
                  Right-click on the prescription image, go to "Open Image in a
                  new Tab" to view it in full-screen
                </p>
              </div>
            )}
          </div>
          {pageState === "donate" && (
            <>
              <h3 style={{ margin: "1rem 0" }}>User Information</h3>
              {medInfo.adminApproveReceive ? (
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
                        {medInfo.receivingUserInfo.name}
                      </h4>
                      <h4>
                        <span>Ciry :&nbsp;</span>
                        {medInfo.receivingUserInfo.city}
                      </h4>
                      <h4>
                        <span>Email :&nbsp;</span>
                        <a href={`mailto:${medInfo.receivingUserInfo.email}`}>
                          {medInfo.receivingUserInfo.email}
                        </a>
                      </h4>
                      <h4>
                        <span>Phone :&nbsp;</span>
                        <a
                          href={`tel:${medInfo.receivingUserInfo.phone_number}`}
                        >
                          {`+91 ${medInfo.receivingUserInfo.phone_number}`}
                        </a>
                      </h4>
                      <h4>
                        <span>Address :&nbsp;</span>
                        <p>{medInfo.receivingUserInfo.address}</p>
                      </h4>
                    </div>
                  </div>
                </div>
              ) : (
                <h4 className={styles["not-approved"]}>
                  Admin has not approved the donation yet !
                </h4>
              )}
            </>
          )}
          {pageState === "receive" && (
            <>
              <h3 style={{ margin: "1rem 0" }}>User Information</h3>
              {medInfo.adminApproveDonation ? (
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
                        {medInfo.donatingUserInfo.name}
                      </h4>
                      <h4>
                        <span>Ciry :&nbsp;</span>
                        {medInfo.donatingUserInfo.city}
                      </h4>
                      <h4>
                        <span>Email :&nbsp;</span>
                        <a href={`mailto:${medInfo.donatingUserInfo.email}`}>
                          {medInfo.donatingUserInfo.email}
                        </a>
                      </h4>
                      <h4>
                        <span>Phone :&nbsp;</span>
                        <a
                          href={`tel:${medInfo.donatingUserInfo.phone_number}`}
                        >
                          {`+91 ${medInfo.donatingUserInfo.phone_number}`}
                        </a>
                      </h4>
                      <h4>
                        <span>Address :&nbsp;</span>
                        <p>{medInfo.donatingUserInfo.address}</p>
                      </h4>
                    </div>
                  </div>
                </div>
              ) : (
                <h4 className={styles["not-approved"]}>
                  Admin has not approved the donation yet !
                </h4>
              )}
            </>
          )}
        </details>
      </div>
    );
  });
}

function MyDonations() {
  const [pageState, setPageState] = useState("donate");
  const [queryRes, setQueryRes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (pageState === "donate") {
      axios
        .get("http://localhost:8080/user/donated-meds")
        .then(({ data }) => {
          let queryData = getData(pageState, data);
          setQueryRes(queryData);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:8080/user/received-meds")
        .then(({ data }) => {
          console.log(data);
          let queryData = getData(pageState, data);
          setQueryRes(queryData);
        })
        .catch((err) => console.log(err));
    }
  }, [pageState]);

  return (
    <>
      <h2 className={styles["title"]}>
        Track information about{" "}
        {pageState === "donate" ? "donated" : "received"} medications
      </h2>

      <div className={styles["switch-div"]}>
        <div
          className={`${styles["switch-div-nav"]} ${
            pageState === "donate" && styles["active"]
          }`}
          onClick={() => setPageState("donate")}
        >
          Donated By Me
        </div>
        <div
          className={`${styles["switch-div-nav"]} ${
            pageState === "receive" && styles["active"]
          }`}
          onClick={() => setPageState("receive")}
        >
          Received By Me
        </div>
      </div>

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
                <h3 className={styles["state-header"]}>
                  {pageState === "donate"
                    ? "Dispatched (Yes/No)"
                    : "Received (Yes/No)"}
                </h3>
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
              <h4>
                This usually means you have not{" "}
                {pageState === "donate" ? "donated" : "benefitted from"} any
                medications yet :(
              </h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyDonations;
