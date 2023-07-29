import { View, Text, Button, StyleSheet, ScrollView, StatusBar, RefreshControl } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import  Header  from '../components/Header'
import Stories from '../components/Stories'
import firebase from '../firebase'
import Post from '../components/Post'
import PlusModal from '../components/PlusModal'
import { orderBy } from 'firebase/firestore'
import useAuth from '../hooks/useAuth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [posts, setPosts] = useState([])
  const {user} = useAuth()

  useEffect(() => {

  axios.post('https://social-backend-three.vercel.app/allposts', {})
  .then(function (response) {
    setPosts(response.data.post);
    

  })
  
  },[])

  useEffect(() => {
    const fun = async () => {
      await AsyncStorage.setItem('user', JSON.stringify(user))
   
   
    }
  })
  const handleScroll = () => {
    // try{
    //   axios.post('https://social-backend-three.vercel.app/allposts', {})
    // .then(function (response) {
    //   Array.prototype.push.apply(posts,response.data.post)
    // })
    // } catch(err){
    //   console.log(err)
    // }
  //  Array.prototype.push.apply(posts,[{"__v": 4, "_id": "64c4906c966ae0be5cc3c4534", "email": "a@gmail.com", "image1": "https://firebasestorage.googleapis.com/v0/b/social-368115.appspot.com/o/This%20is%20what%20i%20am%20reading%20now?alt=media&token=1607cf99-3265-40aa-bfd8-a17849a271dd", "image2": "https://firebasestorage.googleapis.com/v0/b/social-368115.appspot.com/o/This%20is%20what%20i%20am%20reading%20now2?alt=media&token=0dcbaf9d-71da-410b-8c70-5b8acde7d97f", "image3": "", "image4": "", "likes": [], "posttext": "This is what i am reading now", "replyingEmail": "", "replyingOn": "none", "replyingTo": "none"}])
  }
  const handleRefresh = () => {
    setIsRefreshing(true) 
    axios.post('https://social-backend-three.vercel.app/allposts', {})
  .then(function (response) {
    setPosts(response.data.post);
  })
      setIsRefreshing(false)

  }
  return (

    <View style={styles.container}>
       <StatusBar
       animated={true}
       backgroundColor="white"
       barStyle="dark-content" 
           />

      <Header/>
       <ScrollView onScroll={handleScroll} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}>
        <Stories />
        <View style={{marginTop: 3, marginBottom: 80}}>
       {posts.map((post,_id) => (
       <Post post={post} key={_id} />
))}
       </View>

        </ScrollView> 
     
      {/* <Button title='Go To Chat' onPress={() => navigation.navigate('Chat')}/> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
   
     flex: 1
  },
});

export default HomeScreen