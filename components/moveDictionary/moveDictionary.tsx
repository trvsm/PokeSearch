import React, {useEffect, useState} from 'react';
import {Button, VirtualizedList, Text} from 'react-native';
const moves = require('../../data/moves.json');

interface Props {
  searchTerm: string;
  clickHandler: Function;
}

const MoveDictionary: React.FC<Props> = ({searchTerm, clickHandler}) => {
  const [searchMatch, setSearchMatch] = useState<string[]>([]);
  const [showList, setShowList] = useState('none');

  const listToggle = () => {
    showList === 'none' ? setShowList('flex') : setShowList('none');
  };

  useEffect(() => {
    if (searchTerm) {
      const reg = new RegExp(searchTerm, 'i');
      //TODO: refactor switch into function & debounce
      const matches = moves.filter(move => {
        let match = move.effect_entries[0].effect.match(reg);
        return match;
      });
      setSearchMatch(matches);
    }
  }, [searchTerm]);
  return (
    <>
      <Text>Results for search by effect:</Text>
      <Button onPress={listToggle} title="Toggle 'by effect' results &#709;" />
      {searchMatch.length ? (
        <VirtualizedList
          style={{
            display: showList,
            padding: 10,
          }}
          data={searchMatch}
          getItem={(ittem, i) => ittem[i]}
          getItemCount={ittem => ittem.length}
          renderItem={({item}) => {
            return (
              <Text
                id={item.name}
                onPress={() => {
                  clickHandler(item, moves);
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
export default MoveDictionary;
