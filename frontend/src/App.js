import Input from "./components/layout/Input";

function App() {
  return (
    <div className="App">
      <h1>React</h1>
      <Input
        inputConfig={{
          type: "email",
          autoComplete: "none",
          placeholder: "yourEmail@email.com",
        }}
        label={"Enter your email"}
        type="required"
        callback={(name) => name !== ""}
      />
    </div>
  );
}

export default App;
