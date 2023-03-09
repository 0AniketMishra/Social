import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, TextInput,  } from 'react-native'
import React,{useState, useEffect} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const SearchScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
 
  const [data, setData] = useState([])
   const [keyword, setKeyword] = useState("")

   const fun = () => {
   console.log("called!")
      fetch('https://social-backend-three.vercel.app/finduser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ keyword: keyword })
      })
          .then(res => res.json())
          .then(data => {
            
              if (data.message == 'User Found') {
                  setData(data.user)
                  console.log(data.user)
              }
          })
          .catch(err => {
              setData([])
          })
   }


  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: 'white',}}>
      
<TouchableOpacity onPress={() => navigation.goBack()}>
<Entypo name="chevron-left" size={24} color="black" />
  </TouchableOpacity>      
        <TextInput placeholder="Search Beyond Possibilities...." style={{ flex: 1, marginRight: 6, marginLeft: 6 }} 
        onChangeText={(text) => {
          setKeyword(text)
      }}
      />
<TouchableOpacity onPress={fun}>
<Entypo name="magnifying-glass" size={24} color="black" /> 
  </TouchableOpacity>       
      </View>
      <View style={{}}>
         


      {data.map((user,index) => (
        <TouchableOpacity  key={user._id} style={{ padding: 8, borderRadius: 9, marginLeft: 4, marginRight: 4, flexDirection: 'row', alignItems: 'center',backgroundColor: 'white', marginTop: 6  }} 
        onPress={() =>
          navigation.navigate("UserProfile", {
            username: user.username,
            lowerUsername: user.lowerUsername,
            profile: user.profile,
            email: user.email,
            about: ''
          })
        }
        >
        <View>
          <Image
            style={{ width: 42, height: 42, borderRadius: 50, }}
            source={{ uri: user.profile == "" ? "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" : user.profile }}
          /> 
        </View>
        <View style={{ marginLeft: 8, flex: 1 }}>  
 <View style={{flexDirection: 'row', marginLeft: 4, alignItems: 'center'}}>
 <Text style={{ fontSize: 14.2, fontWeight: '700' }}>{user.username}</Text>
 <Image style={{ width: 16, height: 16, marginLeft: 2,  }} source={{ uri: 'https://th.bing.com/th/id/OIP.Qq0Ov_N_BiXjTfZA3EriXQHaHa?pid=ImgDet&rs=1' }} />

 </View>
        
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
              <Text  style={{ fontSize: 12, color: 'grey', }}>{user.descritption}</Text>
             
            </View>
          
          
        </View>
        <View style={{}}>
        {/* <Text style={{padding: 6, fontWeight: 'bold',color: 'white', paddingLeft: 6, paddingRight: 6 }} >Follow</Text> */}
        <MaterialCommunityIcons name="account-check-outline" size={24} color="black" />
        </View>
      </TouchableOpacity>
))}



      </View>
    </View>
  )
}

export default SearchScreen