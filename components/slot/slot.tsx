import React from 'react';
import {Text} from 'react-native';
//theme styling

interface Props {
  pokemon: {} | null;
  number: Number;
  pressHandler: Function;
}

//will take props to tell it what pokemon in this slot
const Slot: React.FC<Props> = ({pokemon, number, pressHandler}) => {
  return (
    <>
      {pokemon ? (
        <Text
          onPress={() => {
            pressHandler(number);
          }}>
          {`${number}`}: Selected Pokemon: {pokemon.name}
        </Text>
      ) : (
        <Text>{`${number}`}: Choose a Pokemon!</Text>
      )}
    </>
  );
};

export default Slot;
