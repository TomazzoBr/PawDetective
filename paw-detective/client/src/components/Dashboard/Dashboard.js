// import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { changeDashboardFilter } from '../../actions/index';

import globalContext from "../../services/globalContext";

import Header from "./Header/Header";
import Map from "../Map/Map";
import PawsList from "./PawsList/PawList";
import PawsProfile from "../PawsProfile/PawsProfile";

const Dashboard = () => {
  const { customProps } = useContext(globalContext);
  const { selectedAnimal } = customProps;

  const dispatch = useDispatch()

  useEffect(() => {},[selectedAnimal])

  const navigate = useNavigate();
  // const { user } = useAuth0();
  const modalValue = useSelector(state => state.modalSelection)
  const modalAnimal = modalValue === "0"
    ? null
    : <PawsProfile/>

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
                onChange={(e) => {dispatch(changeDashboardFilter(e.target.value))}}
              >
                <option value="All">All</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>

          <PawsList />
        </div>
      </div>

      {modalAnimal}
      {/* Here goes the modal of animal when click */}
    </div>
  );
};

export default Dashboard;
