import React, {useEffect, useState} from 'react';
import {Button, VirtualizedList, Text} from 'react-native';
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
      {searchMatch.length ? (
        <VirtualizedList
          style={{
            display: showList,
            padding: 10,
          }}
          getItem={(searchMatch, i) => searchMatch[i]}
          getItemCount={searchMatch => searchMatch.length}
          data={searchMatch}
          renderItem={({item}) => {
            return (
              <Text
                id={item.name}
                onPress={() => clickHandler(item, abilities)}>
                {item.name}
              </Text>
            );
          }}
        />
      ) : (
        <VirtualizedList
          style={{
            display: showList,
            padding: 10,
          }}
          data={abilities}
          getItem={(abilities, i) => abilities[i]}
          getItemCount={abilities => abilities.length}
          renderItem={({item}) => {
            return (
              <Text
                id={item.name}
                onPress={() => {
                  clickHandler(item, abilities);
                }}>
                {item.name}
              </Text>
            );
          }}
        />
      )}
    </>
  );
};
export default List;
