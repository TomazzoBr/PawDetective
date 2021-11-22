import { combineReducers } from 'redux';
import lost from './lostOrFound'
import reducer1 from './reducer1'
import reducer2 from './reducer2'
import filterBtn from './filterBtnReducer';
import modalSelection from './modalReducer';
import form from './formReducer';
import image from './imageReducer';

export default combineReducers({
  lost, 
  reducer1, 
  reducer2, 
  filterBtn, 
  modalSelection, 
  form,
  image
})