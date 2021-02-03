import { Client, ThreadID, PrivateKey, GetThreadResponse, KeyInfo } from '@textile/hub'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TEXTILE_KEY, TEXTILE_SECRET } from '@env'

const keyInfo : KeyInfo = {
  key: TEXTILE_KEY,
  secret: TEXTILE_SECRET
}

class Textile {
  /** The users unique pki identity */
  id?: PrivateKey

  /** The Hub API authentication */
  client?: Client

  /** The HUB API user token */
  token?: string

  /** Name of stored thread */
  threadName?: string

  login = async () : Promise<PrivateKey> => {
    if (!this.id) {
      let identity = await AsyncStorage.getItem('textileId')
      let pk
      if (!identity) {
        pk = PrivateKey.fromRandom()
        const identity = pk.toString()
        await AsyncStorage.setItem('textileId', identity)
      }
      else {
        pk = PrivateKey.fromString(identity)
      }
      this.id = pk
    }
    
    const client = await Client.withKeyInfo(keyInfo)
    const token = await client.getToken(this.id)      
    this.client = client
    this.token = token
    return Promise.resolve(this.id)
  }

  listThreads = async () : Promise<Array<GetThreadResponse>> => {
    if (!this.client) {
      await this.login()
    }
    /** Query for all the user's existing threads (expected none) */
    const result = await this.client.listThreads()

    /** Display the results */
    return result
  }

  getUserThread = async () : Promise<GetThreadResponse | ThreadID> => {
    if (!this.client) {
      await this.login()
    }
    if (this.threadName) {
      try {
      
        const userThreads = await this.client.listThreads()

        let thread = userThreads.find((thread : GetThreadResponse) => thread.name == this.threadName)
        if (thread) {
          console.log(thread)
          return thread
        }
      }
      catch (err) {
        console.log('error getting user threads')
        console.log(err)
      }
    }
    
    console.log('Creating new thread')
    const threadId = ThreadID.fromRandom()
   
    // unique thread name 
    const randomNumString = Math.random().toString().substr(2, 5)
    const threadName = `thread-${randomNumString}`
      
    const thread = await this.client.newDB(threadId, threadName)
    this.threadName = randomNumString
    console.log(thread)
    return thread
  }
}

const textile = new Textile()

export { Textile, textile }