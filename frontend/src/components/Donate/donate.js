import React, { useContext, useState } from "react";
import styles from "./donate.module.scss";
import Input from "../layout/UI/Input";
import useInput from "../../utils/hooks/useInput";
import Button from "../layout/UI/Button";
import { images } from "../../assets/images";
import axios from "axios";
import Modal from "../layout/UI/Modal";
import { AppContext } from "../../utils/store/appContext";

function Donate() {
  const [showModal, setShowModal] = useState(false);
  const {
    value: NDCInput,
    handleInputChange: NDCInputChange,
    handleInputBlur: NDCInputBlur,
    hasError: hasNDCError,
    resetInput: NDCReset,
  } = useInput((ndc) => ndc.trim() !== "" && ndc.length > 9);

  const {
    value: medNameInput,
    handleInputChange: medNameInputChange,
    handleInputBlur: medNameInputBlur,
    hasError: hasMedNameError,
    resetInput: medNameReset,
  } = useInput((med) => med.trim() !== "" && med.length > 2);

  const {
    value: medDescInput,
    handleInputChange: medDescInputChange,
    handleInputBlur: medDescInputBlur,
    hasError: hasMedDescError,
    resetInput: medDescReset,
  } = useInput((desc) => desc.trim() !== "");

  const [image, setImage] = useState("");
  const ctx = useContext(AppContext);

  //DOM helpers
  const doeInput = document.getElementById("doe-input");
  const medType = document.getElementById("medType");
  const fileInput = document.getElementById("file-input");

  let formValid =
    !hasNDCError && !hasMedNameError && !!medType && !!doeInput.value;

  function clearForm() {
    NDCReset();
    medNameReset();
    medDescReset();
    doeInput.value = "";
    medType.value = "";
    fileInput.value = "";
  }

  function handleDonateMedicineForm(e) {
    e.preventDefault();

    if (formValid) {
      let donationFormObj = new FormData();
      donationFormObj.append("userId", ctx.token);
      donationFormObj.append("ndc", NDCInput);
      donationFormObj.append("medName", medNameInput);
      donationFormObj.append("doe", doeInput.value);
      donationFormObj.append("medType", medType.value);
      donationFormObj.append("medImg", image);
      donationFormObj.append("medDesc", medDescInput);

      // db request
      axios
        .post("http://localhost:8080/user/donate", donationFormObj)
        .then((res) => {
          clearForm();
          setShowModal(true);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className={styles["donate-div"]}>
      <Modal
        show={showModal}
        hideModal={() => setShowModal(false)}
        closingButtonText={"Okay, got it"}
        className={styles["modal"]}
      >
        <div className={styles["img-div"]}>
          <img src={images.check} alt="check" className={styles["modal-img"]} />
        </div>
        <h2>Thank you for donating :)</h2>

        <div className={styles["info"]}>
          <h3>You can see latest status about your medicine in :</h3>
          <h3 className={styles["cmd"]}>
            Dashboard &gt; My Donations &gt; Donated by me
          </h3>
        </div>
      </Modal>
      <div className={styles["donate-info"]}>
        <div className={styles["donate-info-info"]}>
          <h1>Donate your unused medications</h1>
          <h4>
            Help patients in need.Extend the benefit of the prescriptions you
            can no longer use and contribute to your community and beyond.
          </h4>
        </div>
        <div className={styles["img-div"]}>
          <img src={images.doctorMedicine} alt="Doctor medicine" />
        </div>
      </div>

      <form
        action="POST"
        onSubmit={handleDonateMedicineForm}
        encType="multipart/form-data"
      >
        <h1>Ready to Donate ?</h1>
        <h3>Medicines up for donation must meet ALL of these criteria</h3>
        <div className={styles["input-div"]}>
          <input type={"checkbox"} required id="cond1" name="cond1" />
          <label htmlFor="cond1">
            Is not a controlled substance (no narcotics or opioids)
          </label>
        </div>

        <div className={styles["input-div"]}>
          <input type={"checkbox"} required id="cond2" name="cond2" />
          <label htmlFor="cond2">Will not expire for at least 5 months</label>
        </div>

        <div className={styles["input-div"]}>
          <input type={"checkbox"} required id="cond3" name="cond3" />
          <label htmlFor="cond3">
            Is in sealed packaging (standard amber vials not eligible)
          </label>
        </div>

        <div className={styles["input-div"]}>
          <input type={"checkbox"} required id="cond4" name="cond4" />
          <label htmlFor="cond4">Does not require refrigeration</label>
        </div>

        <h3>Medication Details</h3>
        <div className={styles["medicine-form"]}>
          <Input
            label={"National Drug Code(NDC)"}
            inputConfig={{ type: "number", autoComplete: "none", step: "none" }}
            required={true}
            errorText={
              "NDC is a 10 or 11 digit number. It usually has 2 dashes and often the same as number underneath the barcode"
            }
            useInputHook={{
              value: NDCInput,
              handleInputChange: NDCInputChange,
              handleInputBlur: NDCInputBlur,
              hasError: hasNDCError,
            }}
          />

          <Input
            label={"Medication name"}
            inputConfig={{ type: "text", autoComplete: "none" }}
            required={true}
            errorText={"Drug name must be of 2 characters or long"}
            useInputHook={{
              value: medNameInput,
              handleInputChange: medNameInputChange,
              handleInputBlur: medNameInputBlur,
              hasError: hasMedNameError,
            }}
          />

          <div className={styles["input-div"]}>
            <label htmlFor="file-input">Upload your Medicine Image here</label>
            <input
              id="file-input"
              type="file"
              name="medImg"
              required
              autoComplete="none"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <Input
            label={"Medication description"}
            inputConfig={{ type: "text", autoComplete: "none" }}
            required={true}
            errorText={"Drug prescription cannot be empty"}
            textarea={true}
            useInputHook={{
              value: medDescInput,
              handleInputChange: medDescInputChange,
              handleInputBlur: medDescInputBlur,
              hasError: hasMedDescError,
            }}
          />

          <div className={styles["input-div"]}>
            <label id="date-input">
              Date of Expiration(Expiration date must be 5 months out from
              current date.)
            </label>
            <input
              id="doe-input"
              type={"date"}
              autoComplete="none"
              required
              min={"2023-04-30"}
              max={"2030-12-31"}
              htmlFor="date-input"
            />
          </div>

          <div className={styles["input-div"]}>
            <label>Medication Type</label>
            <select name="medType" id="medType">
              <option>Pills (Tablets, Capsules, etc)</option>
              <option>Liquid (Solutions, Drops, etc)</option>
              <option>Inhalers</option>
              <option>Injection</option>
              <option>Patches</option>
              <option>Cream (Ointment, Lotion, etc)</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <Button
          type="primary"
          text={"Donate"}
          className={styles["form-btn"]}
          size="lg"
          disabled={!formValid}
          btnConfig={{ type: "submit" }}
        />
      </form>
    </div>
  );
}

export default Donate;
