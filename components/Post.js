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
import React, { useEffect, useState, useCallback,memo,useMemo } from "react";
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
import UserList from "./UserList";
import Comments from "./Comments";


const Post = ({ post }) => {
  
  const navigation = useNavigation();
  const { user } = useAuth();
  const [text, onChangeText] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [postInfo, setPostInfo] = useState([])
  const [ReplyModal, setReplyModal] = useState(false);
  const [tempdata, setTempData] = useState([])
  const [replydata, setReplyData] = useState([])
  const [replypost, setReplyPost] = useState([])
  const[like,setLike] = useState(false)
  const [fullModal, setFullModal] = useState(false)

const [comments, setComments] = useState([{"__v": 9, "_id": "63fa2d54052a50f801519fe7", "allmessages": [], "descritption": "This is one of the first dummy replies of this application so I am trying to make it long so that I could notice the real space.", "email": "b@gmail.com", "followers": ["a@gmail.com"], "following": [], "lowerUsername": "@b@gmail.com", "profile": "", "username": "b@gmail.com"}, {"__v": 33, "_id": "63fadb9905efa40ae4f93ec6", "allmessages": [], "descritption": "Hey there, I Am Using Social!", "email": "a@gmail.com", "followers": ["b@gmail.com", "b@gmail.com", "b@gmail.com", "a@gmail.com"], "following": ["a@gmail.com"], "lowerUsername": "@aniketmishra", "profile": "https://lovingnewyork.es/wp-content/uploads/2016/02/empire-state-mirador-161004120416001-1600x1067.jpeg", "username": "Aniket Mishra. "}, {"__v": 9, "_id": "64188540e4fa2d2524b9f76f", "allmessages": [], "descritption": "Off course, the comments should not look identical. ", "email": "nsahani198@gmail.com", "followers": ["b@gmail.com"], "following": [], "lowerUsername": "@omprakash", "profile": "", "username": "Om Prakash"}, {"__v": 18, "_id": "6434ba718f2585818d4891de", "allmessages": [], "descritption": "Hey there, I Am Using Social!", "email": "demo@gmail.com", "followers": [], "following": [], "lowerUsername": "@demoaccount", "password": "$2b$08$XO9ORhRPojEC.tm5G7aGX.cb0bCfnriisKbv6UpvyX7v9VHTe8d8O", "profile": "", "username": "Demo Account"}, {"__v": 6, "_id": "644ccae5bc08676636a5297d", "allmessages": [], "descritption": "I am expert at reusing", "email": "new@gmail.com", "followers": [], "following": [], "lowerUsername": "@donaldjtrump.", "password": "$2b$08$2LwV1itUIIJ7EWL2UzRLre1DVC16kf.N1o6J08uxbz73sd56bY/BG", "profile": "", "username": "Donald J Trump."}])

// console.log(post)

  const route = useRoute()
  const dimensions = Dimensions.get('window');

  const handleLike = useCallback(() => {
    setLike(true)
    post.likes.push(user.email)
    axios.post('https://social-backend-three.vercel.app/likepost', {email: user.email, postid: post._id})
  });


  const handleUnlike = useCallback(() => {
    setLike(false)
    post.likes.pop(user.email)
    axios.post('https://social-backend-three.vercel.app/unlikepost', {email: user.email, postid: post._id})
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

    
  },[])


  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={ReplyModal}

      >
        <View style={styles.centeredView} >
          <View style={{  height: fullModal ? 500 : 622, backgroundColor: "white", borderTopRightRadius: 14,borderTopLeftRadius: 14,}}> 
          <View>
        <View style={{  backgroundColor: 'white',  borderTopLeftRadius: 14,borderTopRightRadius: 14,}}> 
      <View style={{justifyContent: 'center', alignItems: 'center',marginTop: 6}}>
      <TouchableOpacity style={{borderWidth: 2,borderRadius:21,width: 60,}} onPress={() => fullModal ? setFullModal(false) : setFullModal(true)}>
        </TouchableOpacity>
      </View>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',padding:16}} onPress={() => setReplyModal(false)}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{fontSize: 17, marginLeft: 3, fontWeight: 'bold'}}>Comments</Text>
        </TouchableOpacity>

        <ScrollView>
          <Comments data={comments}/>
        </ScrollView>
        </View>
     </View>
          </View>
        </View>
      </Modal>
      <View style={{ borderRadius: 6, backgroundColor: 'white', padding: 2, }}>
        {/* background #F9FFFF was used previously */}

        <PostHeader post={post} navigation={navigation} userInfo={userInfo} tempdata={tempdata} />
        <PostBody post={post} route={route} comments={comments}  navigation={navigation} user={user} dimensions={dimensions} tempdata={tempdata} replydata={replydata} replypost={replypost}/>
        <PostFooter
          post={post}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          user={user}
          ReplyModal={ReplyModal}
          setReplyModal={setReplyModal}
          text={text}
          onChangeText={onChangeText}
          setPostInfo={setPostInfo}
          like={like}
          comments={comments}
        />

      </View>
    </View>
  );
};
const PostHeader = ({ post, navigation, follower, following, userInfo, tempdata, replypost}) => (
  <View
    style={{ justifyContent: "space-between", flexDirection: "row", margin: 5 }}
  >
    <View style={{ flexDirection: "row", alignItems: "center",  }}>
      <View style={{width: 50,marginLeft: 4 , height: 50, borderWidth: 0.5,borderColor: 'grey', alignItems: 'center',justifyContent: 'center',borderRadius: 44}}>
        <Image
          style={{ width: 44, height: 44, borderRadius: 50, }}
          source={{ uri: tempdata.profile ? tempdata.profile : 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }}
        />
      </View>
      <View>
        <Text
          style={{marginLeft: 6, fontWeight: "bold", fontSize: 14.5 }}
          onPress={() =>
            navigation.navigate("UserProfile", {
            userdata: tempdata
            })
          }
        >
          {tempdata.username}
        </Text>
        <View style={{ flexDirection: "row", alignItems: 'center' }}> 

          <Text style={{ marginLeft: 6, fontSize: 13 }}>{tempdata.lowerUsername} • 2 hours ago</Text>
        </View>
      </View>
    </View>
    <View style={{flexDirection:'row',alignItems: 'center' }}>
      {/* <Text style={{ marginRight: 10, fontSize: 22, color: 'grey' }}>...</Text> */}
      {/* <Text style={{marginRight: 6, fontSize: 12}}>Following</Text>  */}

      <Feather name="more-horizontal" size={20} color="grey" />
    </View>
  </View>
);
const PostBody = ({ post,navigation, user, dimensions, tempdata,replydata,replypost, route,comments }) => (





  <View >

    <TouchableOpacity style={{
      marginLeft: 15,
      marginRight: 15,
      marginTop: 6,

    }}
      
    >
      <Text style={{ fontSize: 15, fontWeight: "400", marginBottom: 8, fontFamily: 'Roboto' }}>{post.posttext} </Text>
    </TouchableOpacity>
    
    <View >
      <ScrollView horizontal={true} >
        <View style={{ justifyContent: 'center' }}>
          {post.image1 && (
            <>
              <Image
                style={{
                  width: dimensions.width - 20,
                  height: dimensions.width - 20,
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 10,
                  marginBottom: 6
                }}
                source={{ uri: post.image1 }}
              />
              <View style={{ position: 'absolute', zIndex: 100, right: 14, top: 8, justifyContent: 'center' }}>
                <Text style={{ backgroundColor: 'black', borderRadius: 8, color: 'white', paddingLeft: 6, paddingRight: 6, fontSize: 12,fontWeight: 'bold', alignItems: 'center',paddingBottom: 1 }}>{post.image2 ? "1/2" : "1/1"}</Text>
              </View>
            </>
          )}
        </View>
        <View style={{ justifyContent: 'center' }}>
          {post.image2 && (
            <>
              <Image
                style={{
                  width: dimensions.width - 20,
                  height: dimensions.width - 20,
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 10,
                  marginBottom: 6
                }}
                source={{ uri: post.image2 }}
              />
              <View style={{ position: 'absolute', zIndex: 100, right: 16, top: 8 }}>
                <Text style={{  backgroundColor: 'black', borderRadius: 8, color: 'white', paddingLeft: 6, paddingRight: 6, fontSize: 12,fontWeight: 'bold', alignItems: 'center',paddingBottom: 1  }}>2/2</Text>
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
        flexDirection: "row",
        alignItems: 'center'
      }}
    >




      {/* <Image
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
      /> */}




      {/* <Text style={{ color: '#A9A9A9' }}>Someone found this helpfull </Text> */}


      {/* {/* <Text style={{left: -18, color: '#A9A9A9' }}>{post.likes_by_users.slice(-2)[0].username}  and others likes it.</Text> */}


      {/* <Text style={{ left: -32, color: '#A9A9A9', fontSize: 12 }}>You and others liked this</Text> */}

    </View>


  </View>


);
const PostFooter = ({
  post,
  handleLike,
  user,
  comments,
  setComments,
  text,
  onChangeText,
  userInfo,
  setReplyModal,
  ReplyModal,
  handleUnlike, 
  like, 
  setLike,

}) => (
  <View style={{
    marginLeft: 10, marginRight: 10, marginBottom: 4, flexDirection: 'row', alignItems: 'center'
  }}>
    <View
      style={{
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 4,
        width: "auto",
        justifyContent: 'center',

      }}
    >
     

{like == true || post.likes.includes(user.email) ? (
   <Pressable
   style={{ flexDirection: "row", padding: 4, alignItems: 'center' }}
   onPress={() => handleUnlike(post)}
 >
  <Ionicons name="heart" size={21} color="#FF3939" />
  <Text style={{ fontSize: 14, marginRight: 6, color: '#595959', marginLeft: 4 }}>
          {post.likes.length} Likes
        </Text>
      </Pressable>
 
) : (
  <Pressable
  style={{ flexDirection: "row", padding: 4, alignItems: 'center' }}
  onPress={() => handleLike()}
>
<Ionicons name="heart-outline" size={21} color="#595959" />

 <Text style={{ fontSize: 14, marginRight: 6, color: '#595959', marginLeft: 4 }}>
         {post.likes.length} likes
       </Text>
     </Pressable>

)}
       

      <TouchableOpacity
        style={{ flexDirection: "row", marginLeft: 6, padding: 4, borderRadius: 4, alignItems: 'center', }}
        onPress={() =>
          ReplyModal == true ? setReplyModal(false) : setReplyModal(true)
        }
      >
        <Ionicons name="chatbubble-outline" size={21} color="#595959" />
        <Text style={{ marginLeft: 4, fontSize: 14, color: "#595959", marginRight: 4 }}>{!comments ? 0 : comments?.length} comments</Text>
      </TouchableOpacity>

    </View>
    <Text style={{ flex: 1 }}></Text>

    <TouchableOpacity
      style={{ flexDirection: "row", marginLeft: 6, padding: 4, borderRadius: 4, alignItems: 'center' }}
      onPress={() =>
        comments == true ? setComments(false) : setComments(true)
      }
    >
      <Ionicons name="share-social-outline" size={21} color="#595959" />

    </TouchableOpacity>



  </View>
);
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "#00000aaa",
    

  },
  modalView: {
  
  
 
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

export default memo(Post)
