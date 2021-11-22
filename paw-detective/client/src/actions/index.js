export const action1 = () => ({
  type: 'Action1',
})

export const action2 = (data) => ({
  type: 'Action2',
  data,
})

export const changeDashboardFilter = (filterSelection) => ({
  type: 'changeDashboardFilter',
  payload: filterSelection
})
