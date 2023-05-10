import React, {SyntheticEvent, useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
const abilities = require('../../data/abilities.json');

interface Props {
  searchTerm: string;
  clickHandler: Function;
}

const List: React.FC<Props> = ({searchTerm, clickHandler}) => {
  const [searchMatch, setSearchMatch] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const reg = new RegExp(searchTerm, 'i');
      const matches = abilities.filter(ability => {
        return ability.name.match(reg);
      });
      setSearchMatch(matches);
    }
  }, [searchTerm]);
  return searchTerm ? (
    <>
      <Text>Search above, click result for detail view</Text>
      <FlatList
        data={searchMatch}
        renderItem={({item}) => (
          <Text id={item.name} onPress={() => clickHandler(item, abilities)}>
            {item.name}
          </Text>
        )}
      />
    </>
  ) : (
    <>
      <Text>Search above, click result for detail view</Text>
      <FlatList
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
    </>
  );
};
export default List;
