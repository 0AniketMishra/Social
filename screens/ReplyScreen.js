import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ReplyScreen = () => {
    const { userdata,user } = useAuth()
    const [text, onChangeText] = useState("");
    const [text2, onChangeText2] = useState("");
    const [Reply2,setReply2] = useState(false)
    const [Reply3,setReply3] = useState(false)
    const [Reply4,setReply4] = useState(false)
    const route = useRoute()
    const { post,info } = route.params
    

    const navigation = useNavigation()


    const SubmitPost = () => {
        try {
            fetch("https://social-backend-three.vercel.app/addpost", {
              method: 'POST',
              headers: {
                'Content-Type': "application/json"
              },
              body: JSON.stringify({
                email: user.email,
                // image1: image,
                // image2: image2,
                // image3: image3,
                // image4: image4,
                posttext: text, 
                replyingOn: post._id, 
                replyingTo: post._id,
                replyingEmail: post.email
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
    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <View>
            <Image
              style={{ width: 39, height: 39, borderRadius: 50, }}
              source={{ uri: userdata.profile ? userdata.profile : '' }}
            />
           </View>
           <View style={{ marginLeft: 6, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Everyone</Text>
            <Ionicons name="chevron-down" size={16} color="black" style={{ marginLeft: 2 }} />
                </View>
                <Pressable style={styles.button} onPress={SubmitPost}>
                    <Text style={styles.buttonText} >Post</Text>
                </Pressable>


            </View>

            <View style={{ margin: 6, zIndex: 99, maxHeight: 300 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>Replying To </Text>
                    <Text style={{ color: '#82C2FF', textDecorationLine: 'underline' }}>{userdata.lowerUsername}</Text>
                </View> */}
                <View style={{ flexDirection: 'row', marginTop: 8, padding: 2, borderRadius: 8 }}>
                    <View>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 50, }}
                            source={{ uri: info.profile }}
                        />
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <Text style={{  marginRight: 18,fontWeight: 'bold' }}>{info.username}</Text>
                        <Text style={{  marginRight: 21 }}>{post.posttext}</Text>
                    </View>
                </View>
            </View>

            <View style={{ borderLeftWidth: 2.5, borderLeftColor: 'grey', position: 'absolute', left: 26, top: 122 }}>
                <Text style={{  flex: 1, height: 4000 }}></Text>
            </View>

            <View style={{ marginTop: 8, zIndex: 99 }}>
                <View style={{ margin: 6, flexDirection: 'row', marginTop: 8, padding: 2, borderRadius: 8 }}>
                    <View>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 50, }}
                            source={{ uri: userdata.profile }}
                        />
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10,minHeight: 70 }}>
                        <Text style={{  marginRight: 18 }}>{userdata.username}</Text>
                        
                        <TextInput
                            style={{  marginRight: 35, }}
                            value={text}
                            placeholderTextColor="grey"
                            onChangeText={onChangeText}
                            placeholder="Drop Your Message Here"
                            multiline={true}

                        />
                       {/* Main */}
                    </View>
                </View>
                {Reply2 &&(
                    <View style={{ margin: 6, flexDirection: 'row', marginTop: 8, padding: 2, borderRadius: 8 }}>
                    <View>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 50, }}
                            source={{ uri: userdata.profile }}
                        />
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10,flex: 1,minHeight: 70 }}>
                        <Text style={{  marginRight: 18,color: 'black' }}>{userdata.username}</Text>
                        <TextInput
                            style={{ marginRight: 35, }}
                            value={text2}
                            placeholderTextColor="grey"
                            onChangeText={onChangeText2}
                            placeholder="Drop Your Message Here"
                            multiline={true}

                        />
                       {/* Main */}
                    </View>
                </View>
                )}
                {Reply3 &&(
                    <View style={{ margin: 6, flexDirection: 'row', marginTop: 8, padding: 2, borderRadius: 8 }}>
                    <View>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 50, }}
                            source={{ uri: userdata.profile }}
                        />
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10,minHeight: 70,flex: 1 }}>
                        <Text style={{  marginRight: 18 }}>{userdata.username}</Text>
                        <TextInput
                            style={{  marginRight: 35, }}
                            value={text2}
                            placeholderTextColor="grey"
                            onChangeText={onChangeText2}
                            placeholder="Drop Your Message Here"
                            multiline={true}

                        />
                       {/* Main */}
                    </View>
                </View>
                )}
                <Pressable style={{padding: 8,flexDirection: 'row', alignItems: 'center'}} onPress={() => Reply2 ? setReply3(true) : setReply2(true)}>
                  <View style={{}}>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 50,opacity: 0.75, zIndex: 99 }}
                            source={{ uri: userdata.profile }}
                        />
                        
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: 'grey'}}>Add another reply.</Text>
                    </View>
                </Pressable>
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
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 35,
        borderRadius: 24,
        width: 80,
    },
    buttonText: {
        fontWeight: 'bold',
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
        minHeight: 60,
        color: 'white',
        flex: 1,
        marginHorizontal: 15,
        borderRadius: 8,
    },


});

export default ReplyScreen