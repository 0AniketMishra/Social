import { View, Text,TouchableOpacity,Image, } from 'react-native'
import React,{memo} from 'react'
import { useNavigation } from '@react-navigation/native'

const UserList = ({data}) => {
    

    return (
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
                <View style={{  borderRadius: 50,width: 54, height: 54,alignItems: 'center', justifyContent: 'center' , borderWidth: 0.5, borderColor: 'grey'  }}>
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 50, }}
                    source={{ uri: !user.profile ? "https://th.bing.com/th/id/OIP.gtYDGnVfcJH3fx8d7M0AfwAAAA?pid=ImgDet&rs=1" : user.profile }}
                  />
                </View>
              </View>
              <View style={{ marginLeft: 8, flex: 1 }}>
                <View style={{ flexDirection: 'row', marginLeft: 4, alignItems: 'center' }}>
                  <Text style={{ fontSize: 14.2, fontWeight: '700' }}>{user.username}</Text>
                  <Image style={{ width: 16, height: 16, marginLeft: 2, }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png' }} />

                </View>

                <View style={{ marginLeft: 4 }}>

                  <Text style={{ fontSize: 12, color: 'black', }}>{user.lowerUsername}</Text>
                  <Text style={{ fontSize: 13, color: 'black', marginTop: 2, }}>{user.descritption}</Text>

                </View>


              </View>
              <View style={{}}>
                <TouchableOpacity style={{ backgroundColor: '#1A1A1A', width: 70, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 18, }}>
                  <Text style={{ padding: 6, fontWeight: 'bold', color: 'white' }} >Follow</Text>

                </TouchableOpacity>
                {/* <MaterialCommunityIcons name="account-check-outline" size={24} color="white" />
         */}
              </View>
            </TouchableOpacity>
          ))}

</View>
  )
}

export default memo(UserList)