import React, {useContext, useState} from 'react';
import {
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
  Pressable,
} from 'react-native';
//theme styling
import ThemeContext from '../../theme';

interface Props {
  pokemon: {} | null;
  number: Number;
  pressHandler: Function;
}

//will take props to tell it what pokemon in this slot
const Slot: React.FC<Props> = ({pokemon, number, pressHandler}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <>
      {pokemon ? (
        <Text onPress={()=>{pressHandler(number)}}>
          {`${number}`}: Selected Pokemon: {pokemon.name}
        </Text>
      ) : (
        <Text>{`${number}`}: Choose a Pokemon!</Text>
      )}
    </>
  );
};

export default Slot;
