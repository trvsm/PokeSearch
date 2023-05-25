import React, {useContext, useState} from 'react';
import {
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
} from 'react-native';
//theme styling
import ThemeContext from '../../theme';

//will take props to tell it what pokemon in this slot
const Slot = (): JSX.Element => {
  const {theme} = useContext(ThemeContext);

  return(
    <>
    {pokemon?<Text>Selected Pokemon</Text> :<Text>Choose a Pokemon to fill this slot!</Text>}
    </>
  )
};
