import React, { useState, useContext, useEffect } from 'react';
import styled,{ ThemeProvider, ThemeContext } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChannelList, Profile, } from '../screens';
import Todo from '../screens/Todo';
import Memo from '../screens/Memo';
import Timer from '../screens/Timer';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
//import styled from 'styled-components';


const TabIcon = ({ name, focused, color }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialCommunityIcons
      name={name}
      size={23}
      color={focused ? theme.tabBarActiveTintColor : theme.tabBarInactiveTintColor}
    />
  );
};

const Tab = createBottomTabNavigator();



const Home = ({ navigation, route }) => {
  
  useEffect(() => {
    const screenName = getFocusedRouteNameFromRoute(route) || 'StudyGroup';
    navigation.setOptions({
      headerTitle: screenName,
      
      headerRight: () =>
        screenName === 'StudyGroup' && (
          
          <MaterialCommunityIcons
            name="plus"
            color="#778bdd"
            size={26}
            style={{ margin: 10 }}
            onPress={() => navigation.navigate('GroupCreation')}
          />
        ),
    });
  });
  

  
  return (
    
    
    
      <Tab.Navigator
        screenOptions={{ 
          headerShown:false,
          tabBarStyle: {
            backgroundColor: '#d4e6ff',
            borderTopColor: '#d4e6ff',
            
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#778bdd', }}
        >
        <Tab.Screen
          name="Study"
          component={ChannelList}
          options={{
            tabBarIcon: props =>
              TabIcon({
                ...props,
                name: props.focused ? 'chat' : 'chat-outline',
                
              }),
          }}
        />
        
        <Tab.Screen
          name="Calendar"
          component={Profile}
          options={{
            tabBarIcon: props =>
              TabIcon({
                ...props,
                name: props.focused ? 'calendar' : 'calendar-outline',
                
              }),
          }}/>
        

        <Tab.Screen
          name="Timer"
          
          component={Timer}
          options={{
            headerShown:false,
            tabBarIcon: props =>
              TabIcon({
                ...props,
                name: props.focused ? 'timer' : 'timer-outline',
                
              }),
          }}/>
        

        <Tab.Screen
          name="Memo"
          component={Memo}
          options={{
            tabBarIcon: props =>
              TabIcon({
                ...props,
                name: props.focused ? 'note-text' : 'note-text-outline',
                
              }),
          }}
        />

        <Tab.Screen
          name="Todo List"
          component={Todo}
          options={{
            tabBarIcon: props =>
              TabIcon({
                ...props,
                name: props.focused ? 'check' : 'check-outline',
                
              }),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: props =>
              TabIcon({
                ...props,
                name: props.focused ? 'baby-face' : 'baby-face-outline',
                
              }),
          }}
        />
      </Tab.Navigator>
  );
};

export default Home;
