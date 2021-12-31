import { getKey } from 'utils/api/requests'
import apiClient from '../../utils/api/apiClient'
import PATHS from '../../utils/api/Path'

async function getTicketData(dispatch) {
  const response = await getKey()
  const getData = () => apiClient.get(PATHS.getTicketsData + response.data.searchId)
  const data = await getData()
  dispatch({ type: 'TICKET_DATA', payload: data.data.tickets, isLoaded: true })
}
export default getTicketData
