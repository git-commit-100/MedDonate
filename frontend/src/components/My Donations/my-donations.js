import { useEffect, useState } from "react";
import styles from "./my-donations.module.scss";
import { images } from "../../assets/images";
import { BiBlock } from "react-icons/bi";
import Button from "../layout/UI/Button";

// query from db by email -> only visible with transactions from user email

// query from db
const DATABASE_RECORD_FOR_DONATION = [
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
    approved: true,
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
    approved: true,
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

const DATABASE_RECORD_FOR_RECEIVE = [
  {
    id: 1,
    userInfo: {
      donatedBy: {
        name: "Jimit Joshi",
        phone: "+91 8554609445",
        email: "jimit08joshi@gmail.com",
        city: "Dahisar",
      },
      receivedBy: {
        name: "Bhargav Kashiya",
        phone: "+91 9175899936",
        email: "bhargavkashiya@gmail.com",
        city: "Vasai",
        prescription:
          "https://runningadik.files.wordpress.com/2016/06/rx1stsourceblogspotcom.jpg?w=300&h=300",
      },
    },
    approved: true,
    status: "received",
    orderStateFromDonation: "No",
    orderStateFromReceiver: "Yes",
    medInfo: {
      medName: "Abhumka’s StonOff",
      doe: "22/05/2023",
      quantity: 1,
      desc: "Abhumka's StonOff capsules manage Kidney, Urinary Bladder & Urinary Tract stones StonOff capsule is long researched secret formula based on Indian tribal’s traditional herbal knowledge which is tried, tested and trusted for thousands of years. It contains purified extracts of 5 beneficial herbs and the synergistic effect of all these herbs promote better health of kidney, urinary tract and urinary bladder and also helps in flushing of salt deposition through urine from these regions.",
      img: "https://4.imimg.com/data4/LS/IR/MY-1363963/herbal-treatment-for-kidney-stone.jpg",
      ndc: "945-5643-8463",
    },
  },
  {
    id: 2,
    userInfo: {
      donatedBy: {
        name: null,
        phone: null,
        email: null,
        city: null,
      },
      receivedBy: {
        name: "Bhargav Kashiya",
        phone: "+91 9175899936",
        email: "bhargavkashiya@gmail.com",
        city: "Vasai",
        prescription:
          "https://runningadik.files.wordpress.com/2016/06/rx1stsourceblogspotcom.jpg?w=300&h=300",
      },
    },
    approved: false,
    status: "pending",
    orderStateFromDonation: "No",
    orderStateFromReceiver: "No",
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

function getData(pageState, data) {
  // some query to fetch data
  // after getting data, mapping to UI
  return data.map((record) => {
    const {
      id,
      medInfo,
      status,
      userInfo: { donatedBy, receivedBy },
      orderStateFromDonation,
      orderStateFromReceiver,
      approved,
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
            {approved ? (
              <>
                <p className={styles["name"]}>{donatedBy.name}</p>
                <p className={styles["phone"]}>{donatedBy.phone}</p>
                <p className={styles["email"]}>{donatedBy.email}</p>
              </>
            ) : (
              <h4 className={styles["not-approved"]}>
                Admin has not approved the donation yet !
              </h4>
            )}
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
            {/* {approved ? ( */}
            {/* <> */}
            <p className={styles["name"]}>{receivedBy.name}</p>
            <p className={styles["phone"]}>{receivedBy.phone}</p>
            <p className={styles["email"]}>{receivedBy.email}</p>
            {/* </> */}
            {/* ) : ( */}
            {/* <h4 className={styles["not-approved"]}> */}
            {/* Admin has not approved the donation yet ! */}
            {/* </h4> */}
            {/* )} */}
          </div>
          <div className={styles["order-state"]}>
            {pageState === "donate" && (
              <>
                <p
                  className={
                    orderStateFromDonation === "No"
                      ? styles["no"]
                      : styles["yes"]
                  }
                >
                  {orderStateFromDonation}
                </p>
                {orderStateFromDonation === "No" && (
                  <Button
                    text={"Change state ?"}
                    size={"xs"}
                    type={"secondary"}
                    // initiate a update db query
                    onClick={() => {}}
                  ></Button>
                )}
              </>
            )}
            {pageState === "receive" && (
              <>
                <p
                  className={
                    orderStateFromReceiver === "No"
                      ? styles["no"]
                      : styles["yes"]
                  }
                >
                  {orderStateFromReceiver}
                </p>
                {orderStateFromReceiver === "No" && (
                  <Button
                    text={"Change state ?"}
                    size={"xs"}
                    type={"secondary"}
                    disabled={approved ? false : true}
                    // initiate a update db query
                    onClick={() => {}}
                  ></Button>
                )}
              </>
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
                Right-click on the prescription image, go to "Open Image in a
                new Tab" to view it in full-screen
              </p>
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
    if (pageState === "donate") {
      let queryData = getData(pageState, DATABASE_RECORD_FOR_DONATION);
      setQueryRes(queryData);
    } else {
      let queryData = getData(pageState, DATABASE_RECORD_FOR_RECEIVE);
      setQueryRes(queryData);
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
                <h3 className={styles["status-header"]}>Medicine Status</h3>
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
