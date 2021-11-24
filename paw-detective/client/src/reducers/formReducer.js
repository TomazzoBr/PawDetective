const form = (
  state = {
    lostOrFound: false,
    picture: "",
    animal: "Dog",
    description: "",
    location: "",
    lat: 0,
    long: 0,
    email: "",
  },
  action
) => {
  switch (action.type) {
    case "toggleIsLost": {
      const { value } = action.payload;
      return { ...state, lostOrFound: value === "Lost" ? true : false };
    }
    case "savePictureUrl": {
      const { value } = action.payload;
      return { ...state, picture: value };
    }
    case "changeAnimalForm": {
      const { value } = action.payload;
      return { ...state, animal: value };
    }
    case "changeDescriptionForm": {
      const { value } = action.payload;
      return { ...state, description: value };
    }
    case "changeLocationForm": {
      const { value } = action.payload;
      return { ...state, location: value };
    }
    case "mapFormCords": {
      const { event } = action.payload;
      return { ...state, lat: event.latLng.lat(), long: event.latLng.lng() };
    }
    case "changeEmail": {
      const { value } = action.payload;
      return { ...state, email: value };
    }
    case "resetForm": {
      return {
        lostOrFound: false,
        picture: "",
        animal: "Dog",
        description: "",
        location: "",
        lat: 0,
        long: 0,
        email: "",
      };
    }
    default:
      return state;
  }
};

export default form;
