import "./../../../styles/PawsList.css";

import PawsItem from "./PawsItem/PawsItem";
import { useContext } from "react";

import globalContext from "../../../services/globalContext"

const PawsList = () => {

  const {customProps} = useContext(globalContext);
  const {paws} = customProps

  const pawsList =
    paws.length &&
    paws.map((paw) => (
      <PawsItem
        paw={paw}
        key={paw.id}
      />
    ));

  return (
    <ul className="list-container">
      <h4 className="click-add-h4">Click a pet to see more details</h4>
      {pawsList.length ? pawsList : <p>there no pets in this list😉</p>}
    </ul>
  );
};

export default PawsList;
