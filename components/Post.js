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
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
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

const Post = ({ post }) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth();
  const route = useRoute()
  const [comments, setComments] = useState(false);
  const [text, onChangeText] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [postInfo, setPostInfo] = useState([])
  const [ReplyModal, setReplyModal] = useState(false);
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [tempdata, setTempData] = useState([])

  const dimensions = Dimensions.get('window');

  const handleLike = (post) => {
    post.likes.push(user.email)
    axios.post('https://social-backend-three.vercel.app/likepost', {email: user.email, postid: post._id})
   
   
  };

  const handleUnlike = (post) => {
    post.likes?.pop()
    axios.post('https://social-backend-three.vercel.app/unlikepost', {email: user.email, postid: post._id})
  

 };

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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="arrow-back" size={24} color="black" onPress={() => setReplyModal(false)} />
              <Text style={{ fontSize: 15, marginLeft: 4 }}>Compose A Reply</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginleft: 10 }}>
              <Text style={{ fontSize: 13, marginLeft: 4 }}>Replying to</Text>
              <Text style={{ color: '#7EA8F7', fontSize: 13 }}> {postInfo.lowerUsername}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18, backgroundColor: '#E9E9E9', padding: 5, borderRadius: 8 }}>
              <Feather name="smile" size={20} color="black" />
              <TextInput placeholder="Say Something...." style={{ flex: 1, marginLeft: 8, marginRight: 8 }} value={text} onChangeText={onChangeText} />
              <Feather name="send" size={20} color="black" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ marginTop: 4, marginBottom: 4, borderRadius: 6, backgroundColor: 'white', padding: 2 }}>
        {/* background #F9FFFF was used previously */}

        <PostHeader post={post} navigation={navigation} userInfo={userInfo} tempdata={tempdata} />
        <PostBody post={post} navigation={navigation} user={user} dimensions={dimensions} tempdata={tempdata} />
        <PostFooter
          post={post}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          user={user}
          comments={comments}
          setComments={setComments}
          text={text}
          onChangeText={onChangeText}
          setReplyModal={setReplyModal}
          setPostInfo={setPostInfo}

        />

      </View>
    </View>
  );
};
const PostHeader = ({ post, navigation, follower, following, userInfo, tempdata }) => (
  <View
    style={{ justifyContent: "space-between", flexDirection: "row", margin: 5 }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
      <View>
        <Image
          style={{ width: 44, height: 44, borderRadius: 50, marginLeft: 4 }}
          source={{ uri: tempdata.profile ? tempdata.profile : 'https://pbs.twimg.com/profile_banners/44196397/1576183471/600x200' }}
        />
      </View>
      <View>
        <Text
          style={{ marginLeft: 10, fontWeight: "bold", fontSize: 14 }}
          onPress={() =>
            navigation.navigate("UserProfile", {
              username: tempdata.username,
              lowerUsername: tempdata.lowerUsername,
              profile: tempdata.profile,
              email: post.email,
              about: '',
              _id: tempdata._id
            })
          }
        >
          {tempdata.username}
        </Text>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>

          <Text style={{ marginLeft: 10, fontSize: 12 }}>{tempdata.lowerUsername} | 2 hours ago</Text>
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
const PostBody = ({ post, navigation, user, dimensions, tempdata }) => (





  <View >

    <TouchableOpacity style={{
      marginLeft: 15,
      marginRight: 15,
      marginTop: 6,

    }}
      onPress={() => navigation.navigate("UserPost", {
        username: tempdata.username,
        lowerUsername: tempdata.lowerUsername,
        profile: tempdata.profilePicture,
        posttext: post.posttext,
        image1: post.image1,
        image2: post.image2

      })}
    >
      <Text style={{ fontSize: 15, fontWeight: "400", marginBottom: 10, fontFamily: 'Roboto' }}>{post.posttext} </Text>
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
        paddingBottom: 6,
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
  setPostInfo,
  handleUnlike
}) => (
  <View style={{
    marginLeft: 10, marginRight: 10, marginBottom: 4, borderTopColor: '#E9E9E9',
    borderTopWidth: 1, flexDirection: 'row', alignItems: 'center'
  }}>
    <View
      style={{
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginTop: 6,
        marginBottom: 4,
        width: "auto",
        justifyContent: 'center',

      }}
    >
     

{post.likes.includes(user.email) ? (
   <TouchableOpacity
   style={{ flexDirection: "row", padding: 4, alignItems: 'center' }}
   onPress={() => handleUnlike(post)}
 >
  <Ionicons name="heart" size={21} color="#FF3939" />
  <Text style={{ fontSize: 14, marginRight: 6, color: '#595959', marginLeft: 4 }}>
          {post.likes.length} Likes
        </Text>
      </TouchableOpacity>
 
) : (
  <TouchableOpacity
  style={{ flexDirection: "row", padding: 4, alignItems: 'center' }}
  onPress={() => handleLike(post)}
>
<Ionicons name="heart-outline" size={21} color="#919191" />

 <Text style={{ fontSize: 14, marginRight: 6, color: '#595959', marginLeft: 4 }}>
         {post.likes.length} Likes
       </Text>
     </TouchableOpacity>

)}
       

      <TouchableOpacity
        style={{ flexDirection: "row", marginLeft: 6, padding: 4, borderRadius: 4, alignItems: 'center', }}
        onPress={() =>
          comments == true ? setComments(false) : setComments(true)
        }
      >
        <Ionicons name="chatbubble-outline" size={21} color="#595959" />
        <Text style={{ marginLeft: 4, fontSize: 14, color: "#595959", marginRight: 4 }}>0 Comments</Text>
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
    justifyContent: 'center',
    backgroundColor: "#00000aaa",

  },
  modalView: {

    backgroundColor: "white",
    borderRadius: 2,
    padding: 10,
    borderRadius: 14,
    marginLeft: 10,
    marginRight: 10,
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

export default Post;
