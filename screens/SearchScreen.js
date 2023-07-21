import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, TextInput,Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [currentTab, setCurrentTab] = useState("Accounts")

  const [data, setData] = useState([])
  const [keyword, setKeyword] = useState("")

  const fun = () => {

    fetch('https://social-backend-three.vercel.app/finduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ keyword: keyword })
    })
      .then(res => res.json())
      .then(data => {
        setData(data.user)
      })

  }
  //   axios.post('https://social-backend-three.vercel.app/finduser', {keyword: keyword})
  //   .then(function (response) {
  //     setData(response.data.user);
  //   })}

  useEffect(() => {
    fun()
  }, [keyword])
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
     <View style={{}}>
     <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 12,  margin: 6 }}>

<TouchableOpacity onPress={() => navigation.goBack()}>
<Ionicons name="arrow-back" size={26} color="black" />
</TouchableOpacity>

<TextInput placeholder="  Search" style={{ flex: 1,backgroundColor: '#F5F5F5',padding: 4, borderRadius: 12,margin: 3 }}
  onChangeText={(text) => {
    setKeyword(text)

  }}
  placeholderTextColor='grey'
  
/>
<TouchableOpacity onPress={fun}>
  <Entypo name="magnifying-glass" size={24} color="black" />
</TouchableOpacity>


</View>
<View style={{ flexDirection: 'row', padding: 4, }}>
  {currentTab == "Trending" ? (
    <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: "black" }} onPress={() => setCurrentTab('Trending')}>
      <Text style={{ margin: 4,  }}>Trending</Text>
    </Pressable>
  ) : (
    <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Posts')}>
      <Text style={{ margin: 4, }}>Trending</Text>
    </Pressable>
  )}
  {currentTab == "Accounts" ? (
    <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
      <Text style={{ margin: 4}}>Accounts</Text>
    </Pressable>
  ) : (
    <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Accounts')}>
      <Text style={{ margin: 4,  }}>Accounts</Text>
    </Pressable>
  )}
  {currentTab == "Media" ? (
    <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
      <Text style={{ margin: 4, }}>Media</Text>
    </Pressable>
  ) : (
    <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Media')}>
      <Text style={{ margin: 4, }}>Media</Text>
    </Pressable>
  )}
  {currentTab == "News" ? (
    <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "black" }}>
      <Text style={{ margin: 4, }}>News</Text>
    </Pressable>
  ) : (
    <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('News')}>
      <Text style={{ margin: 4,  }}>News</Text>
    </Pressable>
  )}
</View>
     </View>
      
      
      <View style={{ marginTop: 8 }}>
        {/* <Text style={{color: 'white', fontWeight: 'bold' , fontSize: 18, margin: 4, marginLeft: 6, marginRight: 6}}>People You May Know : </Text> */}
        <ScrollView>
          {currentTab == "Accounts" ? (
<View >
{data.map((user, index) => (
            <TouchableOpacity key={user._id} style={{ padding: 10, borderRadius: 9, margin: 4, flexDirection: 'row', alignItems: 'center', marginLeft: 6, marginRight: 6,  }}
              onPress={() =>
                navigation.navigate("UserProfile", {
                userdata: user
                })
              }
            >
              <View>
                <View style={{  borderRadius: 50 }}>
                  <Image
                    style={{ width: 52, height: 52, borderRadius: 50, paddingLeft: 4 }}
                    source={{ uri: !user.profile ? "https://instagram.fdel25-4.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fdel25-4.fna.fbcdn.net&_nc_cat=1&_nc_ohc=cuAabRYd6LoAX8H5kjd&edm=ACkRbIEBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfBUzEKoZ2tokTKSxPKzB4J8VBWQZQc_X3Bxqe4Fq_B3zw&oe=64A1864F&_nc_sid=cd0945" : user.profile }}
                  />
                </View>
              </View>
              <View style={{ marginLeft: 8, flex: 1 }}>
                <View style={{ flexDirection: 'row', marginLeft: 4, alignItems: 'center' }}>
                  <Text style={{ fontSize: 14.2, fontWeight: '700' }}>{user.username}</Text>
                  <Image style={{ width: 16, height: 16, marginLeft: 2, }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png' }} />

                </View>

                <View style={{ marginLeft: 4 }}>

                  <Text style={{ fontSize: 12, color: 'grey', }}>{user.lowerUsername}</Text>
                  <Text style={{ fontSize: 13, color: 'black', marginTop: 2, }}>{user.descritption}</Text>

                </View>


              </View>
              <View style={{}}>
                <TouchableOpacity style={{ backgroundColor: '#1A1A1A', width: 70, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 18, }}>
                  <Text style={{ padding: 6, fontWeight: 'bold', paddingLeft: 6, paddingRight: 6, color: 'white' }} >Follow</Text>

                </TouchableOpacity>
                {/* <MaterialCommunityIcons name="account-check-outline" size={24} color="white" />
         */}
              </View>
            </TouchableOpacity>
          ))}

</View>
          ) : currentTab == "Trending" ? (
            <View style={{ alignItems: 'center', justifyContent: 'center',height: 200 }}>
              
              <Text style={{color: 'white', fontWeight: 'bold', }}>Nothing To Show At The Moment..</Text>
              
            </View>
          ) : (
            <View></View>
          )}
        </ScrollView>



      </View>
    </View>
  )
}

export default SearchScreen