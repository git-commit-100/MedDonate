import styles from "./receive.module.scss";
import { images } from "../../assets/images";
import Input from "../../components/layout/UI/Input";
import useInput from "../../utils/hooks/useInput";
import Card from "../layout/UI/Card";
import { BiBlock } from "react-icons/bi";
import Button from "../layout/UI/Button";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const MEDICINES_OBJ = [
  {
    id: 1,
    medName: "Crocin 650",
    doe: "22/05/2023",
    quantity: 2,
    desc: "Crocin Cold & Flu Max Tablet 15's is ac combination medication used to treat common cold symptoms and allergies like sneezing, runny/stuffy nose, fever, headache, body pains, congestion, or watery eyes.",
    city: "Vasai",
    img: "https://newassets.apollo247.com/pub/media/catalog/product/c/r/cro0023.jpg",
  },
  {
    id: 2,
    medName: "Zandu Sudarshan Tablet",
    doe: "22/05/2023",
    quantity: 3,
    desc: "Zandu Sudarshan Ghanvati contains the goodness of Triphala, Haridra, Daruharidra, Kantakari, Karcura, Pippalimool, and more. Triphala protects the body from the threat of allergens and infections. This Ayurvedic formula restores the balance of the three prominent doshas and improves the body’s overall immunity response. It is formulated to encourage the production of healthy immune system cells.",
    city: "Andheri",
    img: "https://th.bing.com/th/id/OIP.bxH8G_9chHbPi9ibJ-z7wQHaHa?pid=ImgDet&rs=1",
  },
  {
    id: 3,
    medName: "Abhumka’s StonOff",
    doe: "22/05/2023",
    quantity: 1,
    desc: "Abhumka's StonOff capsules manage Kidney, Urinary Bladder & Urinary Tract stones StonOff capsule is long researched secret formula based on Indian tribal’s traditional herbal knowledge which is tried, tested and trusted for thousands of years. It contains purified extracts of 5 beneficial herbs and the synergistic effect of all these herbs promote better health of kidney, urinary tract and urinary bladder and also helps in flushing of salt deposition through urine from these regions.",
    city: "Borivali",
    img: "https://4.imimg.com/data4/LS/IR/MY-1363963/herbal-treatment-for-kidney-stone.jpg",
  },
];

function Receive() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const {
    value: searchInput,
    handleInputChange: searchInputChange,
    handleInputBlur: searchInputBlur,
    resetInput: resestSearch,
  } = useInput(() => {});

  // get medicines from db
  useEffect(() => {
    axios
      .get("http://localhost:8080/user/donate")
      .then(({ data }) => {
        setMedicines(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function getMedicines(filter) {
    // let medObj = [...MEDICINES_OBJ];
    let medObj = [...medicines];

    if (filter) {
      medObj = medObj.filter((ele) =>
        ele.city.toLocaleLowerCase().includes(filter)
      );
      if (medObj.length === 0) {
        // meaning city is not available for donation
        // return no city found message
        return (
          <Card className={styles["no-med-found"]}>
            <div className={styles["info"]}>
              <BiBlock className={styles["icon"]} />
              <p> No City Found !</p>
            </div>
            <p>
              Currently, there are no medicines up for donation at this city :(
            </p>
            <p>Check your city spelling or try again ?</p>
          </Card>
        );
      }
    }
    return medObj.map((med) => {
      return (
        <li className={styles["medicine-item"]} key={med.id}>
          <Card className={styles["medicine-card"]}>
            <div className={styles["img-div"]}>
              <img src={med.img} alt="medicine" />
            </div>
            <div className={styles["medicine-info"]}>
              <h4>{med.medName}</h4>
              <p>{med.desc}</p>
              <h4>
                <span>Date of expiry:&nbsp;</span>
                {med.doe}
              </h4>
              <h4>
                <span>City:&nbsp;</span>
                {med.UserId.city}
              </h4>
              <div className={styles["actions-div"]}>
                <Button
                  Icon={BsArrowRight}
                  //! btn onClick Function
                  onClick={() => navigate(`/checkout/${med.id}`)}
                  text={"View Details"}
                ></Button>
              </div>
            </div>
          </Card>
        </li>
      );
    });
  }

  return (
    <div className={styles["receive-div"]}>
      <div className={styles["receive-info"]}>
        <div className={styles["receive-info-info"]}>
          <h1>Getting medicines have never been easier</h1>
          <h3>
            Pick your area and see what medicines are bieng donated in your
            vicinity. If required, you can also utlilize them for your needs.
          </h3>
        </div>
        <div className={styles["img-div"]}>
          <img src={images.doctorMan} alt="Doctor man" />
        </div>
      </div>

      <div className={styles["receive-main"]}>
        <div className={styles["receive-search-div"]}>
          <Input
            inputConfig={{ type: "search", autoComplete: "none" }}
            label="Search for your city"
            useInputHook={{
              value: searchInput,
              handleInputChange: searchInputChange,
              handleInputBlur: searchInputBlur,
              resetInput: resestSearch,
            }}
            required={true}
          />
        </div>

        <div className={styles["medicines-div"]}>
          <h3>Medicines up for donation</h3>
          <ul className={styles["medicines-list"]}>
            {searchInput
              ? getMedicines(searchInput.toLocaleLowerCase())
              : getMedicines()}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Receive;
