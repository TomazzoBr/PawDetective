const image = (state = null, action) => {
  switch (action.type) {
  case 'setImage': {
    const {value} = action
    return value
  }
  default:
    return state;
  }
};

export default image;