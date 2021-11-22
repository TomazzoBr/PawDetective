import { combineReducers } from 'redux';
import lost from './lostOrFound'
import filterBtn from './filterBtnReducer';
import modalSelection from './modalReducer';
import form from './formReducer';
import image from './imageReducer';

export default combineReducers({
  lost, 
  filterBtn, 
  modalSelection, 
  form,
  image
})