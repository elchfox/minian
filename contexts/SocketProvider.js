import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import Auth from '../methods/Auth'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(async () => {
    await Auth.getStorage()
    const newSocket = io(
      global.baseUrl,
      { query: { id ,token:global.accessToken} }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}