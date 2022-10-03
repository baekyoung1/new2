import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native'; 

const Container = styled.SafeAreaView`
  flex:1;
  backgroundColor: ${({ theme }) => theme.memobackground};
  align-items: center;
  justify-content: flex-start;
  flexDirection: row;
  padding: 15px;
`;

const List =styled.View`
  backgroundColor: ${({ theme }) => theme.memobackground};

`;

export default function App() {

  const [writeMode, setWriteMode] = useState(false); 
  const [txt, setTxt] = useState(''); 

  const orimemo = [
    { 
      id:'1',
      memo:'New text'
      
    }
  ];

  const [memos, setMemos] = useState(orimemo); 
  const [idx, setIdx] = useState(2); 


  const addMemo = () =>{
    let a = {id:idx, memo:txt};
    setMemos(prev=>[...prev,a]);  
    setWriteMode(false); 

    setIdx(prev=>prev+1); 

  }

  const renderMemo = ({item}) =>{
    return(
        <Container View style={{padding:30, borderBottomColor:'#d4e6ff', borderBottomWidth:1,  flexDirection:'row'}}>
          <Text style={{marginRight:10,color:'#778bdd', }}>{item.id}</Text>
          <Text style={{color:'#778bdd',}}>{item.memo}</Text>
        </Container>
      
    );
  }


  if(writeMode){
    return (


          
          <Container SafeAreaView style={{flex:1,  }}>

          <View  style={{flex:1,   }}>        
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <TouchableOpacity style={{padding:15, }} onPress={()=>setWriteMode(false)}>
                <Text style={{fontSize:13,color:'#778bdd', }} >cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{padding:15, }}     onPress={()=>addMemo()} >
                <Text style={{fontSize:13,color:'#778bdd', }}>done</Text>
              </TouchableOpacity>

            </View>
            <View style={{flex:1, backgroundColor:'#fff', }}>
            <TextInput
                style={{  backgroundColor: '#ffffff',flex:1, padding:10,  }}
                onChangeText={text => setTxt(text)}
                multiline 
                
              />
            </View>

            <StatusBar style="auto" />
          </View>
          
          </Container>
    );
  }




  return (
    <List SafeAreaView style={{flex:1,  }}>
      
      <View style={{flex:1,  }}>

        <SafeAreaView style={{position:'absolute', right:20, bottom:20,zIndex:10,  }}>
          <View style={{          width:40, height:40, backgroundColor:'#778bdd', borderRadius:25,
                alignItems:'center', justifyContent:'center', 
            }}>          
            <TouchableOpacity onPress={()=>setWriteMode(true)}>       
              <Text style={{color:'white', fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      


      <View style={{flex:1, }}>
        <FlatList data={memos}  renderItem={renderMemo}   style={{flex:1}} />
      </View>

      </View>


      <StatusBar style="auto" />

      
    </List>

  );
}