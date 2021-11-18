import "./../../styles/Dashboard.css";

import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";
import { useState, useEffect, useContext } from "react";

import apiService from "../../services/ApiService";
import globalContext from "../../services/globalContext";

import PawsList from "./PawsList/PawList";
import Header from "./Header/Header";
import Map from "../Map/Map";

const Dashboard = () => {

  const customProps = useContext(globalContext);
  const {paws, filteredPaws, filterPaws} = customProps;

  const history = useHistory();
  const { user } = useAuth0();

  useEffect(() => {
    apiService.getPaws().then((paws) => {
      const sortedPaws = paws.sort((a, b) => {
        const pawA = new Date(a.date).getTime();
        const pawB = new Date(b.date).getTime();
        return pawB - pawA;
      });
      setPaws(sortedPaws);
      setFilteredPaws(sortedPaws);
    });
  }, []);

  return (
    <div className="dashboard">
      <Header />

      <button
        className="upload-pet-button"
        onClick={() => history.push("/form")}
      >
        Upload Pet
      </button>
      <div className="list-wrap">
        <div className="dashboard-list-container">
          <div>
            <h4 style={{ color: "blue" }}>Find your pet</h4>
          </div>
          <Map pawsArray={paws} />
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
          <PawsList
            user={user}
            paws={filteredPaws}
            setPaws={setPaws}
            setFilteredPaws={setFilteredPaws}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
