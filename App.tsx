import React, {useState} from 'react';
import ThemeContext, {theme} from './theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
//google admob
import mobileAds from 'react-native-google-mobile-ads';
// reaact navigation for routing
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Component & Page Imports
import Abilities from './pages/abilities';
import Home from './pages/home';

// mobileAds()
//   .initialize()
//   .then(adapterStatuses => {
//     console.log(adapterStatuses);
//   });
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeContext.Provider value={{theme}}>
        {/* <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          /> */}
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Abilities" component={Abilities} />
          </Stack.Navigator>
          {/* <Text>Debug: ctrl+m or shake to show debug</Text> */}
      </NavigationContainer>
        {/* </SafeAreaView> */}
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
