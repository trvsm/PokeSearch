import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  FlatList,
} from 'react-native';
//theme styling
import ThemeContext from '../theme';
//component imports
import Dictionary from '../components/dictionary/dictionary';
import Header from '../components/header/header';
import List from '../components/list/list';
import Search from '../components/search/search';
//helper function imports
import currentVal from '../helpers/textInputVal';
import activeItem from '../helpers/activeItem';
import Separator from '../components/separator/separator';

const Abilities = (): JSX.Element => {
  const [abName, setAbName] = useState<string>('');
  const [activeAbility, setActiveAbility] = useState();
  const {theme} = useContext(ThemeContext);

  const changeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setAbName(currentVal(e));
  };
  const clickHandler = (item, arr) => {
    setActiveAbility(activeItem(item, arr));
  };
  return (
    <View style={{}}>
      <Header title="Abilities" />
      <View
        style={{
          backgroundColor: theme.colors.primary,
          minHeight: '90%',
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
        }}>
        <View style={{padding: 8, maxHeight: '28%'}}>
          {activeAbility ? (
            <>
              <Text
                style={{
                  color: theme.colors.background,
                }}>{`${activeAbility.name}: ${
                activeAbility.effect_entries
                  ? activeAbility.effect_entries[0]?.language.name === 'en'
                    ? activeAbility.effect_entries[0].effect
                    : activeAbility.effect_entries[1].effect
                  : 'Effect details coming soon'
              }`}</Text>
              <Separator />
              <Text>Pokemon with this ability:</Text>
              <FlatList
                data={activeAbility.pokemon}
                renderItem={({item}) => {
                  return (
                    <Text>{`${item.pokemon.name} ${
                      item.is_hidden ? '(hidden ability)' : ''
                    }`}</Text>
                  );
                }}
              />
            </>
          ) : (
            <Text>Ability Details</Text>
          )}
        </View>
        <Search
          placeholder="&#10067; Search for an ability by name or effect"
          changeHandler={changeHandler}
        />
        <Separator />
        <View
          style={{
            padding: 8,
            maxHeight: '40%',
          }}>
          <List searchTerm={abName} clickHandler={clickHandler} />
        </View>
        <View style={{padding: 8}}>
          <Dictionary searchTerm={abName} clickHandler={clickHandler} />
        </View>
      </View>
    </View>
  );
};

export default Abilities;
