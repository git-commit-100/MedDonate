import { useEffect, useState } from "react";
import styles from "./my-donations.module.scss";
import { images } from "../../assets/images";
import { BiBlock } from "react-icons/bi";

// query from db by email -> only visible with transactions from user email

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
];

function getData() {
  // some query
  // after getting data, mapping to UI
  return DATABASE_RECORD.map((record) => {
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
              <p className={styles["quantity"]}>
                Quantity : {medInfo.quantity}
              </p>
              <p className={styles["quantity"]}>
                Date of Expriy: {medInfo.doe}
              </p>
              <p className={styles["city"]}>City: {medInfo.city}</p>
            </div>
          </div>
        </details>
      </div>
    );
  });
}

function MyDonations() {
  const [pageState, setPageState] = useState("donate");
  const [queryRes, setQueryRes] = useState(null);

  useEffect(() => {
    let queryData = getData();
    if (pageState === "donate") {
      setQueryRes(queryData);
    } else {
      setQueryRes(null);
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
          {!!queryRes && (
            <div className={styles["table"]}>
              <div className={styles["table-header"]}>
                <h3>Donated By</h3>
                <h3>Status</h3>
                <h3>Received By</h3>
              </div>

              <div className={styles["table-main"]}>{queryRes}</div>
            </div>
          )}

          {queryRes === null && (
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
