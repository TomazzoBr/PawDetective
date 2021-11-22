export const action1 = () => ({
  type: 'Action1',
})

export const action2 = (data) => ({
  type: 'Action2',
  data,
})

//////////////////////////////////////////
/////////Dashboard Filter Actions/////////
//////////////////////////////////////////
export const changeDashboardFilter = (filterSelection) => ({
  type: 'changeDashboardFilter',
  payload: filterSelection
})

///////////////////////////////
/////////Modal Actions/////////
///////////////////////////////
export const openModal = (value) => ({
  type: 'openModal',
  value
})
export const closeModal = () => ({
  type: 'closeModal',
})

///////////////////////////////
/////////Image Actions/////////
///////////////////////////////
export const setImage = (value) => ({
  type: 'setImage',
  value: value.target.files[0]
})

//////////////////////////////
/////////Form Actions/////////
//////////////////////////////
export const resetForm = () => ({
  type: 'resetForm'
})
export const toggleIsLost = (value) => ({
  type: 'toggleIsLost',
  payload: {value}
})
export const savePictureUrl = (value) => ({
  type: 'savePictureUrl',
  payload: {value}
})
export const changeAnimalForm = (value) => ({
  type: 'changeAnimalForm',
  payload: {value}
})
export const changeDescriptionForm = (value) => ({
  type: 'changeDescriptionForm',
  payload: {value}
})
export const changeLocationForm = (value) => ({
  type: 'changeLocationForm',
  payload: {value}
})
export const mapFormCords = (event) => ({
  type: 'mapFormCords',
  payload: {event}
})