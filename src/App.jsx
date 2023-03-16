import "./styles/main.css";
import Header from "./components/header/Header";
import Form from "./components/form/Form";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app__container">
        <About />
        <Form />
        <Footer />
      </div>
    </div>
  );
}

export default App;
