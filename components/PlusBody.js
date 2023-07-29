import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '.././firebase';
import { onSnapshot, query, doc, collection, where, updateDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const PlusBody = () => {
  const navigation = useNavigation()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [text, onChangeText] = useState("");
  const [userInfo, setUserInfo] = useState([])
  const [localImg, setLocalImg] = useState('')
  const [localImg2, setLocalImg2] = useState('')
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [uri, setUri] = useState("")

  const uploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });
    setLoading(true)
    if (!result.canceled) {
      const source = { uri: result.assets[0].uri }

      try {
        const response = await fetch(result.assets[0].uri)
        const blob = await response.blob()
        const filename = result.assets[0].uri.substring(result.assets[0].uri)
        const ref = firebase.storage().ref().child(text)
        const snapshot = await ref.put(blob)
        const url = await snapshot.ref.getDownloadURL()
        setLocalImg(result.assets[0].uri)
        setImage(url)
      } catch (err) {
        console.log(err)
      }
      if (result.assets[1]) {
        try {
          const response = await fetch(result.assets[1].uri)
          const blob = await response.blob()
          const filename = result.assets[1].uri.substring(result.assets[1].uri)
          const ref = firebase.storage().ref().child(text + "2")
          const snapshot = await ref.put(blob)
          const url = await snapshot.ref.getDownloadURL()
          setLocalImg2(result.assets[1].uri)
          setImage2(url)
        } catch (err) {
          console.log(err)
        }
      }
    }
    setLoading(false)
  };




  const SubmitPost = async () => {
    try {
      fetch("https://social-backend-three.vercel.app/addpost", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          image1: image,
          image2: image2,
          image3: image3,
          image4: image4,
          posttext: text, 
          replyingOn: "none", 
          replyingTo: "none",
        })
      })
        .then(res => res.json())
    }
    catch (err) {
      console.log(err)
    }
    navigation.goBack()
    onChangeText("")
  }

  const clickImage = () => {

  }

  return (

    <ScrollView style={{}}>
      <View style={{}}>
        {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row',backgroundColor: 'white'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 6 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image style={{ width: 30, height: 30, borderRadius: 50,marginRight: 2 }} source={{ uri: 'https://lh3.googleusercontent.com/a/AItbvmld8x4l-U0o2L28Ipg6VMny5NvPVM0sOjiqjlT8=s96-c' }} />
              <View style={{ flexDirection: 'row', paddingLeft: 6, paddingRight: 2, paddingBottom: 2, width: 80, justifyContent: 'center',alignItems: 'center' }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#0096F6', }}>Everyone</Text>
                <Ionicons name="chevron-down" size={16} color="#0096F6" style={{ marginLeft: 2 }} />
              </View>

            </TouchableOpacity>
          </View>
          <View>
            <Pressable style={styles.button} onPress={SubmitPost}>
              <Text style={styles.buttonText} >Post</Text>
            </Pressable>
          </View>
        </View> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>

              < Entypo name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              style={{ width: 34, height: 34, borderRadius: 50, }}
              source={{ uri: "https://lh3.googleusercontent.com/a/AItbvmld8x4l-U0o2L28Ipg6VMny5NvPVM0sOjiqjlT8=s96-c" }}
            />
          </View>
          <View style={{ marginLeft: 6, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Everyone</Text>
            <Ionicons name="chevron-down" size={16} color="black" style={{ marginLeft: 2 }} />

            {/* <Text style={{ fontSize: 12, color: 'grey' }}>{lowerUsername}</Text> */}
          </View>
          <Pressable style={styles.button} onPress={SubmitPost}>
            <Text style={styles.buttonText} >Post</Text>
          </Pressable>
        </View>


        <View>
          <View >
            <View style={{}}>

            </View>

            {/* <View style={{ flexDirection: "row", margin: 12, backgroundColor: 'white' }}>
              <Ionicons name="ios-globe-outline" size={16} color="#0096F6" style={{ marginLeft: 2 }} />
              <Text style={{ color: '#0096F6', marginLeft: 2, alignItems: 'center', marginBottom: 4, fontWeight: '600' }}>Everyone can reply</Text>
            </View> */}
            <View style={{ padding: 12, flexDirection: 'row', backgroundColor: 'white' }}>
              <TouchableOpacity onPress={uploadImage} style={{}}>
                <MaterialIcons name="image" size={24} color="#0078E9" style={{ marginLeft: 5, backgroundColor: '#D4E4F4', borderRadius: 18, padding: 5 }} />
              </TouchableOpacity>
              <TouchableOpacity >
                <MaterialIcons name="poll" size={24} color="#0078E9" style={{ marginLeft: 5, backgroundColor: '#D4E4F4', borderRadius: 18, padding: 5 }} />
              </TouchableOpacity>
              <TouchableOpacity >
                <MaterialIcons name="emoji-emotions" size={24} color="#0078E9" style={{ marginLeft: 5, backgroundColor: '#D4E4F4', borderRadius: 18, padding: 5 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={clickImage}>
                <MaterialIcons name="my-location" size={24} color="#0078E9" style={{ marginLeft: 5, backgroundColor: '#D4E4F4', borderRadius: 18, padding: 5 }} />
              </TouchableOpacity>
            </View>
          </View>
         <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',}}>
          <Feather name="edit-3" size={24} color="black" style={{marginLeft: 6}}/>
         <TextInput
            style={styles.input}
            value={text}
            onChangeText={onChangeText}
            placeholder="Say Something..."
            multiline={true}
          />
         </View>
        </View>

        {image && !loading ? (
          <View style={{ padding: 10, backgroundColor: 'white' }}>
            <ScrollView horizontal={true} >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {image && (
                  <TouchableOpacity onPress={() => setImage(null)}>
                    <Image source={{ uri: localImg }} style={{ width: 150, height: 150, borderRadius: 12 }} />
                  </TouchableOpacity>
                )}
                {image2 && (
                  <TouchableOpacity onPress={() => setImage2(null)} style={{ marginLeft: 4 }}>
                    <Image source={{ uri: localImg2 }} style={{ width: 150, height: 150, borderRadius: 12 }} />
                  </TouchableOpacity>
                )}
                {image2 && (
                  <TouchableOpacity onPress={() => setImage2(null)} style={{ marginLeft: 4 }}>
                    <Image source={{ uri: localImg2 }} style={{ width: 150, height: 150, borderRadius: 12 }} />
                  </TouchableOpacity>
                )}
                {image2 && (
                  <TouchableOpacity onPress={() => setImage2(null)} style={{ marginLeft: 4 }}>
                    <Image source={{ uri: localImg2 }} style={{ width: 150, height: 150, borderRadius: 12 }} />
                  </TouchableOpacity>
                )}
                {image2 && (
                  <TouchableOpacity onPress={() => setImage2(null)} style={{ marginLeft: 4 }}>
                    <Image source={{ uri: localImg2 }} style={{ width: 150, height: 150, borderRadius: 12 }} />
                  </TouchableOpacity>
                )}

              </View>
            </ScrollView>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
              
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#D4E4F4', padding: 4, borderRadius: 10 , justifyContent: 'center', paddingLeft: 8, paddingRight: 8}}>
                <Feather name="user-plus" size={20} color="#0078E9" />
                <Text style={{  fontSize: 14, marginLeft: 4, color: "#0078E9" }}>Tag People</Text>
              </View>
            
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#D4E4F4', padding: 4, borderRadius: 10, marginLeft: 8, justifyContent: 'center', paddingLeft: 8, paddingRight: 8 }}>
                <Feather name="edit" size={20} color="#0078E9" />
                <Text style={{  fontSize: 14, marginLeft: 4, color: "#0078E9" }}>Edit</Text>
              </View>

            </View>
          </View>
        ) : loading ? (
          <View style={{ margin: 4, width: 150, height: 150, borderRadius: 12, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          null
        )}

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 12,

  },
  container1: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10

  },
  button: {
    backgroundColor: '#0096F6',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
    borderRadius: 24,
    width: 64,
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 16,

  },
  profile: {
    width: 40,
    heigth: 40,
    borderRadius: 50,
  },
  input: {
    fontSize: 16,
    padding: 8,
    marginRight: 22,
    textAlignVertical: 'center',
    minHeight: 60

  },


});



export default PlusBody