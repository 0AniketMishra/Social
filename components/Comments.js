import { View, Text,TouchableOpacity,Image, } from 'react-native'
import React,{memo} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

const Comments = ({data}) => {
  return (
    <View >
    {data.map((user, index) => (
                <TouchableOpacity key={user._id} style={{ paddingHorizontal: 8, borderRadius: 9, margin: 4, flexDirection: 'row',  marginLeft: 6, marginRight: 6,  }}
                 
                >
                  <View>
                    <View style={{  borderRadius: 50,width: 44, height: 44,alignItems: 'center', justifyContent: 'center' , borderWidth: 0.5, borderColor: 'grey'  }}>
                      <Image
                        style={{ width: 40, height: 40, borderRadius: 50, }}
                        source={{ uri: !user.profile ? "https://th.bing.com/th/id/OIP.gtYDGnVfcJH3fx8d7M0AfwAAAA?pid=ImgDet&rs=1" : user.profile }}
                      />
                    </View>
                  </View>
                  <View style={{ marginLeft: 4, flex: 1 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 4, alignItems: 'center' }}>
                      <Text style={{ fontSize: 14.2, fontWeight: '700' }}>{user.lowerUsername}</Text>
                      <Image style={{ width: 16, height: 16, marginLeft: 2, }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png' }} />
                      <Text style={{ fontSize: 12, }}> • 2h</Text>
<Text style={{flex:1}}></Text>
<Text style={{}}>•••</Text>

                    </View>
    
                    <View style={{ marginLeft: 4 }}>
                      <Text style={{ fontSize: 13, color: 'black', marginTop: 2, }}>{user.descritption}</Text>
                      <View style={{flexDirection: 'row',alignItems: 'center',marginTop: 5}}>
 <View style={{flexDirection: "row",alignItems:'center',justifyContent: 'center'}}>
 <Ionicons name="heart-outline" size={19} color="grey" />
<Text style={{color: 'grey',fontSize: 12}}>1 Like   •   </Text>
<Feather name="repeat" size={15} color="grey" />


 </View>
                      </View>
                    </View>
    
    
                  </View>
                  <View style={{}}>
                   
                    {/* <MaterialCommunityIcons name="account-check-outline" size={24} color="white" />
             */}
                  </View>
                </TouchableOpacity>
              ))}
    
    </View>
  )
}

export default Comments