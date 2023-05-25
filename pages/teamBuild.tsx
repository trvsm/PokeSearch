import React, {useContext, useState} from 'react';
import {
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
} from 'react-native';
//theme styling
import ThemeContext from '../theme';
//component imports
import Header from '../components/header/header';
import Search from '../components/search/search';
//helper function imports
import currentVal from '../helpers/textInputVal';
import activeItem from '../helpers/activeItem';
import PokDictionary from '../components/pokDictionary/pokDictionary';

const TeamBuilder = (): JSX.Element => {
  //state for team move TODO: move to app level, create context or pass listeners
  const [team, setTeam] = useState({});
  //state for search term by pokemon name
  const [pokSearch, setPokSearch] = useState<string>('');
  const {theme} = useContext(ThemeContext);

  const changeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPokSearch(currentVal(e));
  };
  const clickHandler = (item, arr) => {
    //TODO: update so this spreads active item into team
    setTeam(activeItem(item, arr));
  };

  return (
    <>
      <Header title="Team Builder" />
      <Header
        title={Object.keys(team).length ? team.name : 'Display team member'}
      />
      {/* six slots */}
      {/* search function by pokemon name */}
      <ScrollView
        style={{
          backgroundColor: theme.colors.primary,
        }}>
        <Search
          placeholder="Search for a Pokemon by name"
          changeHandler={changeHandler}
        />
        <PokDictionary searchTerm={pokSearch} clickHandler={clickHandler} />
      </ScrollView>
    </>
  );
};

export default TeamBuilder;
