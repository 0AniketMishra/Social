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


const HomeScreen = () => {
  const navigation = useNavigation()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [posts, setPosts] = useState([])
  const {user} = useAuth()

  useEffect(() => {

  fetch('https://social-backend-three.vercel.app/allposts', {
    method: 'POST',
  })
    .then(res => res.json())
    .then(async data => {
      if (data.message == "Posts Found") {
        setPosts(data.post)
        
      }
    })
   
    
  })
  useEffect(() => {
    fun()
  })
  const fun = async () => {
    await AsyncStorage.setItem('user', JSON.stringify(user))
    const ge = await AsyncStorage.getItem('user')
 
  }
  const handleRefresh = () => {
    setIsRefreshing(true) 
    fetch('https://social-backend-three.vercel.app/allposts', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(async data => {
        if (data.message == "Posts Found") {
          setPosts(data.post)
          
        }
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
       <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}>
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