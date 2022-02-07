import "./App.css";
import MainView from "./components/MainView";
import MainViewMobile from "./components/mobile/MainVIewMobile";
import EmailPage from "./components/email/EmailPage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import MediaQuery from "react-responsive";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MediaQuery maxWidth={600}>
                  <MainViewMobile />
                </MediaQuery>
                <MediaQuery minWidth={600}>
                  <MainView />
                </MediaQuery>
              </>
            }
          ></Route>

          <Route path="/email-data" element={<EmailPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
