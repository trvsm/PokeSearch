import React, {useEffect, useState} from 'react';
import {Button, VirtualizedList, Text} from 'react-native';
import abilities from '../../data/abilities.json';

interface Props {
  searchTerm: string;
  clickHandler: Function;
}

const Dictionary: React.FC<Props> = ({searchTerm, clickHandler}) => {
  const [searchMatch, setSearchMatch] = useState<string[]>([]);
  const [showList, setShowList] = useState<'none' | 'flex'>('none');

  const listToggle = () => {
    showList === 'none' ? setShowList('flex') : setShowList('none');
  };

  useEffect(() => {
    if (searchTerm) {
      const reg = new RegExp(searchTerm, 'i');
      //TODO: refactor switch into function & debounce
      const matches = abilities.filter(ability => {
        let match;
        switch (ability.effect_entries.length) {
          case 2:
            match = ability.effect_entries[1].effect.match(reg);
            break;
          case 1:
            match = ability.effect_entries[0].effect.match(reg);
            break;

          default:
            break;
        }
        return match;
      });
      setSearchMatch(matches);
    }
  }, [searchTerm]);
  return (
    <>
      <Text>Results for search by effect:</Text>
      <Button
        color="#666"
        onPress={listToggle}
        title="Toggle 'by effect' results &#709;"
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
                id={item.name}
                onPress={() => {
                  clickHandler(item, abilities);
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
export default Dictionary;
