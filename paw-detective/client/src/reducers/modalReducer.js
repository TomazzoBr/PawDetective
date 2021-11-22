const modalSelection = (state = "0", action) => {
  switch (action.type) {
    case 'openModal': {
      window.scrollTo(0, 0);
      const {value} = action
      return value
    }
    case 'closeModal': {
    window.scrollTo(0, 0);
    return "0"
  }
  default:
    return state;
  }
};

export default modalSelection;