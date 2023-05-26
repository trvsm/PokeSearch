import React, {useContext, useState} from 'react';
import {
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
} from 'react-native';
//theme styling
import ThemeContext from '../../theme';

interface Props {
  pokemon: {} | null;
  number: Number
}

//will take props to tell it what pokemon in this slot
const Slot: React.FC<Props> = ({pokemon, number}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <><Text>{number}:</Text>
      {pokemon ? (
        <Text>Selected Pokemon: {pokemon.name}</Text>
      ) : (
        <Text>Choose a Pokemon!</Text>
      )}
    </>
  );
};

export default Slot;
