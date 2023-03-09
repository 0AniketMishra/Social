import { View, Text, TextInput,Alert, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import  firebase  from '../firebase'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'





const LoginForm = () => {

  const navigation = useNavigation()

  const { user } = useAuth()
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required."),
        password: Yup.string()
        .required()
        .min(6, 'Your password must be at least 8 characters long')
    })

    const onLogin = async (email, password) => {
      try{
      await firebase.auth().signInWithEmailAndPassword(email, password)
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem('password', password)
   
      console.log("Login Success! 🔥", email, password)
      } catch(error) {
        console.log(error.message);
      }
    } 
  return (
    <View style={styles.wrapper}>
     <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={(values) => {
        onLogin(values.email, values.password)
      }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      
     >
        {({handleChange, handleSubmit, handleBlur, values, isValid }) => (
<>
              <View style={[
                styles.inputField, 
                {
                    borderColor: 
                    values.email.length < 1 || Validator.validate(values.email)
                       ? '#ccc'
                       : 'red' 
                }
               ]}>
                  <TextInput
                      placeholderTextColor='#444'
                      placeholder='Phone Number, Username or Email'
                      autoCapitalize='none'
                      keyboardType='email-address'
                      textContentType='emailAddress'
                      autoFocus={true}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                  />
              </View>
                      <View style={[
                          styles.inputField,
                          {
                              borderColor:
                                  values.password.length  || values.password.length > 6 
                                      ? '#ccc'
                                      : 'red'
                          }
                      ]}>
                  <TextInput
                      placeholderTextColor='#444'
                      placeholder='Password'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      textContentType='password'
                              onChangeText={handleChange('password')}
                              onBlur={handleBlur('password')}
                              value={values.password}

                  />
              </View>
              <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                  <Text style={{ color: '#6BB0F5' }}>Forgot Password ?</Text>
              </View>
              <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
                  <Text style={styles.buttonText}>Login</Text>
              </Pressable>
              <View style={styles.signupContainer}>
                  <Text>Don't have an account yet?   </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                      <Text style={{ color: '#6BB0F5' }} >Signup</Text>
                  </TouchableOpacity>
              </View>
              </>
              )}
     </Formik>
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper : {
    marginTop : 80,
    margin: 20,
  }, 
  inputField: {
    borderRadius : 4, 
    padding: 12, 
    backgroundColor: '#FAFAFA', 
    marginBottom : 10,
    borderWidth : 1,
  }, 
  button: isValid => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7', 
    alignItems : 'center',
    justifyContent: 'center',
    minHeight: 42, 
    borderRadius : 4,
  }), 
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize : 20,
  }, 
  signupContainer: {
    flexDirection: 'row', 
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  }
})

export default LoginForm