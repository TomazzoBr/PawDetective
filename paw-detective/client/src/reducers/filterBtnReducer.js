const filterBtn = (state = "All", action) => {
  switch (action.type) {
  case 'changeDashboardFilter': {
    const filterSelection = action.payload
    return filterSelection
  }
  default:
    return state;
  }
};

export default filterBtn;