import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import Separator from '../separator/separator';
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
      //TODO: debounce
      const matches = moves.filter(move => {
        let match = '';
        match = move.effect_entries[0]?.effect.match(reg);
        if (match) {
          return match;
        }
      });
      setSearchMatch(matches);
    }
  }, [searchTerm]);
  return (
    <View>
      <Text>Results for search by effect:</Text>
      <Button
        color="#666"
        onPress={listToggle}
        title="Toggle 'by effect' results &#709;"
      />
      {searchMatch.length ? (
        <FlatList
          style={{
            display: showList,
            padding: 10,
            
          }}
          data={searchMatch}
          // getItem={(item, i) => item[i]}
          // getItemCount={item => item.length}
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
      <Separator/>
    </View>
  );
};
export default MoveDictionary;
