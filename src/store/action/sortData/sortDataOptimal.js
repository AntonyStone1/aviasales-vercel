import store from 'store/store'
import actionTypes from 'store/actionTypes/actionTypes'

async function sortDataOptimal(dispatch) {
  dispatch({
    type: actionTypes.SORT_DATA_OPTIMAL,
    payload: store.getState()?.ticketsData,
  })
}
export default sortDataOptimal
