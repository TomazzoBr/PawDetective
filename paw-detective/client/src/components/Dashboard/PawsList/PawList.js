import "./../../../styles/PawsList.css";

import PawsItem from "./PawsItem/PawsItem";
import { useContext } from "react";

import globalContext from "../../../services/globalContext"

const PawsList = () => {

  const {customProps} = useContext(globalContext);
  const {paws, filterBtn} = customProps

  const renderPaws = (paws) => {
        if (paws.length < 1) {
          return <p>there no pets in this list😉</p>
        }
        else {
          return paws.filter(paw => {
            if (filterBtn === "Lost") {
              return paw.lostOrFound === true;
            } else if (filterBtn === "Found") {
              return paw.lostOrFound === false;
            }
            return paws
          })
          .map((paw) => (<PawsItem paw={paw} key={paw.id}/>));
        }
  }

  return (
    <ul className="list-container">
      <h4 className="click-add-h4">Click a pet to see more details</h4>
      {renderPaws(paws)}
      {/* {pawsList.length ? pawsList : <p>there no pets in this list😉</p>} */}
    </ul>
  );
};

export default PawsList;
