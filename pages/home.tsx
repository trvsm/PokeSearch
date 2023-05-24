import React from 'react';
import {Button, View} from 'react-native';
import Header from '../components/header/header';

function Home({navigation}): JSX.Element {
  return (
    <>
      <View>
        <Header title="" />
        <Button
          title="Search Abilities"
          onPress={() => navigation.navigate('Abilities')}
        />
        <Button
          title="Search Moves"
          onPress={() => navigation.navigate('Moves')}
        />
      </View>
    </>
  );
}

export default Home;
