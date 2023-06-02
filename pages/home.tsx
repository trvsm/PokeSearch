import React from 'react';
import {Button, View} from 'react-native';
import Header from '../components/header/header';
import Separator from '../components/separator/separator';

function Home({navigation}): JSX.Element {
  return (
    <>
      <View
        style={{
          height: '100%',
        }}>
        <Header title="" />
        <Separator />
        <Button
          color="#444"
          title="Search Abilities"
          onPress={() => navigation.navigate('Abilities')}
        />
        <Separator />
        <Button
          color="#444"
          title="Search Moves"
          onPress={() => navigation.navigate('Moves')}
        />
        <Separator />
        <Button
          color="#444"
          title="Team Builder"
          onPress={() => navigation.navigate('TeamBuilder')}
        />
      </View>
    </>
  );
}

export default Home;
