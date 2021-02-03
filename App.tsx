/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'

import { textile } from './textile-threads'

declare const global: {HermesInternal: null | {}}

const App = () : JSX.Element => {
  const [idString, setIdString] = useState('')
  const [threadIdString, setThreadIdString] = useState('')

  async function login() : Promise<void> {
    textile.login().then(id => {
      setIdString(id.toString())
    })
  }

  async function getThread() : Promise<void> {
    const thread = await textile.getUserThread()
    setThreadIdString(thread.toString())
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            
            {idString ? <>
              <Text>Logged in as {idString}</Text>
              <Button onPress={getThread} title="get user thread"/>
            </> : <Button onPress={login} title="textile login"/>}
            {threadIdString ? <Text>Thread Id: {threadIdString} </Text> : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default App
