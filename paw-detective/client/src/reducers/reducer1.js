const reducer1 = (state = [], action) => {
  switch (action.type) {
  case 'action1': {
    //do sth with this action
    return
  }
  default:
    return state;
  }
};

export default reducer1;