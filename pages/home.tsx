import {Button, Text, View} from 'react-native';

function Home({navigation}): JSX.Element {
  return (
    <>
      <View>
        <Text>Welcome to PokeSearch!</Text>
        <Button
          title="Search Abilities"
          onPress={() => navigation.navigate('Abilities')}
        />
      </View>
    </>
  );
}

export default Home;
