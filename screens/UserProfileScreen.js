import { View, Text, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Stories from '../components/Stories'
import Post from '../components/Post'
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'


const UserProfileScreen = () => {  
    const route = useRoute()
    const {user} = useAuth()
  const { userdata } = route.params;
  const [currentTab, setCurrentTab] = useState("Posts") 
  const [posts, setPosts] = useState({ "__v": 0, "_id": "649d0c31f332ee28bf2c19c4", "comments": [], "email": "a@gmail.com", "image1": "https://firebasestorage.googleapis.com/v0/b/social-368115.appspot.com/o/Bb?alt=media&token=8b2dce78-7b80-47a2-b098-9786cbf95082", "image2": "https://firebasestorage.googleapis.com/v0/b/social-368115.appspot.com/o/Bb2?alt=media&token=5a21f371-3fc0-43dc-bf9f-4473558ff5f8", "image3": "", "image4": "", "likes": [], "posttext": "A random picture of a project.. " })
  const navigation = useNavigation()
  const [isFollowing,setIsFollowing] = useState(false)

  const handleFollow = async () => {
   
    setIsFollowing(true)
    userdata.followers.push(user.email)
    fetch('https://social-backend-three.vercel.app/followuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      followfrom: user.email,
      followto: userdata.email
    })
  })
  
}
const handleUnfollow = () => {
  setIsFollowing(false)
  userdata.followers.pop(user.email)
  fetch('https://social-backend-three.vercel.app/unfollowuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      unfollowfrom: user.email,
      unfollowto: userdata.email
    })
  })
   
}
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
      <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: 'white' }}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
          
         
         <View style={{ marginLeft: 6, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", }}>{userdata?.username}</Text>
            {/* <Text style={{ fontSize: 12, color: 'grey' }}>{lowerUsername}</Text> */}
          </View>
          <View style={{marginRight: 10}}>
          <Ionicons name="md-ellipsis-vertical-sharp" size={22} color="black" />
          </View>
        
          
        </View>
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
              <Text style={{  fontWeight: 'bold', fontSize: 16 }}>0</Text>
              <Text style={{  }}>Posts</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{  fontWeight: 'bold', fontSize: 16 }}>{userdata.followers.length}</Text>
              <Text style={{  }}>Followers</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{  fontWeight: 'bold', fontSize: 16 }}>{userdata.following.length}</Text>
              <Text style={{  }}>Following</Text>
            </View>
          </View>


        </View>
        <View style={{ marginHorizontal: 18, marginTop: 6 }}>
          <View>
            <Text style={{  fontSize: 16 }}>{userdata.username}</Text>
            <Text style={{ fontSize: 15 }}>{userdata.descritption}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
          {user.email==userdata.email ? (
              <Pressable titleSize={20} style={{ backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginRight: 5, flex: 1, height: 34 }}>
              <Text style={{ fontWeight: 'bold',  fontSize: 14, }}>Edit Profile</Text>
            </Pressable>
          ) : (
           <>
           {isFollowing == true || userdata.followers.includes(user.email) ? (
 <Pressable onPress={handleUnfollow} titleSize={20} style={{ backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginRight: 5, flex: 1, height: 34 }}>
 <Text style={{ fontWeight: 'bold',  fontSize: 14, }}>Following</Text>
</Pressable>
           ) : (
            <Pressable onPress={handleFollow} titleSize={20} style={{ backgroundColor: '#0076E5', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginRight: 5, flex: 1, height: 34 }}>
            <Text style={{ fontWeight: 'bold',  fontSize: 14,color: 'white' }}>Follow</Text>
          </Pressable>
           )}
           </>
          )}
            <Pressable titleSize={20} style={{ backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginLeft: 5, flex: 1, height: 34 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, }}>Share Profile</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 10 }}>
            <Stories />
          </View>





        </View>
        <View style={{ flexDirection: 'row', marginTop: 4, padding: 4, }}>
          {currentTab == "Posts" ? (
            <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
              <Text style={{ margin: 4,  }}>Posts</Text>
            </Pressable>
          ) : (
            <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Posts')}>
              <Text style={{ margin: 4,  }}>Posts</Text>
            </Pressable>
          )}
          {currentTab == "Posts & Replies" ? (
            <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
              <Text style={{ margin: 4,  }}>Replies</Text>
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
              <Text style={{ margin: 4,}}>Media</Text>
            </Pressable>
          )}
          {currentTab == "Likes" ? (
            <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
              <Text style={{ margin: 4,  }}>Likes</Text>
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

export default UserProfileScreen