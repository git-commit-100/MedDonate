import Navbar from "./components/navbar/navbar";
import Section from "./components/layout/Section";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <body>
        <Section bg="primary" full={"yes"}>React Application</Section>
      </body>
    </div>
  );
}

export default App;
