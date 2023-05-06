import React from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {TextInput} from 'react-native';
interface Props {
  changeHandler: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  placeholder:string
}

const Search: React.FC<Props> = ({changeHandler, placeholder}) => {
  return (
    <TextInput placeholder={placeholder} onChange={changeHandler} />
  );
};
export default Search;
