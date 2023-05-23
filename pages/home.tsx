import {Button, Text, View} from 'react-native';
import Header from '../components/header/header';

function Home({navigation}): JSX.Element {
  return (
    <>
      <View>
        <Header />
        <Button
          title="Search Abilities"
          onPress={() => navigation.navigate('Abilities')}
        />
      </View>
    </>
  );
}

export default Home;
