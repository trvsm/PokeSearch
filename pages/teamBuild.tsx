import React, {useContext, useState} from 'react';
import {
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
  Alert,
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
  const [team, setTeam] = useState<Object[]>([]);
  //state for search term by pokemon name
  const [pokSearch, setPokSearch] = useState<string>('');
  const {theme} = useContext(ThemeContext);

  const changeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPokSearch(currentVal(e));
  };
  const clickHandler = (item, arr) => {
    //TODO: update so this spreads active item into team
    if (team.length < 6) {
      setTeam([...team, activeItem(item, arr)]);
    } else if (team.length === 6) {
      Alert.alert(
        'Team Full',
        'You already have six Pokemon on your team, no room for more',
        [{text: 'OK'}],
      );
    }
  };

  return (
    <>
      <Header title="Team Builder" />
      <ScrollView
        style={{
          backgroundColor: theme.colors.primary,
        }}>
      {team.length ? (
        team.map(member => {
          return <Header title={member.name} />;
        })
      ) : (
        <Text>Add team members to display</Text>
      )}
      {/* six slots */}
      {/* search function by pokemon name */}
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
