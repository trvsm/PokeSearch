import React, {useState, useContext} from 'react';
import {
  Text,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import ThemeContext from '../theme';

import Header from '../components/header/header';
import Search from '../components/search/search';
import List from '../components/list/list';
import currentVal from '../helpers/textInputVal';
import activeItem from '../helpers/activeItem';
import Dictionary from '../components/dictionary/dictionary';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log(adapterStatuses);
  });

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
    <>
      <Header title="Abilities" />
      <BannerAd size={BannerAdSize.LEADERBOARD} unitId={TestIds.BANNER} />
      <ScrollView
        style={{
          //TODO: pass theme state to style
          backgroundColor: theme.colors.primary,
        }}>
        {activeAbility ? (
          <>
            <Text
              style={{
                color: theme.colors.primary,
              }}>{`${activeAbility.name}: ${
              activeAbility.effect_entries
                ? activeAbility.effect_entries[0]?.language.name === 'en'
                  ? activeAbility.effect_entries[0].effect
                  : activeAbility.effect_entries[1].effect
                : 'Effect details coming soon'
            }`}</Text>
            <Text>
              Pokemon with this ability:
              {activeAbility.pokemon.map(pok => {
                return `\n${pok.pokemon.name} ${
                  pok.is_hidden ? '(hidden ability)' : ''
                }`;
              })}
            </Text>
          </>
        ) : (
          <Text>Ability Details</Text>
        )}
        <Search
          placeholder="Search for an ability by name"
          changeHandler={changeHandler}
        />
        <List searchTerm={abName} clickHandler={clickHandler} />
        <Dictionary searchTerm={abName} clickHandler={clickHandler} />
      </ScrollView>
    </>
  );
};

export default Abilities;
