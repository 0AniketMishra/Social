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
const [replies, setReplies] = useState(null)

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
        setReplyData(data.savedUser)
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
        setReplyPost(data.post) 
        

    })
    fetch('https://social-backend-three.vercel.app/getreplies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify({
      _id: post._id 
    })
  })
    .then(res => res.json())
    .then(async data => {
        setReplies(data.post)
    })

      }
  },[])

useEffect(() => {
  fetch('https://social-backend-three.vercel.app/postdata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: post._id
    })
  })
    .then(res => res.json())
    .then(async data => {
        let post = data
    })
})

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={ReplyModal}

      >
        <View style={styles.centeredView} >
          <View style={styles.modalView}>
          <View>
        <View style={{ padding: 8, backgroundColor: 'white'}}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setReplyModal(false)}>
        < Entypo name="chevron-left" size={24} color="black" />
        <Text style={{fontSize: 17, marginLeft: 3, fontWeight: 'bold'}}>Replies</Text>
        </TouchableOpacity>
        </View>
     </View>
          </View>
        </View>
      </Modal>
      <View style={{ borderRadius: 6, backgroundColor: 'white', padding: 2, borderBottomWidth: 0.5, borderWidthColor: 'grey' }}>
        {/* background #F9FFFF was used previously */}

        <PostHeader post={post} navigation={navigation} userInfo={userInfo} tempdata={tempdata} />
        <PostBody post={post} route={route} replies={replies}  navigation={navigation} user={user} dimensions={dimensions} tempdata={tempdata} replydata={replydata} replypost={replypost}/>
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
          replies={replies}
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
const PostBody = ({ post,navigation, user, dimensions, tempdata,replydata,replypost, route,replies }) => (





  <View >

    <TouchableOpacity style={{
      marginLeft: 15,
      marginRight: 15,
      marginTop: 6,

    }}
      onPress={() => navigation.navigate("UserPost", {
      post: post,
      tempdata: tempdata, 

   

      })}
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
                <Text style={{ backgroundColor: 'black', borderRadius: 6, color: 'white', paddingLeft: 5, paddingRight: 5, fontSize: 12 }}>2/2</Text>
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
  replies
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
         {post.likes.length} Likes
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
        <Text style={{ marginLeft: 4, fontSize: 14, color: "#595959", marginRight: 4 }}>{!replies ? 0 : replies?.length} Replies</Text>
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

export default memo(Post)
