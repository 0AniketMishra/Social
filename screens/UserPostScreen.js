import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions,Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Post from '../components/Post';
import { Feather } from '@expo/vector-icons';
import Reply from '../components/Reply';
import ReplyScreen from './ReplyScreen';


const UserPostScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { post,tempdata} = route.params
  const dimensions = Dimensions.get('window');
  return (
    <View style={{flex: 1,backgroundColor: 'white'}}>
     <ScrollView>

    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
         
         <View style={{ marginLeft: 6, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", }}>Post By {tempdata?.username}</Text>
            {/* <Text style={{ fontSize: 12, color: 'grey' }}>{lowerUsername}</Text> */}
          </View>
          <View style={{marginRight: 6}}>
          <Ionicons name="md-ellipsis-vertical-sharp" size={22} color="black" />
          </View>
        </View>
   <View style={{borderBottomWidth: 1,borderBottomColor: '#DCDCDC'}}>
   <Post  post={post} style={{elevation: 4}}/>
   </View>
  
  <View>
   
  <View style={{}}>
  <Reply post={post}/>
    <Reply post={post}/>
    <Reply post={post}/>
    <Reply post={post}/>
  </View>
  

  </View>
 

    
     </ScrollView>


     <Pressable onPress={() => {navigation.navigate('Reply',{post:post,info: tempdata})}} style={{backgroundColor: '#F8F8F8',padding: 4,borderTopWidth: 1,borderTopColor: '#DCDCDC',position: 'absolute',bottom: 0,right:0,left:0 }}>

<View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View>
  <Image
      style={{ width: 46, height: 46, borderRadius: 50, marginLeft: 4 }}
      source={{ uri: tempdata.profile ? tempdata.profile : 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }}
    />
  </View>
  <View style={{marginLeft: 6}}>
<Text style={{fontSize: 15, color: 'grey'}}>Post Your Reply</Text>
  </View>
  <Text style={{flex: 1}}></Text>
  <View>
  <View style={{  backgroundColor: '#0096F6',
alignItems: 'center',
justifyContent: 'center',
minHeight: 34,
borderRadius: 24,
width: 64,}} >
<Text style={{fontWeight: 'bold', color: 'white'}} >Post</Text>
  </View>
  </View>
</View>
</Pressable>
    </View>
   
  )
}

export default UserPostScreen