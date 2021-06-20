import { toJS } from "mobx";

class Fetch {


  async GetFetch(url, params = {}) {
  console.log(`${global.baseUrl}${url}`)
  let query =   Object.entries(params).filter(([, value]) =>  value.toString().length > 0   ).map((param)=>   `${param[0]}=${param[1]}`).join("&")    
  console.log(`${global.baseUrl}/api${url}?${query}`);
    const data = await fetch(`${global.baseUrl}/api${url}?${query}`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization:global.accessToken
      }
    })
    const json = await data.json()

    return json
  }
  
  async PostFetch(url,data) {
      
    const dataJson = await fetch(`${global.baseUrl}/api${url}`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization:global.accessToken
      },
      body: JSON.stringify(data)
    })
    const json = await dataJson.json()

    return json
  }
  
  async DeleteFetch(url) {
      
    const dataJson = await fetch(`${global.baseUrl}/api${url}`,{
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization:global.accessToken
      }
    })
    const json = await dataJson.json()

    return json
  }
  async PostFetchFile(url,data) {
      
    const dataJson = await fetch(`${global.baseUrl}/api${url}`,{
      method: 'POST',

      body: data
    })
    const json = await dataJson.json()
    return json
  }

}

export default new Fetch();