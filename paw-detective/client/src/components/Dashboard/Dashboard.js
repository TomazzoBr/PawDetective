import "./../../styles/Dashboard.css";

// import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import { useContext } from "react";

import globalContext from "../../services/globalContext";

import Header from "./Header/Header";
import Map from "../Map/Map";
import PawsList from "./PawsList/PawList";

const Dashboard = () => {
  const customProps = useContext(globalContext);
  const { filterPaws } = customProps;

  const navigate = useNavigate();
  // const { user } = useAuth0();

  return (
    <div className="dashboard">
      <Header />

      <button
        className="upload-pet-button"
        onClick={() => navigate("/form", { replace: true })} // replace is an option. let's check what it does,
        // if nothing special changes, we should use Link
      >
        Upload Pet
      </button>

      <div className="list-wrap">
        <div className="dashboard-list-container">
          <div>
            <h4 style={{ color: "blue" }}>Find your pet</h4>
          </div>

          <Map />

          <label>Lost or Found?</label>
          <div className="lost-found-bar">
            <select
              className="lost-found-scroll"
              onChange={(e) => filterPaws(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          <PawsList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
