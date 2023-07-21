import { View, Text, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Stories from '../components/Stories'
import Post from '../components/Post'


const ProfileScreen = () => {
  const { userdata } = useAuth()
  const [currentTab, setCurrentTab] = useState("Posts")
  const [posts, setPosts] = useState({ "__v": 0, "_id": "649d0c31f332ee28bf2c19c4", "comments": [], "email": "a@gmail.com", "image1": "https://firebasestorage.googleapis.com/v0/b/social-368115.appspot.com/o/Bb?alt=media&token=8b2dce78-7b80-47a2-b098-9786cbf95082", "image2": "https://firebasestorage.googleapis.com/v0/b/social-368115.appspot.com/o/Bb2?alt=media&token=5a21f371-3fc0-43dc-bf9f-4473558ff5f8", "image3": "", "image4": "", "likes": [], "posttext": "A random picture of a project.. " })
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
      <View>
        <Header />
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ marginLeft: 18 }}>
            <Image
              style={{ width: 84, height: 84, borderRadius: 50, }}
              source={{ uri: userdata?.profile ? userdata?.profile : 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }}
            />
            {/* <Text style={{color: 'white', marginTop: 10, fontSize: 15}}>{userdata.username}</Text> */}
          </View>

          <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', flex: 1, padding: 3 }}>

            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>0</Text>
              <Text style={{}}>Posts</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{userdata.followers.length}</Text>
              <Text style={{}}>Followers</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{userdata.following.length}</Text>
              <Text style={{}}>Following</Text>
            </View>
          </View>


        </View>
        <View style={{ marginHorizontal: 18, marginTop: 6 }}>
          <View>
            <Text style={{ fontSize: 17,fontWeight: 'bold' }}>{userdata.username}</Text>
            <Text style={{ fontSize: 15 }}>{userdata.descritption}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
            <Pressable titleSize={20} style={{ backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginRight: 5, flex: 1, height: 34 }}>
              <Text style={{ fontWeight: 'bold',  fontSize: 14, }}>Edit Profile</Text>
            </Pressable>
            <Pressable titleSize={20} style={{ backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginLeft: 5, flex: 1, height: 34 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, }}>Share Profile</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 10 }}>
            <Stories/>
          </View>


        </View>
        <View style={{ flexDirection: 'row', marginTop: 4, padding: 4, }}>
          {currentTab == "Posts" ? (
            <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
              <Text style={{ margin: 4,  }}>Posts</Text>
            </Pressable>
          ) : (
            <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Posts')}>
              <Text style={{ margin: 4, }}>Posts</Text>
            </Pressable>
          )}
          {currentTab == "Posts & Replies" ? (
            <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
              <Text style={{ margin: 4}}>Replies</Text>
            </Pressable>
          ) : (
            <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Posts & Replies')}>
              <Text style={{ margin: 4,  }}>Replies</Text>
            </Pressable>
          )}
          {currentTab == "Media" ? (
            <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
              <Text style={{ margin: 4, }}>Media</Text>
            </Pressable>
          ) : (
            <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Media')}>
              <Text style={{ margin: 4, }}>Media</Text>
            </Pressable>
          )}
          {currentTab == "Likes" ? (
            <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
              <Text style={{ margin: 4, }}>Likes</Text>
            </Pressable>
          ) : (
            <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Likes')}>
              <Text style={{ margin: 4,  }}>Likes</Text>
            </Pressable>
          )}
        </View>

        <View style={{marginBottom: 100}}>

          <Post post={posts} />

        </View>
      </View>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen