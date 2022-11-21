import React from "react";
import Section from "../../layout/UI/Section";
import styles from "./AdminReceive.module.scss";
import { images } from "../../../assets/images";

// query from db
const DATABASE_RECORD = [
  {
    id: 1,
    userInfo: {
      donatedBy: {
        name: "Bhargav Kashiya",
        phone: "+91 9175899936",
        email: "bhargavkashiya@gmail.com",
      },
      receivedBy: {
        name: "Jimit Joshi",
        phone: "+91 8554609445",
        email: "jimit08joshi@gmail.com",
      },
    },
    status: "received",
    medInfo: {
      name: "Crocin 650",
      desc: "Crocin Cold & Flu Max Tablet 15's is ac combination medication used to treat common cold symptoms and allergies like sneezing, runny/stuffy nose, fever, headache, body pains, congestion, or watery eyes.",
      doe: "24/08/2030",
      quantity: 4,
      city: "Vasai",
      img: "https://newassets.apollo247.com/pub/media/catalog/product/c/r/cro0023.jpg",
    },
  },
  {
    id: 2,
    userInfo: {
      donatedBy: {
        name: "Yash Ramteke",
        phone: "+91 9443964783",
        email: "yashramteke@gmail.com",
      },
      receivedBy: {
        name: "",
        phone: "",
        email: "",
      },
    },
    status: "available",
    medInfo: {
      name: "Zandu Sudarshan Ghanvati",
      desc: "Zandu Sudarshan Ghanvati contains the goodness of Triphala, Haridra, Daruharidra, Kantakari, Karcura, Pippalimool, and more. Triphala protects the body from the threat of allergens and infections. This Ayurvedic formula restores the balance of the three prominent doshas and improves the body’s overall immunity response. It is formulated to encourage the production of healthy immune system cells.",
      doe: "20/08/2040",
      quantity: 3,
      city: "Amdheri",
      img: "https://th.bing.com/th/id/OIP.bxH8G_9chHbPi9ibJ-z7wQHaHa?pid=ImgDet&rs=1",
    },
  },
  {
    id: 3,
    userInfo: {
      donatedBy: {
        name: "Prem Bhanushali",
        phone: "+91 8898545754",
        email: "prembhanushali@gmail.com",
      },
      receivedBy: {
        name: "",
        phone: "",
        email: "",
      },
    },
    medInfo: {
      name: "Ambhuka's StonOff",
      desc: "Abhumka's StonOff capsules manage Kidney, Urinary Bladder & Urinary Tract stones StonOff capsule is long researched secret formula based on Indian tribal’s traditional herbal knowledge which is tried, tested and trusted for thousands of years. It contains purified extracts of 5 beneficial herbs and the synergistic effect of all these herbs promote better health of kidney, urinary tract and urinary bladder and also helps in flushing of salt deposition through urine from these regions.",
      quantity: 2,
      doe: "30/05/2030",
      city: "Borivali",
      img: "https://4.imimg.com/data4/LS/IR/MY-1363963/herbal-treatment-for-kidney-stone.jpg",
    },
    status: "pending",
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
      </div>

      <details className={styles["med-details"]}>
        <summary>See Medicine Info</summary>
        <div className={styles["med-info"]}>
          <div className={styles["med-img"]}>
            <img src={medInfo.img} alt="Medicine" />
          </div>
          <div className={styles["med-info-info"]}>
            <p className={styles["name"]}>{medInfo.name}</p>
            <p className={styles["desc"]}>{medInfo.desc}</p>
            <p className={styles["quantity"]}>Quantity : {medInfo.quantity}</p>
            <p className={styles["quantity"]}>Date of Expriy: {medInfo.doe}</p>
            <p className={styles["city"]}>City: {medInfo.city}</p>
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
            <h3>Status</h3>
            <h3>Received By</h3>
          </div>

          <div className={styles["table-main"]}>{dataFromDb}</div>
        </div>
      </div>
    </div>
  );
}

export default Section(AdminReceive, "admin-receive", "secondary");
