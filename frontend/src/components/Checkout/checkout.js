import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./checkout.module.scss";
import { images } from "../../assets/images";
import Button from "../layout/UI/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";

const DATA_OBJ = [
  {
    id: 1,
    med: {
      medName: "Crocin 650",
      doe: "22/05/2023",
      quantity: 2,
      desc: "Crocin Cold & Flu Max Tablet 15's is ac combination medication used to treat common cold symptoms and allergies like sneezing, runny/stuffy nose, fever, headache, body pains, congestion, or watery eyes.",
      img: "https://newassets.apollo247.com/pub/media/catalog/product/c/r/cro0023.jpg",
      ndc: "94763-4434-9075",
      medType: "Pills (Tablets, Capsules, etc.)",
    },
    user: {
      address: "D-01, Abhilasha, Sai Nagar, Vasai (West), Palghar",
      city: "Vasai",
      email: "bhargavkashiya@gmail.com",
      name: "Bhargav Kashiya",
      phone: 9175899936,
      profile: images.maleProfile,
    },
  },
  {
    id: 2,
    med: {
      medName: "Zandu Sudarshan Tablet",
      doe: "22/05/2023",
      quantity: 2,
      desc: "Zandu Sudarshan Ghanvati contains the goodness of Triphala, Haridra, Daruharidra, Kantakari, Karcura, Pippalimool, and more. Triphala protects the body from the threat of allergens and infections. This Ayurvedic formula restores the balance of the three prominent doshas and improves the body’s overall immunity response. It is formulated to encourage the production of healthy immune system cells.",
      ndc: "84063-4534-5075",
      img: "https://th.bing.com/th/id/OIP.bxH8G_9chHbPi9ibJ-z7wQHaHa?pid=ImgDet&rs=1",
      medType: "Pills (Tablets, Capsules, etc.)",
    },
    user: {
      address: "A-303, Shanti Jain Tower, Dahisar (East)",
      city: "Dahisar",
      email: "jimitjoshi@gmail.com",
      name: "Jimit Joshi",
      phone: 8394574534,
      profile: images.maleProfile,
    },
  },
  {
    id: 3,
    med: {
      medName: "Abhumka’s StonOff",
      doe: "22/05/2023",
      quantity: 2,
      desc: "Abhumka's StonOff capsules manage Kidney, Urinary Bladder & Urinary Tract stones StonOff capsule is long researched secret formula based on Indian tribal’s traditional herbal knowledge which is tried, tested and trusted for thousands of years. It contains purified extracts of 5 beneficial herbs and the synergistic effect of all these herbs promote better health of kidney, urinary tract and urinary bladder and also helps in flushing of salt deposition through urine from these regions.",
      img: "https://4.imimg.com/data4/LS/IR/MY-1363963/herbal-treatment-for-kidney-stone.jpg",
      ndc: "94763-4434-9075",
      medType: "Pills (Tablets, Capsules, etc.)",
    },
    user: {
      address: "B-402, Anant Vihar Society, Andheri (West)",
      city: "Andheri",
      email: "yashRamteke@gmail.com",
      name: "Yash Ramteke",
      phone: 8475930843,
      profile: images.maleProfile,
    },
  },
];

function Checkout() {
  const [showInfo, setShsowInfo] = useState({
    email: null,
    phone: null,
    address: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  // fetch meds from db, if id matches then only retun page otherwise redirect /dashboard
  let dataObj = DATA_OBJ.find((med) => med.id === +id);

  useEffect(() => {
    if (!dataObj) {
      navigate("/receive");
    }
  }, [dataObj, navigate]);

  return (
    <>
      {dataObj && (
        <div className={styles["checkout-div"]}>
          <h2>Checkout Page</h2>
          <h3>Medicine Information</h3>
          <div className={styles["medicine-div"]}>
            <div className={styles["img-div"]}>
              <img src={dataObj.med.img} alt="medicine" />
            </div>
            <div className={styles["medicine-info"]}>
              <h4>{dataObj.med.medName}</h4>
              <p>{dataObj.med.desc}</p>
              <h4>
                <span>Medicine Type :&nbsp;</span>
                {dataObj.med.medType}
              </h4>
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
          <h3>User Information : </h3>
          <div className={styles["user-div"]}>
            <div className={styles["user-img-div"]}>
              <img src={dataObj.user.profile} alt="profile" />
            </div>
            <div className={styles["user-info"]}>
              <h4>
                <span>Name :&nbsp;</span>
                {dataObj.user.name}
              </h4>
              <h4>
                <span>Email :&nbsp;</span>
                <a
                  href={`mailto:${dataObj.user.email}`}
                  className={
                    showInfo.email ? styles["reveal"] : styles["hidden"]
                  }
                >
                  {dataObj.user.email}
                </a>
              </h4>
              <h4>
                <span>Phone Number :&nbsp;</span>
                <a
                  href={`tel:${dataObj.user.phone}`}
                  className={
                    showInfo.phone ? styles["reveal"] : styles["hidden"]
                  }
                >
                  +91&nbsp;{dataObj.user.phone}
                </a>
              </h4>
              <h4>
                <span>City :&nbsp;</span>
                {dataObj.user.city}
              </h4>
              <h4>
                <span>Address :&nbsp;</span>
                <p
                  className={
                    showInfo.address ? styles["reveal"] : styles["hidden"]
                  }
                >
                  {dataObj.user.address}
                </p>
              </h4>
            </div>

            <div className={styles["msg-div"]}>
              
            </div>

            <div className={styles["actions-div"]}>
              <Button
                type="primary"
                text={"I will take it "}
                Icon={BsFillCheckCircleFill}
                onClick={() =>
                  setShsowInfo({
                    email: dataObj.user.email,
                    phone: dataObj.user.phone,
                    address: dataObj.user.address,
                  })
                }
              />
              <Button
                type="secondary"
                text={"Take me back"}
                onClick={() => navigate("/receive")}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
