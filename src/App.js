import React, {useState} from 'react';
import { StatusBar } from 'react-native';
import styled,{ ThemeProvider } from 'styled-components/native';
import { theme, dark } from './theme';
import Navigation from './navigations';
import { UserProvider, ProgressProvider } from './contexts';
import {View, StyleSheet, Switch} from 'react-native';
import { Profile } from './screens';
import Toggle from "react-native-toggle-element";

const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.background};
  align-items: flex-end;
  padding: 5px;

`;

/*const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: "#d4e6ff",
    padding: 10,
  },
  
});*/
const App = () => {

  const [isDark, setIsDark] = useState(false);
  const _toggleSwitch = () => setIsDark(!isDark);
  return (
    <ThemeProvider theme={isDark ? dark : theme}>
      
        <ProgressProvider>
          <UserProvider>
            <StatusBar
              backgroundColor={theme.background}
              barStyle="dark-content"
            />
              <Container>
              <Toggle onPress={(val) => setIsDark(val)}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbButton = {{borderWidth : 0, width: 16, height:16, 
                  inActiveBackgroundColor:"#ffffff", activeBackgroundColor: "#ffffff",}}
                ios_backgroundColor={theme.background}
                onValueChange={_toggleSwitch}
                backgroundColor={theme.background}
                value={isDark}
                trackBar={{
                  activeBackgroundColor: theme.main,
                  inActiveBackgroundColor: "#919191",
                  
                  width: 30,
                  height: 16,
                  radius: 25,
                }}/>
                  
              </Container>
            <Navigation />
          </UserProvider>
        </ProgressProvider>
    </ThemeProvider>
  );
};

export default App;
