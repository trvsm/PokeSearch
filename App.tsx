import React, {useState} from 'react';
import ThemeContext, {theme} from './theme';
// google admob
import mobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
// react navigation for routing
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Component & Page Imports
import Abilities from './pages/abilities';
import Home from './pages/home';
import Moves from './pages/moves';
import TeamBuilder from './pages/teamBuild';
import { SafeAreaView } from 'react-native-safe-area-context';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log(adapterStatuses);
  });
function App(): JSX.Element {

  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <ThemeContext.Provider value={{theme}}>
      {/* <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          /> */}
      <BannerAd size={BannerAdSize.LEADERBOARD} unitId={TestIds.BANNER} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Abilities" component={Abilities} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Moves" component={Moves} />
          <Stack.Screen name="TeamBuilder" component={TeamBuilder} />
        </Stack.Navigator>
        {/* <Text>Debug: ctrl+m or shake to show debug</Text> */}
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </ThemeContext.Provider>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
