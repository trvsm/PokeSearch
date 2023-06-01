import React, {useContext, useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
  Modal,
  View,
  Text,
  Button,
} from 'react-native';
// Async Storage for persisting team
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const slots = [0, 1, 2, 3, 4, 5];

const storeTeam = async team => {
  try {
    const teamJson = JSON.stringify(team);
    //to add to team do I need setItem or merge?
    await AsyncStorage.setItem('team', teamJson);
  } catch (e) {
    console.log(e);
  }
};

const TeamBuilder = (): JSX.Element => {
  // TODO: allow team member delete
  //state for team move TODO: move to app level, create context or pass listeners
  const [team, setTeam] = useState<object[]>([]);
  //state for search term by pokemon name
  const [pokSearch, setPokSearch] = useState<string>('');
  //state to handle modal display
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // state for current pokemon to edit
  const [editMember, setEditMember] = useState<Object>();
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const checkPrev = async () => {
      try {
        const value = await AsyncStorage.getItem('team');
        value && setTeam(JSON.parse(value));
      } catch (e) {
        console.log(e);
      }
    };
    checkPrev();
  }, []);

  //presshandler to open modal populated with pressed pokemon
  const pressHandler = (itemNum: number) => {
    //change: access the particular team member here & set that member to state.  could make it easier to edit moves!
    setEditMember(team[itemNum]);
    setModalOpen(!modalOpen);
  };
  const changeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPokSearch(currentVal(e));
  };
  const clickHandler = async (item, arr) => {
    if (team.length < 6) {
      setTeam([...team, activeItem(item, arr)]);
      await storeTeam(team);
    } else if (team.length === 6) {
      Alert.alert(
        'Team Full',
        'You already have six Pokemon on your team, no room for more',
        [{text: 'OK'}],
      );
    }
  };
  const moveHandler = (item, num: number) => {
    editMember[`move_${num}`] = item;
    setEditMember({...editMember});
  };

  const removeHandler = pokemon => {
    const smallerTeam = team.filter(member => {
      return member.name !== pokemon.name;
    });
    setTeam(smallerTeam)
    storeTeam(smallerTeam)
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
            <Text>{editMember.name}</Text>
            <MonDet member={editMember} feat={editMember.abilities} />
            <MonDet member={editMember} feat={editMember.stats} />
            <MonDet member={editMember} feat={editMember.types} />
            {/* TODO: add field for nature*/}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              {[1, 2, 3, 4].map(n => {
                return (
                  <MoveSlot
                    moveHandler={moveHandler}
                    member={editMember}
                    key={n}
                    num={n}
                  />
                );
              })}
            </View>
            <Button
              title="Close"
              onPress={() => {
                setModalOpen(!modalOpen);
                //find team member where name matches, overwrite with editmember
                const updated = team.findIndex(
                  element => element.name === editMember.name,
                );
                team[updated] = editMember;
                setTeam([...team]);
                storeTeam(team);
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
              number={slot + 1}
              pressHandler={pressHandler}
              removeHandler={removeHandler}
            />
          ) : (
            <Slot
              key={slot}
              pokemon={null}
              number={slot + 1}
              pressHandler={pressHandler}
              removeHandler={removeHandler}
            />
          );
        })}
        {/* search function by pokemon name */}
        <Search
          placeholder="🔍 Search for a Pokemon by name"
          changeHandler={changeHandler}
        />
        <PokDictionary searchTerm={pokSearch} clickHandler={clickHandler} />
      </View>
    </>
  );
};

export default TeamBuilder;
