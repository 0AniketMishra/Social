import { View, Text, Button, StyleSheet, ScrollView, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import  Header  from '../components/Header'
import Stories from '../components/Stories'
import firebase from '../firebase'
import Post from '../components/Post'
import PlusModal from '../components/PlusModal'
import { orderBy } from 'firebase/firestore'


const HomeScreen = () => {
  const navigation = useNavigation()
  
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    firebase.firestore().collectionGroup('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(post => ({id: post.id , ...post.data()})))
   })
   
  },[])
  return (

    <View style={styles.container}>
       <StatusBar
       animated={true}
       backgroundColor="white"
       barStyle="dark-content" 
           />

      <Header/>
       <ScrollView>
        <Stories />
        <View style={{marginTop: 4, marginBottom: 80}}>
       {posts.map((post,index) => (
       <Post post={post} key={index} />
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