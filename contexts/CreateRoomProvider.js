import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { GeneralStore } from '../stores';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const RoomsContext = React.createContext()

export function useRooms() {
  return useContext(RoomsContext)
}

export function CreateRoomProvider({ id, children }) {
  const [rooms, setRooms] = useLocalStorage('rooms', [])
  const socket = useSocket()

 

  const addRoom = useCallback((data) => {
    setRooms(data)
  }, [setRooms])

  useEffect(() => {
    if (socket == null) return

    socket.on('createNew', addRoom)

    return () => socket.off('createNew')
  }, [socket, addRoom])

  const formattedRooms = rooms.map( (room, index) => {
    const roomObj = room.map(async item => {

      return  item;
    })

    return roomObj
  })
  async function creatNew() {
    var timestamp = new Date().toISOString()
    var hours3 = ((60 * 60) * 3) * 1000;
    let res = await GeoLocation.currentLocation()
    const {latitude,longitude} = res.coords
    var expired = new Date().getTime() + hours3
    let data = {location:[latitude,longitude],timestamp,expired}
      socket.emit('createNew', data);

      addRoom(data)
  }


  const value = {
    rooms:formattedRooms,
    creatNew
  }

  return (
    <RoomsContext.Provider value={value}>
      {children}
    </RoomsContext.Provider>
  )
}
