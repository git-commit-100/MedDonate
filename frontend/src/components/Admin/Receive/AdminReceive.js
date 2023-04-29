import React from "react";
import Section from "../../layout/UI/Section";
import styles from "./AdminReceive.module.scss";
import { images } from "../../../assets/images";
import Button from "../../layout/UI/Button";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";

// query from db
const DATABASE_RECORD = [
  {
    id: 1,
    userInfo: {
      donatedBy: {
        name: "Bhargav Kashiya",
        phone: "+91 9175899936",
        email: "bhargavkashiya@gmail.com",
        city: "Vasai",
      },
      receivedBy: {
        name: "Jimit Joshi",
        phone: "+91 8554609445",
        email: "jimit08joshi@gmail.com",
        city: "Dahisar",
        prescription:
          "https://th.bing.com/th/id/OIP.0zbt5gPrxwHAXjoWTrZL2AHaJ4?pid=ImgDet&rs=1",
      },
    },
    status: "pending",
    orderStateFromDonation: "No",
    orderStateFromReceiver: "No",
    medInfo: {
      medName: "Crocin 650",
      desc: "Crocin Cold & Flu Max Tablet 15's is ac combination medication used to treat common cold symptoms and allergies like sneezing, runny/stuffy nose, fever, headache, body pains, congestion, or watery eyes.",
      doe: "24/08/2030",
      quantity: 4,
      img: "https://newassets.apollo247.com/pub/media/catalog/product/c/r/cro0023.jpg",
      ndc: "584-4654-3435",
    },
  },
  {
    id: 2,
    userInfo: {
      donatedBy: {
        name: "Bhargav Kashiya",
        phone: "+91 9175899936",
        email: "bhargavkashiya@gmail.com",
        city: "Vasai",
      },
      receivedBy: {
        name: "Yash Ramteke",
        phone: "+91 8554609445",
        email: "yashramteke@gmail.com",
        city: "Andheri",
        prescription:
          "https://runningadik.files.wordpress.com/2016/06/rx1stsourceblogspotcom.jpg?w=300&h=300",
      },
    },
    status: "received",
    orderStateFromDonation: "Yes",
    orderStateFromReceiver: "Yes",
    medInfo: {
      medName: "Zandu Sudarshan Tablet",
      doe: "22/05/2023",
      quantity: 3,
      desc: "Zandu Sudarshan Ghanvati contains the goodness of Triphala, Haridra, Daruharidra, Kantakari, Karcura, Pippalimool, and more. Triphala protects the body from the threat of allergens and infections. This Ayurvedic formula restores the balance of the three prominent doshas and improves the body’s overall immunity response. It is formulated to encourage the production of healthy immune system cells.",
      img: "https://th.bing.com/th/id/OIP.bxH8G_9chHbPi9ibJ-z7wQHaHa?pid=ImgDet&rs=1",
      ndc: "976-5965-2445",
    },
  },
];

// after getting data, mapping to UI

const dataFromDb = DATABASE_RECORD.map((record) => {
  const {
    id,
    medInfo,
    status,
    userInfo: { donatedBy, receivedBy },
  } = record;
  //get image as per status
  let image = "";
  if (status === "received") {
    image = images.check;
  } else if (status === "available") {
    image = images.arrows;
  } else {
    image = images.warning;
  }

  return (
    <div className={styles["table-row"]} key={id}>
      <div className={styles["user-info"]}>
        <div className={styles["donated-by"]}>
          <p className={styles["name"]}>{donatedBy.name}</p>
          <p className={styles["phone"]}>{donatedBy.phone}</p>
          <p className={styles["email"]}>{donatedBy.email}</p>
        </div>
        <div className={styles["status"]}>
          {status && (
            <>
              <img src={image} alt="status" />
              <p className={styles[status]}>{status}</p>
            </>
          )}
        </div>
        <div className={styles["received-by"]}>
          <p className={styles["name"]}>
            {receivedBy.name ? receivedBy.name : "NULL"}
          </p>
          <p className={styles["phone"]}>
            {receivedBy.phone ? receivedBy.phone : "NULL"}
          </p>
          <p className={styles["email"]}>
            {receivedBy.email ? receivedBy.email : "NULL"}
          </p>
        </div>
        <div className={styles["action"]}>
          {status !== "received" && (
            <>
              <Button
                text={"Approve"}
                onClick={() => {}}
                size={"xs"}
                Icon={MdCheckCircleOutline}
              />
              <Button
                text={"Reject"}
                onClick={() => {}}
                type={"danger"}
                size={"xs"}
                Icon={MdOutlineCancel}
              />
            </>
          )}
          {status === "received" && (
            <p className={styles["approved"]}>Approved</p>
          )}
        </div>
      </div>

      <details className={styles["med-details"]}>
        <summary>See Medicine Info and Prescription</summary>
        <div className={styles["med-info"]}>
          <div className={styles["about-med"]}>
            <div className={styles["med-img"]}>
              <img src={medInfo.img} alt="Medicine" />
            </div>
            <div className={styles["med-info-info"]}>
              <p className={styles["name"]}>{medInfo.name}</p>
              <p className={styles["ndc"]}>NDC: {medInfo.ndc}</p>
              <p className={styles["desc"]}>{medInfo.desc}</p>
              <p className={styles["quantity"]}>
                Quantity : {medInfo.quantity}
              </p>
              <p className={styles["quantity"]}>
                Date of Expriy: {medInfo.doe}
              </p>
            </div>
          </div>
          <div className={styles["prescription"]}>
            <div className={styles["prescription-img"]}>
              <img src={receivedBy.prescription} alt="Prescription" />
            </div>
            <p>
              Right-click on the prescription image, go to "Open Image in a new
              Tab" to view it in full-screen
            </p>
          </div>
        </div>
      </details>
    </div>
  );
});

function AdminReceive() {
  return (
    <div className={styles["admin-receive-div"]}>
      <h2>Track information about received medications</h2>

      <div className={styles["receive-main"]}>
        {/* search box ??  */}
        <div className={styles["table"]}>
          <div className={styles["table-header"]}>
            <h3>Donated By</h3>
            <h3 className={styles["status-header"]}>Status</h3>
            <h3 className={styles["received-header"]}>Received By</h3>
            <h3 className={styles["action-header"]}>Action?</h3>
          </div>

          <div className={styles["table-main"]}>{dataFromDb}</div>
        </div>
      </div>
    </div>
  );
}

export default Section(AdminReceive, "admin-receive", "secondary");
