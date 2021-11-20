const reducer2 = (state = [], action) => {
  switch (action.type) {
  case 'action2': {
    const { data } = action; //the payload
    //do sth with this action
    return data
  }
  default:
    return state;
  }
};

export default reducer2;