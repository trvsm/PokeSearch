import React, {useContext, useState} from 'react';
import {
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
//theme styling
import ThemeContext from '../theme';
//component imports
import Header from '../components/header/header';
import MoveDictionary from '../components/moveDictionary/moveDictionary';
import Search from '../components/search/search';
//helper function imports
import currentVal from '../helpers/textInputVal';
import activeItem from '../helpers/activeItem';

const Moves = (): JSX.Element => {
  //state for search term
  const [moveSearch, setMoveSearch] = useState<string>('');
  //state for active move
  const [activeMove, setActiveMove] = useState();
  const {theme} = useContext(ThemeContext);

  const changeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setMoveSearch(currentVal(e));
  };
  const clickHandler = (item, arr) => {
    setActiveMove(activeItem(item, arr));
  };

  return (
    <>
      <Header title="Moves" />
      <View
        style={{
          backgroundColor: theme.colors.primary,
        }}>
        {activeMove ? (
          <>
            <Text>
              {`${activeMove.name}: ${
                activeMove.effect_entries
                  ? activeMove.effect_entries[0].effect
                  : 'Effect details coming soon'
              }`}
            </Text>
            <Text>
              Pokemon that can learn:
              {activeMove.learned_by_pokemon.map(pok => {
                return `\n${pok.name}`;
              })}
            </Text>
          </>
        ) : (
          <Text>Move Details</Text>
        )}
        <Search
          placeholder="🔍 Search for a move by effect"
          changeHandler={changeHandler}
        />
        <MoveDictionary searchTerm={moveSearch} clickHandler={clickHandler} />
      </View>
    </>
  );
};

export default Moves;
