import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Signin, Signup } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const Auth = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle:{
          fontWeight: 'bold',

        },
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: '#d4e6ff',},
        headerTintColor: theme.text,
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="Sign In"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up"
        component={Signup}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
