const filterBtn = (state = "All", action) => {
  switch (action.type) {
    case 'FILTER':
      return action
    default:
      return action
  }
}

export default filterBtn;