import * as reducer from '../../reducers/filterBtnReducer';
import * as ACTIONS from '../../actions/index';

describe('my test', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual("All")
  })
});