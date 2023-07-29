import { View, Text,TouchableOpacity,Image, } from 'react-native'
import React,{memo} from 'react'
import { useNavigation } from '@react-navigation/native'

const UserList = ({data}) => {
    const navigation = useNavigation()
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