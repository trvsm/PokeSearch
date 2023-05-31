import React, {useContext, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
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
import MonDet from '../components/monDetail/monDetail';
import PokDictionary from '../components/pokDictionary/pokDictionary';
import Search from '../components/search/search';
import Slot from '../components/slot/slot';
//helper function imports
import currentVal from '../helpers/textInputVal';
import activeItem from '../helpers/activeItem';
import MoveSlot from '../components/moveSlot/moveSlot';

const slots = [1, 2, 3, 4, 5, 6];

const TeamBuilder = (): JSX.Element => {
  // TODO: save team using async storage: https://react-native-async-storage.github.io/async-storage/docs/install/
  //state for team move TODO: move to app level, create context or pass listeners
  const [team, setTeam] = useState<object[]>([]);
  //state for search term by pokemon name
  const [pokSearch, setPokSearch] = useState<string>('');
  //state to handle modal display
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // state for current pokemon to edit
  const [editMember, setEditMember] = useState<Object>();
  const {theme} = useContext(ThemeContext);

  //presshandler to open modal populated with pressed pokemon
  const pressHandler = (itemNum: number) => {
    //currently gets number of team pressed, use this to open modal for corresponding

    //change: access the particular team member here & set that member to state.  could make it easier to edit moves!
    setEditMember(team[itemNum]);
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
              height: '100vh',
            }}>
            <Text>{editMember.name}</Text>
            <MonDet member={editMember} feat={editMember.abilities} />
            <MonDet member={editMember} feat={editMember.stats} />
            <MonDet member={editMember} feat={editMember.types} />
            {/* TODO: add fields for nature & moves*/}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              {[1, 2, 3, 4].map(n => {
                return <MoveSlot member={editMember} num={n} />;
              })}
            </View>
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
      <View
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
      </View>
    </>
  );
};

export default TeamBuilder;
