import Section1 from "../Homepage/section1/section1";
import Section2 from "../Homepage/section2/section2";
import Section3 from "../Homepage/section3/section3";
import Section4 from "../Homepage/section4/section4";
import Section5 from "../Homepage/section5/section5";
import "./pages.module.scss";

function Homepage() {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </>
  );
}

export default Homepage;
