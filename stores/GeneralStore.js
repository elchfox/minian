import { makeAutoObservable, runInAction,toJS} from "mobx"
import General from "../methods/General";
import GeoLocation from "../methods/GeoLocation";
import io from 'socket.io-client'
import Auth from "../methods/Auth";



class GeneralStore {
    location = []
    joined = false
    socket ;
    minians = []
    messages = []
    joinedCount = 0
    room = []
    constructor() {
        makeAutoObservable(this)
        
    }

        async startSocket (){
            const newSocket = io(
              global.baseUrl,
              { query: { id ,token:global.accessToken} }
            )
            this.socket = newSocket
        
        }
    async startRooms(){
        const newSocket = io(
            global.baseUrl,
            { query: { id ,token:global.accessToken} }
          )
        this.geoLocation()
        newSocket.on('createNew', (data)=>{
            console.log(data)
          this.minians = [data,...this.minians ]
        });
        
    }
    async startChat(){
        const newSocket = io(
            global.baseUrl,
            { query: { id ,token:global.accessToken} }
          )
        newSocket.getByRoomId(id)
        newSocket.getMessages(id)
        socket.on('sendMassage', (data)=> {
          console.log(data)
          newSocket.messages = [data,...newSocket.messages]
          setMessage(null)
        })

        socket.emit('join', {roomId:route.params.id})
          return ()=>{
            socket.off('join')
            socket.off('sendMassage')
          }
    }
    async createRoom(){
        var timestamp = new Date().toISOString()
        var hours3 = ((60 * 60) * 3) * 1000;
        let res = await GeoLocation.currentLocation()
        const {latitude,longitude} = res.coords
        var expired = new Date().getTime() + hours3

        const newSocket = io(
            global.baseUrl,
            { query: { id ,token:global.accessToken} }
          )
          newSocket.emit('createNew', {location:[latitude,longitude],timestamp,expired});
        
    }
    async createRoom(){

        const newSocket = io(
            global.baseUrl,
            { query: { id ,token:global.accessToken} }
          )
          newSocket.emit('createNew', {location:[latitude,longitude],timestamp,expired});
        
    }
    async geoLocation(){
       let res = await GeoLocation.currentLocation()
        const {latitude,longitude} = res.coords
        this.location = [latitude,longitude]
        let minians = await General.NearMe([latitude,longitude])
        this.minians = minians
    }

    async getByRoomId(id){

        let room = await General.RoomId(id)
        this.room = room.participants;
        this.joinedCount = room.joinedCount;
        this.joined  = this.room.find((item)=> item.userId === global.userId) 
    }
    async getMessages(roomId){
        let messages = await General.getMessages(roomId)
        this.messages = messages;
    }
    

}


export default  new GeneralStore();