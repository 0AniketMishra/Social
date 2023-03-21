import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
import { withSafeAreaInsets } from 'react-native-safe-area-context'
import PlusBody from './PlusBody'

const PlusModal = () => {
  return (
    <View style={styles.container}>
     <PlusBody/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
   flex: 1, 
   backgroundColor: 'white'
  },
});

export default PlusModal