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
        color="#666"
        onPress={listToggle}
        title="Show/Hide Ability List &#709;"
      />
      {searchMatch.length ? (
        <VirtualizedList
          style={{
            display: showList,
            padding: 10,
          }}
          getItem={(item, i) => item[i]}
          getItemCount={item => item.length}
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
          getItem={(item, i) => item[i]}
          getItemCount={item => item.length}
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
