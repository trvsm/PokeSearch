import React, {useState} from 'react';
import ThemeContext, {theme} from './theme';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Header from './components/header/header';
import Search from './components/search/search';
import List from './components/list/list';
import currentVal from './helpers/textInputVal';
import activeItem from './helpers/activeItem';
import Dictionary from './components/dictionary/dictionary';
import Abilities from './pages/abilities';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log(adapterStatuses);
  });
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [abName, setAbName] = useState<string>('');
  const [activeAbility, setActiveAbility] = useState();

  const changeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setAbName(currentVal(e));
  };
  const clickHandler = (item, arr) => {
    setActiveAbility(activeItem(item, arr));
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeContext.Provider value={{theme}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Abilities />
        <Text>Debug: ctrl+m or shake to show debug</Text>
      </SafeAreaView>
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
