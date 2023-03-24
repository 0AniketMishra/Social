import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

const socket = io('https://socket-io-backend-zeta.vercel.app/')

const Message = () => {

  const navigation = useNavigation()
  const route = useRoute()
  const { username, lowerUsername, profile, email, _id, roomid, chatdata, id } = route.params;
  const [data, setData] = useState([])
  // const [id, setid] = useState("")
  const [text, onChangeText] = useState("");


  useEffect(() => {
    if (chatdata !== null) {
      setData(chatdata)
    }
    loadMessages(roomid)
  }, [])


  useEffect(() => {
    socket.emit('join_room', { roomid: roomid })

    socket.on('receive_message', (data) => {
      console.log(data)
    })
  })


  const handleSend = () => {
    const messagedata = { 
      message: text,
      roomid: roomid, 
      senderid: id,
      recieverid: _id
  }
  socket.emit('send_message', messagedata)
    setData([...data, { message: text, receiverid: _id, _id: text }])

  }

  const save = async () => {

    const name = JSON.stringify(username)
    await AsyncStorage.setItem(name, JSON.stringify(data))
    const ans = await AsyncStorage.getItem(name)


  }


  const loadMessages = (temproomid) => {

    axios.post('https://social-backend-three.vercel.app/getmessages', { roomid: temproomid })
      .then(function (response) {
        setData(response.data)
        save()
      })
 
  }
 
  return (
    <View style={{ flex: 1, }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>

            < Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            style={{ width: 38, height: 38, borderRadius: 50, }}
            source={{ uri: profile }}
          />
        </View>
        <View style={{ marginLeft: 6, flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>{username}</Text>
          <Text style={{ fontSize: 12, color: 'grey' }}>{lowerUsername}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Ionicons name="call-outline" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons name="videocam-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, }}>
        <ScrollView >

          <View style={{ marginTop: 10 }}>
            {data.map((message, index) => (
              <View key={message._id}>
                {message.senderid != _id ? (
                  <View style={{ marginRight: 8, marginBottom: 6, marginLeft: 18.2, backgroundColor: '#3673CF', borderTopLeftRadius: 12, padding: 6, fontSize: 14.6, borderTopRightRadius: 12, borderBottomLeftRadius: 12, flex: 1, alignSelf: 'flex-end', paddingLeft: 12, paddingRight: 12, }}>
                    <Text style={{ color: 'white', }}>
                      {message.message}

                    </Text>
                    {/* <Text style={{ color: 'white', fontSize: 8, textAlign: 'right', }}>4:28 PM</Text> */}
                  </View>
                ) : (
                  // <View style={{ marginLeft: 8, marginBottom: 6, marginRight: 18.2 }}>
                  //   <Text style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#1C0473', borderTopLeftRadius: 12, padding: 5, color: 'white', fontSize: 14.6, borderTopRightRadius: 12, borderBottomRightRadius: 12, paddingLeft: 10, paddingRight: 10, }}>
                  //     {message.message}
                  //   </Text>
                  //   <Text>4:28 PM</Text>
                  // </View>
                  <View style={{ marginLeft: 8, marginBottom: 6, marginRight: 18.2, backgroundColor: '#1C0473', borderTopLeftRadius: 12, padding: 6, fontSize: 14.6, borderTopRightRadius: 12, borderBottomRightRadius: 12, flex: 1, alignSelf: 'flex-start', paddingLeft: 12, paddingRight: 12, }}>
                    <Text style={{ color: 'white', }}>
                      {message.message}
                    </Text>
                    {/* <Text style={{ color: 'white', fontSize: 8, textAlign: 'left', }}>4:28 PM</Text> */}
                  </View>
                )}
              </View>
            ))}



          </View>
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, marginTop: 3, backgroundColor: 'white' }}>
        <TouchableOpacity>
          <Feather name="smile" size={23} color="grey" />

        </TouchableOpacity>

        <TextInput
          style={{ flex: 1, marginRight: 6, marginLeft: 6 }}
          value={text}
          onChangeText={onChangeText}
          placeholder="Say Something..."
          multiline={true}
        />
        <TouchableOpacity style={{ marginRight: 4 }}>

        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend}>
          <Feather name="send" size={22} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Message

