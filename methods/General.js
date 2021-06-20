import {toJS} from "mobx"
import Fetch from "./Fetch"

class General {
 /* Get users By limit 50 */
  radius = 50000
 async GetRestaurants() {

    return await  Fetch.GetFetch(`/restaurant`)

  }

  async GetDetials(id, contentType) {

    return await  Fetch.GetFetch(`/${contentType}/details/${id}`)
  }

  
  async NearMe(location = []) {
    let lat =   location.length > 0 ?  location[0] : 0;
    let lng =   location.length > 0 ?  location[1] : 0;
    let newParams = { lat, lng,radius:5000}

    return await Fetch.GetFetch(`/minian/nearme`,newParams)
  }
  async RoomId(roomId) {


    return await Fetch.GetFetch(`/room/getRoom/${roomId}`)
  }
  async getMessages(roomId) {
    return await Fetch.GetFetch(`/message/getMessages/${roomId}`)
  }
  async removeExpired() {
    return await Fetch.DeleteFetch(`/minian/removeExpired`)
  }
}

export default new General();