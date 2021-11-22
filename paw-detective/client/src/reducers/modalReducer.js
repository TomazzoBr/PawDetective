const modalSelection = (state = "0", action) => {
  window.scrollTo(0, 0);
  switch (action.type) {
  case 'openModal': {
    const {value} = action
    return value
  }
  case 'closeModal': {
    return "0"
  }
  default:
    return state;
  }
};

export default modalSelection;