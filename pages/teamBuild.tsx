import React, {useContext, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
  Alert,
  Modal,
  View,
  Text,
  Button,
} from 'react-native';
//theme styling
import ThemeContext from '../theme';
//component imports
import Header from '../components/header/header';
import PokDictionary from '../components/pokDictionary/pokDictionary';
import Search from '../components/search/search';
import Slot from '../components/slot/slot';
//helper function imports
import currentVal from '../helpers/textInputVal';
import activeItem from '../helpers/activeItem';
import MonDetail from '../components/monDetail/monDetail';

const slots = [1, 2, 3, 4, 5, 6];

const TeamBuilder = (): JSX.Element => {
  //state for team move TODO: move to app level, create context or pass listeners
  const [team, setTeam] = useState<Object[]>([]);
  //state for search term by pokemon name
  const [pokSearch, setPokSearch] = useState<string>('');
  //state to handle modal display
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // state for current pokemon to edit
  const [editMember, setEditMember] = useState<number>();
  const {theme} = useContext(ThemeContext);

  //presshandler to open modal populated with pressed pokemon
  const pressHandler = itemNum => {
    //currently gets number of team pressed, use this to open modal for corresponding
    setEditMember(itemNum);
    setModalOpen(!modalOpen);
  };
  const changeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPokSearch(currentVal(e));
  };
  const clickHandler = (item, arr) => {
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
      <Modal
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(!modalOpen);
        }}>
        {editMember ? (
          <View
            style={{
              backgroundColor: theme.colors.primary,
            }}>
            <Text>{team[editMember].name}</Text>
            <MonDetail
              teamMember={team[editMember]}
              feature={team[editMember].abilities}
            />
              <MonDetail
                teamMember={team[editMember]}
                feature={team[editMember].stats}
              />
            <MonDetail
              teamMember={team[editMember]}
              feature={team[editMember].types}
            />
            {/* TODO: add fields for ability, nature & moves, show stats & types */}
            <Button
              title="Close"
              onPress={() => {
                setModalOpen(!modalOpen);
              }}
            />
          </View>
        ) : (
          ''
        )}
      </Modal>
      <ScrollView
        style={{
          backgroundColor: theme.colors.primary,
        }}>
        {/* six slots */}
        {slots.map(slot => {
          return team[slot] ? (
            <Slot
              key={slot}
              pokemon={team[slot]}
              number={slot}
              pressHandler={pressHandler}
            />
          ) : (
            <Slot
              key={slot}
              pokemon={null}
              number={slot}
              pressHandler={pressHandler}
            />
          );
        })}
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
