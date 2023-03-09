import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';


const UserPostScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { username, lowerUsername, profile, posttext, image1, image2 } = route.params
  const dimensions = Dimensions.get('window');
  return (
    <View>
     <View>
        <View style={{ padding: 8, backgroundColor: 'white'}}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{fontSize: 15, marginLeft: 4, fontWeight: 'bold'}}>Post by {username}</Text>
        </TouchableOpacity>
        </View>
     </View>

    <View style={{marginTop: 6, backgroundColor: 'white'}}>
     <View
    style={{ justifyContent: "space-between", flexDirection: "row", margin: 5 }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, marginBottom: 5 }}>
      <View>
        <Image
          style={{ width: 42, height: 42, borderRadius: 50, marginLeft: 4 }}
          source={{ uri: profile ? profile : 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }}
        />
      </View>
      <View>
        <Text
          style={{ marginLeft: 10, fontWeight: "bold", fontSize: 14 }}
        //   onPress={() =>
        //     navigation.navigate("UserProfile", {
        //       username: tempdata.username,
        //       lowerUsername: post.lowerUsername,
        //       profile: post.profilePicture,
        //       email: post.email,
        //       about: ''
        //     })
        //   }
        >
          {username}
        </Text>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>

        <Text style={{ marginLeft: 10, fontSize: 12 }}>{lowerUsername} | 2 hours ago</Text>
        </View>
      </View>
    </View>
    <View>
      <Text style={{ marginRight: 10, fontSize: 22, color: 'grey' }}>...</Text>
    </View>
  </View>




  <View >
    
    <View   style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 6,
    
          }}
        
          >
    <Text style={{ fontSize: 15, fontWeight: "400", marginBottom: 10, fontFamily: 'Roboto' }}>{posttext} </Text>
    </View>
        <View >
        <ScrollView horizontal={true} >
         <View style={{justifyContent: 'center'}}>
         {image1 && (
            <>
            <Image
              style={{
                width: dimensions.width-20,
                height: dimensions.width-20,
                marginLeft: 8, 
                 marginRight: 8,
                borderRadius: 10,
                marginBottom: 6
              }}
              source={{ uri: image1 }}
            />
            <View style={{position: 'absolute', zIndex: 100, right: 14, top: 8,justifyContent: 'center'}}>
              <Text style={{backgroundColor: 'black', borderRadius: 6, color: 'white', paddingLeft: 5 ,paddingRight: 5, fontSize: 12}}>{image2 ? "1/2" : "1/1"}</Text>
            </View>
            </>
          )}
         </View>
          <View style={{justifyContent: 'center'}}>
          {image2 && (
            <>
            <Image
              style={{
                width: dimensions.width-20,
                height: dimensions.width-20,
                marginLeft: 8, 
                marginRight: 8,
                borderRadius: 10,
                marginBottom: 6
              }}
              source={{ uri: image2 }}
            />
            <View style={{position: 'absolute', zIndex: 100, right: 16, top: 8}}>
            <Text style={{backgroundColor: 'black', borderRadius: 6, color: 'white', paddingLeft: 5 ,paddingRight: 5, fontSize: 12}}>2/2</Text>
          </View>
          </>
          )}
          </View>
         </ScrollView>
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
             style={{ width: 30, height: 30, borderRadius: 50, margin: 4,borderWidth: 1, borderRadius: 50, borderColor:'white' }}
             source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg"}}
           />
         
     
     
           
           <Image
           style={{ width: 30, height: 30, borderRadius: 50, margin: 4, left: -16,borderWidth: 1, borderRadius: 50, borderColor:'white' }}
           source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg"}}
         />
        
        
            <Image
          style={{ width: 30, height: 30, borderRadius: 50, margin: 4, left: -32,borderWidth: 1, borderRadius: 50, borderColor:'white' }}
          source={{ uri: "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg" }}
        />
    
        
    
    
           {/* <Text style={{ color: '#A9A9A9' }}>Someone found this helpfull </Text> */}
       
        
           {/* {/* <Text style={{left: -18, color: '#A9A9A9' }}>{post.likes_by_users.slice(-2)[0].username}  and others likes it.</Text> */}
       
          
           <Text style={{left: -32, color: '#A9A9A9',fontSize: 12 }}>You and others liked this</Text> 
       
       </View>
       
    
      </View>
     </View>
    </View>
  )
}

export default UserPostScreen