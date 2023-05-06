import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';

interface Props {
  searchTerm: string;
}

const abilities: string[] = [
  'thick fat',
  'big pecks',
  'synchronise',
  'technician',
];
const List: React.FC<Props> = ({searchTerm}) => {
  const [searchMatch, setSearchMatch] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const reg = new RegExp(searchTerm, 'i');
      const matches = abilities.filter(ability => {
        return ability.match(reg);
      });
      setSearchMatch(matches);
    }
  }, [searchTerm]);
  return searchTerm ? (
    <FlatList data={searchMatch} renderItem={({item}) => <Text>{item}</Text>} />
  ) : (
    <Text>Search above to display results here.</Text>
  );
};
export default List;
