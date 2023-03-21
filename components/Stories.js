import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Touchable } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
const Stories = () => {
    const [data, setData] = useState([
        {"id": "1","Name": "Elon Musk", "lowerUsername" : '@elonmusk', "profile": "https://www.howitworksdaily.com/wp-content/uploads/2016/04/elonmusk.jpg" },
        {"id": "2", "Name": "Jeff Bezos", "lowerUsername" : '@jeffbezos', "profile": "https://compote.slate.com/images/59210cce-a982-468f-9979-d456b2909f0a.jpg" },
        {"id": "3","Name": "Gautam Adani", "lowerUsername" : '@gautamadani', "profile": "https://specials-images.forbesimg.com/imageserve/6345ac3b833e07cd89aa314c/416x416.jpg?background=000000&cropX1=473&cropX2=2286&cropY1=95&cropY2=1910" },
        {"id": "4","Name": "Bernad Arnault", "lowerUsername" : '@bernardarnault', "profile": "https://specials-images.forbesimg.com/imageserve/5dc05518ca425400079c659f/416x416.jpg?background=000000&cropX1=0&cropX2=4000&cropY1=1209&cropY2=5212" },
        {"id": "5","Name": "Bill Gates", "lowerUsername" : '@billgates', "profile": "https://specials-images.forbesimg.com/imageserve/62d599ede3ff49f348f9b9b4/416x416.jpg?background=000000&cropX1=155&cropX2=976&cropY1=340&cropY2=1161" },
        {"id": "6","Name": "Warren Buffett", "lowerUsername" : '@warrenbuffett', "profile": "https://specials-images.forbesimg.com/imageserve/5babb7f1a7ea4342a948b79a/416x416.jpg?background=000000&cropX1=748&cropX2=3075&cropY1=1753&cropY2=4082" },
        
    ])
  return (
     <View style={{ backgroundColor: 'white',}}>
         <View style={{ marginBottom: 12,marginTop: 10, marginLeft: 5,  }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity>
          <View style={{marginLeft: 4, marginRight: 4,  width: 54, height: 54, backgroundColor: '#D4E4F4', borderRadius: 50, alignItems: "center", justifyContent: "center", alignItems: 'center' }}>
           <Ionicons name="add" size={30} color="#0078E9" style={{marginLeft:2}}/>
            </View>
          </TouchableOpacity>
            
            {data?.map(info => {
                 return(
                   <TouchableOpacity key={info.id}>
                     <View style={{ alignItems: 'center', }} >
                    <View style={{ marginLeft: 6, marginRight: 6 }}>
                        <View style={{ width: 54, height: 54, backgroundColor: 'white', borderRadius: 50, alignItems: "center", justifyContent: "center", }}>
                            <Image style={styles.story} source={{ uri: info?.profile }} />
  
                        </View>
                        {/* <Text>{info.lowerUsername.length > 6 ?  info.lowerUsername.slice(0, 6) + '...' : "Elon Musk".toLowerCase()}</Text> */}
                    </View>
                </View>
                   </TouchableOpacity>
                 )
            })}
             


          </ScrollView>

      </View>
     </View>
  )
}

const styles = StyleSheet.create({
    story: {
        width: 55,
        height: 55,
        borderRadius: 50,
      
    },

});

export default Stories