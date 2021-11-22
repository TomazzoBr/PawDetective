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

export const openModal = (value) => ({
  type: 'openModal',
  value
})
export const closeModal = () => ({
  type: 'closeModal',
})