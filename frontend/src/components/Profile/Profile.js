import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import Card from "../layout/UI/Card";
import { images } from "../../assets/images";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Button from "../layout/UI/Button";
import { FiEdit } from "react-icons/fi";
import Input from "../layout/UI/Input";
import useInput from "../../utils/hooks/useInput";
import axios from "axios";

function generateAsterisk(pass) {
  let string = "";

  for (let i = 0; i < pass.toString().length; i++) {
    string = string.concat(" *");
  }

  return string;
}

function Profile() {
  return <h1>Profile</h1>;
}

export default Profile;
