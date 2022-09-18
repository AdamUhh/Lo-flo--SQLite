import FlashCards from "./components/FlashCards/FlashCards";
import NavBar from "./components/Navbar";
import SubjectBar from "./components/SubjectBar";
import "./index.css";

function App() {
  return (
    <div className="main__container">
      <NavBar />
      <div className="main__wrapper">
        <SubjectBar />
        <FlashCards />
      </div>
    </div>
  );
}

export default App;
