import store from 'store/store'
import actionTypes from 'store/actionTypes/actionTypes'

async function sortDataFast(dispatch) {
  dispatch({
    type: actionTypes.SORT_DATA_FAST,
    payload: store.getState()?.ticketsData,
  })
}
export default sortDataFast
