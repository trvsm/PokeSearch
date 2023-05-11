import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text} from 'react-native';
const abilities = require('../../data/abilities.json');

interface Props {
  searchTerm: string;
  clickHandler: Function;
}

const List: React.FC<Props> = ({searchTerm, clickHandler}) => {
  const [searchMatch, setSearchMatch] = useState<string[]>([]);
  const [showList, setShowList] = useState('none');

  const listToggle = () => {
    showList === 'none' ? setShowList('flex') : setShowList('none');
  };

  useEffect(() => {
    if (searchTerm) {
      const reg = new RegExp(`^${searchTerm}`, 'i');
      console.log(reg);
      const matches = abilities.filter(ability => {
        return ability.name.match(reg);
      });
      setSearchMatch(matches);
    }
  }, [searchTerm]);
  return (
    <>
      <Text>Search above, click result for detail view</Text>
      <Button
        onPress={listToggle}
        title="Show/Hide Ability List &#709;"></Button>
      {searchTerm ? (
        <FlatList
          style={{
            display: showList,
          }}
          data={searchMatch}
          renderItem={({item}) => (
            <Text id={item.name} onPress={() => clickHandler(item, abilities)}>
              {item.name}
            </Text>
          )}
        />
      ) : (
        <FlatList
          style={{
            display: showList,
          }}
          data={abilities}
          renderItem={({item}) => (
            <Text
              id={item.name}
              onPress={() => {
                clickHandler(item, abilities);
              }}>
              {item.name}
            </Text>
          )}
        />
      )}
    </>
  );
};
export default List;
