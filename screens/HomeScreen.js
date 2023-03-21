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