import React, { useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import Button from "../layout/UI/Button";
import { FaHandHoldingMedical } from "react-icons/fa";

// db object
const DATA = [
  {
    id: 1,
    user: {
      name: "Bhargav Kashiya",
      phone: 9175899936,
      email: "bhargavkashiya@gmail.com",
      address: "D-01, Abhilasha, Sai Nagar, Vasai (west)",
      city: "Vasai",
    },
    med: {
      medName: "Crocin 650",
      doe: "22/05/2023",
      quantity: 2,
      desc: "Crocin Cold & Flu Max Tablet 15's is ac combination medication used to treat common cold symptoms and allergies like sneezing, runny/stuffy nose, fever, headache, body pains, congestion, or watery eyes.",
      img: "https://newassets.apollo247.com/pub/media/catalog/product/c/r/cro0023.jpg",
      ndc: "456-6785-4543",
    },
  },
  {
    id: 2,
    user: {
      name: "Jimit Joshi",
      phone: 8329021699,
      email: "jimitjoshi@gmail.com",
      address: "A-301, Shanti Jain Tower, Dahisar (east)",
      city: "Dahisar",
    },
    med: {
      medName: "Zandu Sudarshan Tablet",
      doe: "22/05/2023",
      quantity: 3,
      desc: "Zandu Sudarshan Ghanvati contains the goodness of Triphala, Haridra, Daruharidra, Kantakari, Karcura, Pippalimool, and more. Triphala protects the body from the threat of allergens and infections. This Ayurvedic formula restores the balance of the three prominent doshas and improves the body’s overall immunity response. It is formulated to encourage the production of healthy immune system cells.",
      img: "https://th.bing.com/th/id/OIP.bxH8G_9chHbPi9ibJ-z7wQHaHa?pid=ImgDet&rs=1",
      ndc: "888-3343-7845"
    },
  },
  {
    id: 3,
    user: {
      name: "Yash Ramteke",
      phone: 9503096851,
      email: "yashramteke@gmail.com",
      address: "C-405, Rajhans Seasons, Andheri (east)",
      city: "Andheri",
    },
    med: {
      medName: "Abhumka’s StonOff",
      doe: "22/05/2023",
      quantity: 1,
      desc: "Abhumka's StonOff capsules manage Kidney, Urinary Bladder & Urinary Tract stones StonOff capsule is long researched secret formula based on Indian tribal’s traditional herbal knowledge which is tried, tested and trusted for thousands of years. It contains purified extracts of 5 beneficial herbs and the synergistic effect of all these herbs promote better health of kidney, urinary tract and urinary bladder and also helps in flushing of salt deposition through urine from these regions.",
      img: "https://4.imimg.com/data4/LS/IR/MY-1363963/herbal-treatment-for-kidney-stone.jpg",
      ndc: "945-5643-8463"
    },
  },
];

function Checkout() {
  const { id } = useParams();
  const naivgate = useNavigate();
  const [dataObj, setDataObj] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // initiate db query
    const medObj = DATA.find((med) => med.id === +id);

    if (medObj === undefined) {
      naivgate("/receive");
    } else {
      setDataObj({ ...medObj });
    }
  }, [id, naivgate]);

  return (
    <>
      {dataObj && (
        <div className={styles["checkout-div"]}>
          <h2>Checkout Page</h2>
          <h3>Medcine Information</h3>
          <div className={styles["med-info-div"]}>
            <div className={styles["img-div"]}>
              <img src={dataObj.med.img} alt="medicine" />
            </div>
            <div className={styles["medicine-info"]}>
              <h4>{dataObj.med.medName}</h4>
              <p>{dataObj.med.desc}</p>
              <h4>
                <span>National Drug Code(NDC) :&nbsp;</span>
                {dataObj.med.ndc}
              </h4>
              <h4>
                <span>Quantity :&nbsp;</span>
                {dataObj.med.quantity}
              </h4>
              <h4>
                <span>Date of expiry:&nbsp;</span>
                {dataObj.med.doe}
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
                  {dataObj.user.name}
                </h4>
                <h4>
                  <span>Ciry :&nbsp;</span>
                  {dataObj.user.city}
                </h4>
                <h4>
                  <span>Email :&nbsp;</span>
                  <a
                    href={!isHidden && `mailto:${dataObj.user.email}`}
                    className={isHidden ? styles["hidden"] : ""}
                  >
                    {isHidden ? "Content is hidden" : dataObj.user.email}
                  </a>
                </h4>
                <h4>
                  <span>Phone :&nbsp;</span>
                  <a
                    href={!isHidden && `tel:${dataObj.user.phone}`}
                    className={isHidden ? styles["hidden"] : ""}
                  >
                    {isHidden
                      ? "Content is hidden"
                      : `+91 ${dataObj.user.phone}`}
                  </a>
                </h4>
                <h4>
                  <span>Address :&nbsp;</span>
                  <p className={isHidden ? styles["hidden"] : ""}>
                    {isHidden ? "Content is hidden" : dataObj.user.address}
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
