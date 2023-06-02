import React, {useContext, useState} from 'react';
import {
  FlatList,
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
import Separator from '../components/separator/separator';
//TODO: next style moves
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
          minHeight: '90%',
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
            <Separator/>
            <View style={{maxHeight: "40%"}}>
            <Text>
              Pokemon that can learn:
              {/* {activeMove.learned_by_pokemon.map(pok => {
                return `\n${pok.name}`;
              })} */}
            </Text>
            <FlatList
              data={activeMove.learned_by_pokemon}
              renderItem={({item}) => {
                return <Text>{item.name}</Text>;
              }}
              />
              </View>
          </>
        ) : (
          <Text>Move Details</Text>
        )}
        <Search
          placeholder="🔍 Search for a move by effect"
          changeHandler={changeHandler}
        />
        <View style={{maxHeight: "40%"}}>
        <MoveDictionary searchTerm={moveSearch} clickHandler={clickHandler} />
        </View>
      </View>
    </>
  );
};

export default Moves;
