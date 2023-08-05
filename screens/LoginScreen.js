import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import LoginForm from '../components/LoginForm'

const LoginScreen = () => {
    const { signInWithGoogle } = useAuth()
    
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: 'https://th.bing.com/th/id/R.3d74e8bfd4ef7985f7529bb9f7650eca?rik=RCvdo0dDvjxCWg&riu=http%3a%2f%2fwww.stickpng.com%2fassets%2fimages%2f580b57fcd9996e24bc43c53e.png&ehk=%2fkYf7%2bIY6TUkpUQzwclpivMLQ8ynEgcZYehDGOzbu0E%3d&risl=&pid=ImgRaw&r=0', height: 100, width: 150 }} /> 
      
      </View>
      <LoginForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
    paddingTop: 50, 
    paddintHorizontal: 12, 

  }, 
  logoContainer: {
    alignItems: 'center',
    marginTop: 60, 

  }
})

export default LoginScreen