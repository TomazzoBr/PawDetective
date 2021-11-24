import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeDashboardFilter } from "../../actions/index";

import globalContext from "../../services/globalContext";

import Map from "../Map/Map";
import PawsList from "./PawsList/PawList";
import PawsProfile from "../PawsProfile/PawsProfile";

const Dashboard = () => {
  const { customProps } = useContext(globalContext);
  const { selectedAnimal } = customProps;

  const dispatch = useDispatch();

  useEffect(() => {}, [selectedAnimal]);

  const navigate = useNavigate();
  const modalValue = useSelector((state) => state.modalSelection);
  const modalAnimal = modalValue === "0" ? null : <PawsProfile />;

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const showForm = () => {
    isAuthenticated
      ? navigate("/form", { replace: true })
      : loginWithRedirect();
  };

  return (
    <div className="dashboard">
      <div className="dash-child" id="left-dash-child">
        <div>
          <button className="upload-pet-button" onClick={() => showForm()}>
            Upload Pet
          </button>
        </div>
        <Map />
      </div>
      <div className="dash-child" id="right-dash-child">
        <div className="dashboard-list-container">
          <label>Lost or Found?</label>
          <div className="lost-found-bar">
            <select
              className="lost-found-scroll"
              onChange={(e) => {
                dispatch(changeDashboardFilter(e.target.value));
              }}
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
    </div>
  );
};

export default Dashboard;
