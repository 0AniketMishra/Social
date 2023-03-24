import React from 'react'
import { View, Text, Image, Button, Pressable, TouchableOpacity, ScrollView, ActivityIndicatorBase, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { Feather } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';


const UserProfileScreen = () => {
  const route = useRoute()
  const [userInfo, setUserInfo] = useState([]);
  const { username,lowerUsername , profile, about, email, _id } = route.params
  const { user } = useAuth()
  const navigation = useNavigation()
  const [currentTab, setCurrentTab] = useState("Posts")
  const [isfollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [id, setid] = useState("")
  const [chatData, setChatData] = useState([])
  const [roomid, setRoomid] = useState("")
  

useEffect(() => {
  fun()
})
   
   useEffect(() => {
    axios.post('https://social-backend-three.vercel.app/userdata', {email: email})
    .then(function (response) {
        setUserInfo(response.data.savedUser)
    })
   },[])
  
  
   
   
   const fun = async() => {

    const id = await AsyncStorage.getItem("_id")
    let temp1 = JSON.parse(id)
   setid(temp1) 
   sortroomid()
   
   } 
  
   const sortroomid = () => {
     if (_id > id) {
         let temp = _id + id
         setRoomid(temp)
       
     } else {
         let temp = id+_id
         setRoomid(temp)
     
     }
  //  console.log(roomid)
   localload()
 } 
 const localload = async() => {
  const temp = await AsyncStorage.getItem(JSON.stringify(username))
  const final = JSON.parse(temp)
  // console.log('At UserProfilePage the value was', final)
  setChatData(final)

 }

  const check = () => {
    if (userInfo?.followers?.includes(user.email)) {
      setIsFollowing(true)
    } else {
      setIsFollowing(false)
    }
   
  }

  const follow = async () => {
   
      setIsFollowing(true)
      fetch('https://social-backend-three.vercel.app/followuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followfrom: user.email,
          followto: email
        })
      })
        .then(res => res.json())
        .then(data => {
          check()
          loaddata()
        })
    
  }
const unfollow = () => {
  fetch('https://social-backend-three.vercel.app/unfollowuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      unfollowfrom: user.email,
      unfollowto: email
    })
  })
    .then(res => res.json())
    .then(data => {
      check()
      loaddata()
    })
}

  return (
    <ScrollView>
     {loading == true ? (
     <View>
      <ActivityIndicator/>
     </View>
     ): (
      <View>
         <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* <Header /> */} 
        <View style={{ position: "absolute", zIndex: 999 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 8,
              padding: 4,
              justifyContent: "center",
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={{marginLeft: 8, color: 'white', fontWeight: 'bold', fontSize: 18}}>{username}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Image style={{ alignSelf: "stretch", height: 200, marginBottom: 8 }} source={{ uri: 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }} />


            <><Image style={{ width: 100, height: 100, borderRadius: 100, top: 150, position: 'absolute', zIndex: 999, left: 15 }} source={{ uri: profile ? profile : 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg' }} /><View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 12 }}>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ padding: 6, borderRadius: 24, justifyContent: 'center', alignItems: 'center', }} 
              onPress={() => navigation.navigate('Message', {
                lowerUsername: lowerUsername, 
                username: username, 
                profile: profile == "" ? "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" :profile,
                email: email, 
                _id: _id, 
                id: id,
                roomid: roomid, 
                chatdata: chatData
               })}>
            <Feather name="send" size={22} color="grey"  />
              
            </TouchableOpacity>
                {user.email == email ? (
                  <Text style={{ backgroundColor: '#E9E9E9', borderRadius: 16, padding: 6, fontWeight: '600', marginLeft: 6 }} onPress={() => navigation.navigate("EditProfile", {
                    lastUsername: username,
                    lastAbout: about
                  })}>Edit Profile</Text>
                ) : (
                 <>
              
                    {isfollowing ? ( 
                      <Pressable onPress={unfollow}>
                   
                      <Text style={{ borderRadius: 16, padding: 6, fontWeight: '600', marginLeft: 6, fontWeight: 'bold', borderWidth: 1 }} >Following</Text>
  
                      
                    </Pressable>
                    ) : (
                      <Pressable onPress={follow}>
                   
                    <Text style={{ borderRadius: 16, padding: 6, fontWeight: '600', marginLeft: 6, fontWeight: 'bold', borderWidth: 1 }} >Follow</Text>

                    
                  </Pressable>
                    )}
                   
                  </>
                )}
              </View>
            </View></>





          </View>
          <View style={{ marginTop: 40 }}>



            <View style={{ marginLeft: 20, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{username}</Text>
                <Image style={{ width: 20, height: 20, marginLeft: 2, bottom: -2 }} source={{ uri: 'https://th.bing.com/th/id/OIP.Qq0Ov_N_BiXjTfZA3EriXQHaHa?pid=ImgDet&rs=1' }} />
             
                {/* <Octicons name="verified" size={18} color="#3673CF" style={{marginLeft: 2}}/>
                <Ionicons name="checkmark-circle" size={24} color="#3673CF" /> */}
              </View>
              <Text style={{ fontSize: 12, fontWeight: '200', top: -4, color: 'grey' }}>{lowerUsername}</Text>
              <Text>{about == "" || null ? "Hey There I am using Social" : about}</Text>
              {/* <Text>{roomid == "" ? "Procesing.." : roomid}</Text> */}


              {/* <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <Ionicons name="ios-location-sharp" size={24} color="black" />
                    <Text style={{ color: 'light-blue' }}>Hong-Kong</Text>
                  </View> */}

              <View style={{ marginTop: 10, flexDirection: 'row', }}>
                <Ionicons name="calendar-sharp" size={20} color="black" />
                <Text style={{ color: 'light-blue', marginleft: 2 }}> Joined On December 2022</Text>
              </View>

              <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', marginRight: 4 }}>
                  <Text style={{ fontWeight: "bold", marginRight: 2 }}>{userInfo.followers?.length}</Text>
                  <Text>Followers</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: "bold", marginRight: 2 }}>{userInfo.following?.length}</Text>
                  <Text>Following</Text>
                </View>
              </View>



            </View>


          </View>
          <View>
            <View style={{ flexDirection: 'row', marginTop: 4, justifyContent: 'space-evenly', borderBottomWidth: 1, borderBottomColor: '#D6D6D6' }}>
              {currentTab == "Posts" ? (
                <TouchableOpacity style={{ borderBottomWidth: 2, }}>
                  <Text style={{ margin: 4 }}>Posts</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{}} onPress={() => setCurrentTab('Posts')}>
                  <Text style={{ margin: 4 }}>Posts</Text>
                </TouchableOpacity>
              )}
              {currentTab == "Posts & Replies" ? (
                <TouchableOpacity style={{ borderBottomWidth: 2, }}>
                  <Text style={{ margin: 4 }}>Posts & Replies</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{}} onPress={() => setCurrentTab('Posts & Replies')}>
                  <Text style={{ margin: 4 }}>Posts & Replies</Text>
                </TouchableOpacity>
              )}
              {currentTab == "Media" ? (
                <TouchableOpacity style={{ borderBottomWidth: 2, }}>
                  <Text style={{ margin: 4 }}>Media</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setCurrentTab('Media')}>
                  <Text style={{ margin: 4 }}>Media</Text>
                </TouchableOpacity>
              )}
              {currentTab == "Likes" ? (
                <TouchableOpacity style={{ borderBottomWidth: 2, }}>
                  <Text style={{ margin: 4 }}>Likes</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setCurrentTab('Likes')}>
                  <Text style={{ margin: 4 }}>Likes</Text>
                </TouchableOpacity>
              )}
            </View>




            
            <View>
            <View
    style={{ justifyContent: "space-between", flexDirection: "row", margin: 5 }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
      <View>
        <Image
          style={{ width: 44, height: 44, borderRadius: 50, marginLeft: 4 }}
          source={{ uri: profile ? profile : 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg' }}
        />
      </View>
      <View>
        <Text
          style={{ marginLeft: 10, fontWeight: "bold", fontSize: 14 }}
          onPress={() =>
            navigation.navigate("UserProfile", {
              // username: tempdata.username,
              // lowerUsername: tempdata.lowerUsername,
              // profile: tempdata.profile,
              // email: post.email,
              // about: '',
              // _id: tempdata._id
            })
          }
        >
          {username}
        </Text>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>

          <Text style={{ marginLeft: 10, fontSize: 12 }}>{lowerUsername} | 2 hours ago</Text>
        </View>
      </View>
    </View>
    <View style={{flexDirection:'row',alignItems: 'center' }}>
      {/* <Text style={{ marginRight: 10, fontSize: 22, color: 'grey' }}>...</Text> */}
      {/* <Text style={{marginRight: 6, fontSize: 12}}>Following</Text>  */}

      <Feather name="more-horizontal" size={20} color="grey" />
    </View>
  </View>

              <TouchableOpacity

              //  onPress={() => navigation.push("UserPost", {
              //   username: post.username, 
              //   post: post
              //  })}
              >
                <View >
                  <View
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                      marginTop: 6,

                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "400", marginBottom: 10, fontFamily: 'Roboto' }}>Getting Into UI/UX Engineering...</Text>
                  </View>
                  <View>

                    <Image
                      style={{
                        alignSelf: "stretch",
                        height: 400,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 10,
                        marginBottom: 6
                      }}
                      source={{ uri: 'https://i2.wp.com/www.wendyzhou.se/blog/wp-content/uploads/2019/08/uixninja.png?fit=1600%2C1200&ssl=1' }}
                    />

                  </View>

                  <View
                    style={{
                      marginRight: 15,
                      marginLeft: 15,
                      paddingBottom: 6,
                      flexDirection: "row",

                      alignItems: 'center'
                    }}
                  >




                    <Image
                      style={{ width: 30, height: 30, borderRadius: 50, margin: 4, borderWidth: 1, borderRadius: 50, borderColor: 'white' }}
                      source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg" }}
                    />




                    <Image
                      style={{ width: 30, height: 30, borderRadius: 50, margin: 4, left: -16, borderWidth: 1, borderRadius: 50, borderColor: 'white' }}
                      source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg" }}
                    />


                    <Image
                      style={{ width: 30, height: 30, borderRadius: 50, margin: 4, left: -32, borderWidth: 1, borderRadius: 50, borderColor: 'white' }}
                      source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg" }}
                    />




                    {/* <Text style={{ color: '#A9A9A9' }}>Someone found this helpfull </Text> */}


                    {/* {/* <Text style={{left: -18, color: '#A9A9A9' }}>{post.likes_by_users.slice(-2)[0].username}  and others likes it.</Text> */}


                    <Text style={{ left: -32, color: '#A9A9A9', fontSize: 12 }}>You and others liked this</Text>

                  </View>


                </View>
              </TouchableOpacity>
              <View style={{
                marginLeft: 10, marginRight: 10, marginBottom: 4, borderTopColor: '#E9E9E9',
                borderTopWidth: 1,
              }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginLeft: 8,
                    marginRight: 8,
                    marginTop: 4,
                    marginBottom: 4
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row", borderRadius: 4, padding: 4, }}
                  >

                    <Ionicons name="heart-outline" size={21} color="black" />

                    <Text style={{ marginLeft: 6, fontSize: 16, marginRight: 6 }}>
                      0
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ flexDirection: "row", marginLeft: 12, padding: 4, borderRadius: 4 }}

                  >
                    <Ionicons name="chatbubble-outline" size={21} color="black" />
                    <Text style={{ marginLeft: 4, fontSize: 16 }}>0 </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      </View>
     )}
    </ScrollView>
  )
}

export default UserProfileScreen