import React from 'react';
import {Text, View} from 'react-native';
//theme styling

interface Props {
  pokemon: {} | null;
  number: Number;
  pressHandler: Function;
  removeHandler: Function
}

//will take props to tell it what pokemon in this slot
const Slot: React.FC<Props> = ({pokemon, number, pressHandler, removeHandler}) => {
  return (
    <>
      {pokemon ? (<View style={{
      flexDirection: 'row'
      }}>

        <Text
          onPress={() => {
            pressHandler(number);
          }}>
          {`${number}`}: Selected Pokemon: {pokemon.name}
        </Text>
        <Text onPress={()=>{
          removeHandler(pokemon)
        }}>&#10060;</Text>
            </View>
      ) : (
        <Text>{`${number}`}: Choose a Pokemon!</Text>
      )}
    </>
  );
};

export default Slot;
