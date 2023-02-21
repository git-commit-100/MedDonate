import React from "react";
import styles from "./donate.module.scss";
import Input from "../layout/UI/Input";
import useInput from "../../utils/hooks/useInput";
import Button from "../layout/UI/Button";
import { images } from "../../assets/images";

// https://moef.gov.in/en/service/environment/waste-management/

const nowDate = new Date();
const dateFrom6Months = nowDate.setMonth(nowDate.getMonth() + 6).toString();

function Donate() {
  const {
    value: nameInput,
    handleInputChange: nameInputChange,
    handleInputBlur: nameInputBlur,
    hasError: hasNameError,
  } = useInput((name) => name.trim() !== "" && name.length > 2);

  const {
    value: emailInput,
    handleInputChange: emailInputChange,
    handleInputBlur: emailInputBlur,
    hasError: hasEmailError,
  } = useInput(
    (email) => email.trim() !== "" && email.includes("@") && email.includes(".")
  );

  const {
    value: addressInput,
    handleInputChange: addressInputChange,
    handleInputBlur: addressInputBlur,
    hasError: hasAddressError,
  } = useInput((address) => address.trim() !== "");

  const {
    value: cityInput,
    handleInputChange: cityInputChange,
    handleInputBlur: cityInputBlur,
    hasError: hasCityError,
  } = useInput((city) => city.trim() !== "");

  const {
    value: NDCInput,
    handleInputChange: NDCInputChange,
    handleInputBlur: NDCInputBlur,
    hasError: hasNDCError,
  } = useInput((ndc) => ndc.trim() !== "" && ndc.length > 9);

  const {
    value: medNameInput,
    handleInputChange: medNameInputChange,
    handleInputBlur: medNameInputBlur,
    hasError: hasMedNameError,
  } = useInput((med) => med.trim() !== "" && med.length > 2);

  const {
    value: numberInput,
    handleInputChange: numberInputChange,
    handleInputBlur: numberInputBlur,
    hasError: hasNumberError,
  } = useInput((number) => number.trim() !== "" && number.length > 9);

  //DOM helpers
  const doeInput = document.getElementById("doe-input");
  const medType = document.getElementById("medType");

  let formValid =
    !hasNameError &&
    !hasNDCError &&
    !hasMedNameError &&
    !hasEmailError &&
    !hasAddressError &&
    !hasNumberError &&
    !hasCityError &&
    !!medType &&
    !!doeInput.value;

  function handleDonateMedicineForm(e) {
    e.preventDefault();

    if (formValid) {
      let donationFormObj = {
        user: {
          name: nameInput,
          address: addressInput,
          email: emailInput,
          city: cityInput,
          phone: numberInput,
        },
        med: {
          ndc: NDCInput,
          medName: medNameInput,
          doe: doeInput.value,
          medType: medType.value,
        },
      };

      console.log(donationFormObj);
    }
  }

  return (
    <div className={styles["donate-div"]}>
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

      <form action="POST" onSubmit={handleDonateMedicineForm}>
        <h1>Ready to Donate ?</h1>
        <h3>Medicines up for donation must meet ALL of these criteria</h3>
        <div className={styles["input-div"]}>
          <input type={"checkbox"} required id="cond1" />
          <label htmlFor="cond1">
            Is not a controlled substance (no narcotics or opioids)
          </label>
        </div>

        <div className={styles["input-div"]}>
          <input type={"checkbox"} required id="cond2" />
          <label htmlFor="cond2">Will not expire for at least 5 months</label>
        </div>

        <div className={styles["input-div"]}>
          <input type={"checkbox"} required id="cond3" />
          <label htmlFor="cond3">
            Is in sealed packaging (standard amber vials not eligible)
          </label>
        </div>

        <div className={styles["input-div"]}>
          <input type={"checkbox"} required id="cond4" />
          <label htmlFor="cond4">Does not require refrigeration</label>
        </div>

        <Input
          label={"Your name here"}
          inputConfig={{ type: "text", autoComplete: "none" }}
          required={true}
          errorText={"Name should be of 2 or more characters"}
          useInputHook={{
            value: nameInput,
            handleInputChange: nameInputChange,
            handleInputBlur: nameInputBlur,
            hasError: hasNameError,
          }}
        />

        <Input
          label={"Your email here"}
          inputConfig={{ type: "email", autoComplete: "none" }}
          required={true}
          errorText={"Please enter a valid email"}
          useInputHook={{
            value: emailInput,
            handleInputChange: emailInputChange,
            handleInputBlur: emailInputBlur,
            hasError: hasEmailError,
          }}
        />

        <Input
          label={"Your phone number here"}
          inputConfig={{ type: "number", autoComplete: "none" }}
          required={true}
          errorText={"Please enter a valid phone number"}
          useInputHook={{
            value: numberInput,
            handleInputChange: numberInputChange,
            handleInputBlur: numberInputBlur,
            hasError: hasNumberError,
          }}
        />

        <Input
          label={"Your City Here"}
          inputConfig={{ type: "text", autoComplete: "none" }}
          required={true}
          errorText={"City name cannot be empty"}
          useInputHook={{
            value: cityInput,
            handleInputChange: cityInputChange,
            handleInputBlur: cityInputBlur,
            hasError: hasCityError,
          }}
        />

        <Input
          label={"Your address here"}
          inputConfig={{ type: "text", autoComplete: "none" }}
          textarea={true}
          required={true}
          errorText={"Name should be of 2 or more characters"}
          useInputHook={{
            value: addressInput,
            handleInputChange: addressInputChange,
            handleInputBlur: addressInputBlur,
            hasError: hasAddressError,
          }}
        />

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
            <label id="date-input">
              Date of Expiration(Expiration date must be 5 months out from
              current date.)
            </label>
            <input
              id="doe-input"
              type={"date"}
              autoComplete="none"
              required
              min={dateFrom6Months}
              max={"2040-12-31"}
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
