import React, {useEffect, useState} from 'react';
import {Button, VirtualizedList, Text} from 'react-native';
const mons = require('../../data/mons.json');

interface Props {
  searchTerm: string;
  clickHandler: Function;
}

const PokDictionary: React.FC<Props> = ({searchTerm, clickHandler}) => {
  const [searchMatch, setSearchMatch] = useState<string[]>([]);
  const [showList, setShowList] = useState<'none' | 'flex'>('none');

  const listToggle = () => {
    showList === 'none' ? setShowList('flex') : setShowList('none');
  };

  useEffect(() => {
    if (searchTerm) {
      const reg = new RegExp(searchTerm, 'i');
      //TODO: debounce
      const matches = mons.filter(mon => {
        let match = '';
        match = mon.name.match(reg);
        if (match) {
          return match;
        }
      });
      setSearchMatch(matches);
    }
  }, [searchTerm]);

  return (
    <>
      <Text>Results for search by Pokemon name:</Text>
      <Button
        color="#666"
        onPress={listToggle}
        title="Show/hide results &#709;"
      />
      {searchMatch.length ? (
        <VirtualizedList
          style={{
            display: showList,
            padding: 10,
          }}
          data={searchMatch}
          getItem={(item, i) => item[i]}
          getItemCount={item => item.length}
          renderItem={({item}) => {
            return (
              <Text
              key={item.name}
                id={item.name}
                onPress={() => {
                  clickHandler(item, mons);
                }}>
                {item.name}
              </Text>
            );
          }}
        />
      ) : (
        <Text>No results to display</Text>
      )}
    </>
  );
};

export default PokDictionary;
