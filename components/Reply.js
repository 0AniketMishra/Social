import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  PixelRatio,
  ScrollView,
  Dimensions,
  Pressable
} from "react-native";
import React, { useEffect, useState, useCallback, memo, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "../firebase";
import useAuth from "../hooks/useAuth";
import { onSnapshot, query, doc, collection, where, addDoc } from "firebase/firestore";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';


const Reply = ({ post, }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [text, onChangeText] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [postInfo, setPostInfo] = useState([])
  const [ReplyModal, setReplyModal] = useState(false);
  const [tempdata, setTempData] = useState([])
  const [tempdata2, setTempData2] = useState([])
  const [post2, setPost2] = useState([]) 
  const [like, setLike] = useState(false)

  const dimensions = Dimensions.get('window');

  const handleLike = useCallback(() => {
    setLike(true)
    post.likes.push(user.email)
    axios.post('https://social-backend-three.vercel.app/likepost', { email: user.email, postid: post._id })
  });


  const handleUnlike = useCallback(() => {
    setLike(false)
    post.likes.pop(user.email)
    axios.post('https://social-backend-three.vercel.app/unlikepost', { email: user.email, postid: post._id })
  })

  const handleSubmit = async () => {

  }


  useEffect(() => {

    fetch('https://social-backend-three.vercel.app/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        email: post.email
      })
    })
      .then(res => res.json())
      .then(async data => {
        if (data.message == "User Found") {
          setTempData(data.savedUser)
        }
      })




      if(post.replyingEmail != ""){

        fetch('https://social-backend-three.vercel.app/userdata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 

    },
    body: JSON.stringify({
      email: post?.replyingEmail
    })
  })
    .then(res => res.json())
    .then(async data => {
      if (data.message == "User Found") {
        setTempData2(data.savedUser)
      }
    })


    fetch('https://social-backend-three.vercel.app/postdata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify({
      postId: post?.replyingTo
    })
  })
    .then(res => res.json())
    .then(async data => {
        setPost2(data.post) 
        

    })
   

      }



  }, [])



  return (
    <View style={{}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ReplyModal}

      >
        <View style={styles.centeredView} >
          <View style={styles.modalView}>
            <View>
              <View style={{ padding: 8, backgroundColor: 'white' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setReplyModal(false)}>
                  < Entypo name="chevron-left" size={24} color="black" />
                  <Text style={{ fontSize: 17, marginLeft: 3, fontWeight: 'bold' }}>Replies</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>







      <View>
      <View style={{ borderRadius: 6, backgroundColor: 'white', padding: 2 }}>
        {/* background #F9FFFF was used previously */}

        <View
          style={{ justifyContent: "space-between", flexDirection: "row", margin: 4, }}
        >
          <View style={{ flexDirection: "row", marginTop: 3 }}>
            <View style={{ zIndex: 2 }}>
              <Image
                style={{ width: 42, height: 42, borderRadius: 50, }}
                source={{ uri: tempdata.profile ? tempdata.profile : 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }}
              />
            </View>
            <View >
              <View style={{flexDirection: 'row',alignItems: 'center',flex: 1}}>
              <Text
                style={{ marginLeft: 5, fontWeight: "bold", fontSize: 14 }}
                onPress={() =>
                  navigation.navigate("UserProfile", {
                    userdata: tempdata
                  })
                }
              >
                {tempdata.username}
              </Text>
              <Text style={{fontSize: 12.5 }}>{tempdata.lowerUsername} • 1d</Text>
              <View style={{flex: 1}}></View>
             
       
          {/* <Feather name="more-horizontal" size={20} color="grey" /> */}
     
             
              </View>

              <View style={{ flexDirection: "row", alignItems: 'center' }}>
 
             
      <Text style={{marginLeft: 5,marginRight: 48, fontSize: 14.7, }}>{post.posttext}</Text>
 
              </View>
 
            </View>
          </View>
         
        </View>
        
        
        
        {/* Body */}
        
        <View style={{}} >
   
      <View >
      {post.image1 && (
        <ScrollView horizontal={true} style={{ marginLeft: 52, marginTop: 2 }}>
          <View style={{ justifyContent: 'center', }}>


            {post.image1 && (
              <>
                <Image
                  style={{
                    width: dimensions.width - 65,
                    height: dimensions.width - 65,
                    marginLeft: 2,
                    marginRight: 8,
                    borderRadius: 10,
                    marginBottom: 6,

                  }}
                  source={{ uri: post.image1 }}
                />
                <View style={{ position: 'absolute', right: 14, top: 14, justifyContent: 'center' }}>
                  <Text style={{ backgroundColor: 'black', borderRadius: 6, color: 'white', paddingLeft: 5, paddingRight: 5, fontSize: 12 }}>{post.image2 ? "1/2" : "1/1"}</Text>
                </View>
              </>
            )}
          </View>
          <View style={{ justifyContent: 'center' }}>
            {post.image2 && (
              <>
                <Image
                  style={{
                    width: dimensions.width - 65,
                    height: dimensions.width - 65,
                
                    marginRight: 8,
                    borderRadius: 10,
                    marginBottom: 6
                  }}
                  source={{ uri: post.image2 }}
                />
                <View style={{ position: 'absolute', zIndex: 100, right: 16, top: 14 }}>
                  <Text style={{ backgroundColor: 'black', borderRadius: 6, color: 'white', paddingLeft: 5, paddingRight: 5, fontSize: 12 }}>2/2</Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}
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




     {/* <View>
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




      <Text style={{ color: '#A9A9A9' }}>Someone found this helpfull </Text>


       <Text style={{left: -18, color: '#A9A9A9' }}>Bill Gates and others likes it.</Text> 


      <Text style={{ left: -32, color: '#A9A9A9', fontSize: 12 }}>You and others liked this</Text>
     </View> */}

    </View>

    
  </View>
  <View style={{ borderLeftWidth: 1.4, borderLeftColor: '#C2C2C2', left: 25, top: 60, zIndex: 4, position: 'absolute', zIndex: 1 }}>
          <Text style={{ color: 'white', height: 4000 }}></Text>
        </View>
 {/* ReplySection */}
<View>
  
</View>

 

      
      </View>
      <View style={{ borderRadius: 6, backgroundColor: 'white', padding: 2 }}>
        <View
          style={{ justifyContent: "space-between", flexDirection: "row", margin: 4, }}
        >
          <View style={{ flexDirection: "row", marginTop: 3 }}>
            <View style={{ zIndex: 2 }}>
              <Image
                style={{ width: 42, height: 42, borderRadius: 50, }}
                source={{ uri: tempdata2.profile ? tempdata2.profile : 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }}
              />
            </View>
            <View>
              <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <Text
                style={{ marginLeft: 5, fontWeight: "bold", fontSize: 14 }}
                onPress={() =>
                  navigation.navigate("UserProfile", {
                    userdata: tempdata2
                  })
                }
              >
                {tempdata2.username}
              </Text>
              <Text style={{fontSize: 12.5 }}>{tempdata2.lowerUsername} • 1d</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: 'center' }}>

             
      <Text style={{marginLeft: 5,marginRight: 48, fontSize: 14.7, }}>{post2.posttext}</Text>
 
              </View>
              
            </View>
          </View>
         
        </View>
        
        
        
        {/* Body */}
        
        <View style={{}} >
   
    <View >
      {post2.image1 && (
        <ScrollView horizontal={true} style={{ marginLeft: 52, marginTop: 2 }}>
          <View style={{ justifyContent: 'center', }}>


            {post2.image1 && (
              <>
                <Image
                  style={{
                    width: dimensions.width - 65,
                    height: dimensions.width - 65,
                    marginLeft: 2,
                    marginRight: 8,
                    borderRadius: 10,
                    marginBottom: 6,

                  }}
                  source={{ uri: post2.image1 }}
                />
                {post2.replyingTo != "none" &&(
                  <View style={{ position: 'absolute', right: 14, top: 14, justifyContent: 'center' }}>
                  <Text style={{ backgroundColor: 'black', borderRadius: 6, color: 'white', paddingLeft: 5, paddingRight: 5, fontSize: 12 }}>{post.image2 ? "1/2" : "1/1"}</Text>
                </View>
                )}
              </>
            )}
          </View>
          <View style={{ justifyContent: 'center' }}>
            {post2.image2 && (
              <>
                <Image
                  style={{
                    width: dimensions.width - 65,
                    height: dimensions.width - 65,
                
                    marginRight: 8,
                    borderRadius: 10,
                    marginBottom: 6
                  }}
                  source={{ uri: post2.image2 }}
                />
                <View style={{ position: 'absolute', zIndex: 100, right: 16, top: 14 }}>
                  <Text style={{ backgroundColor: 'black', borderRadius: 6, color: 'white', paddingLeft: 5, paddingRight: 5, fontSize: 12 }}>2/2</Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}
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




     {/* <View>
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




      <Text style={{ color: '#A9A9A9' }}>Someone found this helpfull </Text>


       <Text style={{left: -18, color: '#A9A9A9' }}>Bill Gates and others likes it.</Text> 


      <Text style={{ left: -32, color: '#A9A9A9', fontSize: 12 }}>You and others liked this</Text>
     </View> */}

    </View>


  </View>

<View>
  
</View>


 


 <View style={{
    marginLeft: 44, marginRight: 10, flexDirection: 'row', alignItems: 'center'
  }}>
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4,
        justifyContent: 'space-between'
      }}
    >
      {like == true || post.likes.includes(user.email) ? (
        <Pressable
          style={{ flexDirection: "row", padding: 2, alignItems: 'center' }}
          onPress={() => handleUnlike(post)}
        >
          <Ionicons name="heart" size={20} color="#FF3939" />
          <Text style={{ fontSize: 14, marginRight: 6, color: '#595959', marginLeft: 4 }}>
            {post.likes.length}
          </Text>
        </Pressable>

      ) : (
        <Pressable
          style={{ flexDirection: "row", padding: 2, alignItems: 'center' }}
          onPress={() => handleLike()}
        >
          <Ionicons name="heart-outline" size={20} color="#919191" />

          <Text style={{ fontSize: 14, marginRight: 6, color: '#595959', marginLeft: 4 }}>
            {post.likes.length}
          </Text>
        </Pressable>

      )}


      <TouchableOpacity
        style={{ flexDirection: "row", marginLeft: 6, padding: 2, borderRadius: 4, alignItems: 'center', }}
        onPress={() =>
          ReplyModal == true ? setReplyModal(false) : setReplyModal(true)
        }
      >
        <Ionicons name="chatbubble-outline" size={19} color="#919191" />
        <Text style={{ marginLeft: 4, fontSize: 14, color: "#595959", marginRight: 4 }}>0</Text>
      </TouchableOpacity>



      <TouchableOpacity
        style={{ flexDirection: "row", marginLeft: 6, padding: 2, borderRadius: 4, alignItems: 'center', }}
        onPress={() =>
          ReplyModal == true ? setReplyModal(false) : setReplyModal(true)
        }
      >
        <Ionicons name="md-swap-horizontal" size={20} color="#919191" />
        <Text style={{ marginLeft: 4, fontSize: 14, color: "#595959", marginRight: 4 }}>0</Text>
      </TouchableOpacity>



    <TouchableOpacity
      style={{ flexDirection: "row", marginLeft: 6, borderRadius: 2, alignItems: 'center' }}
      onPress={() =>
        comments == true ? setComments(false) : setComments(true)
      }
    >
      <Ionicons name="share-social-outline" size={20} color="#919191" />

    </TouchableOpacity>

    </View>


  </View>

        {/* <View style={{ borderLeftWidth: 1.4, borderLeftColor: '#C2C2C2', left: 25, top: 15, zIndex: 4, position: 'absolute', zIndex: 1 }}>
          <Text style={{ color: 'white', height: 4000 }}></Text>
        </View> */}
      </View>
      </View>
    </View>
  );
};




  
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "#00000aaa",


  },
  modalView: {
    height: 500,
    backgroundColor: "white",
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  modalText: {

  },

});

export default memo(Reply)
