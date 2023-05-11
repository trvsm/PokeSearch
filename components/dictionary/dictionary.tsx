import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text} from 'react-native';
const abilities = require('../../data/abilities.json');

interface Props {
  searchTerm: string;
  clickHandler: Function;
}

const Dictionary: React.FC<Props> = ({searchTerm, clickHandler}) => {
  const [searchMatch, setSearchMatch] = useState<string[]>([]);
  const [showList, setShowList] = useState('none');

  const listToggle = () => {
    showList === 'none' ? setShowList('flex') : setShowList('none');
  };

  useEffect(() => {
    if (searchTerm) {
      const reg = new RegExp(searchTerm, 'i');
      console.log(reg);
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
      <Button onPress={listToggle} title="Toggle 'by effect' results &#709;"></Button>
      {searchMatch.length ? (
        <FlatList
          data={searchMatch}
          renderItem={({item}) => (
            <Text id={item.name} onPress={() => clickHandler(item, abilities)}>
              {item.name}
            </Text>
          )}
        />
      ): <Text>No matches for that search</Text>}
    </>
  );
};
export default Dictionary;