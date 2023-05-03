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
import localImage from "../../utils/localImage";

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
    let medObj = [...medicines];

    if (filter) {
      medObj = medObj.filter((ele) =>
        ele.donatingUserInfo.city.toLocaleLowerCase().includes(filter)
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

    if (medObj.length === 0) {
      return (
        <Card className={styles["no-med-found"]}>
          <div className={styles["info"]}>
            <BiBlock className={styles["icon"]} />
            <p> No Medicines Found !</p>
          </div>
          <p>Currently, there are no medicines up for donation :(</p>
          <p>Patience is bitter, but its fruit is sweet - Aristotle</p>
        </Card>
      );
    }

    return medObj.map((med) => {
      return (
        <li className={styles["medicine-item"]} key={med.id}>
          <Card className={styles["medicine-card"]}>
            <div className={styles["img-div"]}>
              <img src={localImage(med.medImg)} alt="medicine" />
            </div>
            <div className={styles["medicine-info"]}>
              <h4>{med.medName}</h4>
              <p>{med.medDesc}</p>
              <h4>
                <span>Date of expiry:&nbsp;</span>
                {med.doe}
              </h4>
              <h4>
                <span>City:&nbsp;</span>
                {med.donatingUserInfo.city}
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
