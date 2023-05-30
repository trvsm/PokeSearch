import React from 'react';
import {Text, View} from 'react-native';
//theme styling

interface Props {
  teamMember: {} | null;
  feature: [];
}

//will take props to tell it what pokemon in this slot
const MonDetail: React.FC<Props> = ({teamMember, feature}) => {
  return feature[0].ability ? (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Text>Abilities: </Text>
      {teamMember.abilities.map(abil => {
        return (
          <Text>{`${abil.slot}: ${abil.is_hidden ? 'hidden ability: ' : ''}${
            abil.ability.name
          }  `}</Text>
        );
      })}
    </View>
  ) : feature[0].stat ? (
    <>
      <Text>Stats: </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        {teamMember.stats.map(s => {
          return <Text>{`${s.stat.name}: ${s.base_stat}, `}</Text>;
        })}
      </View>
    </>
  ) : (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Text>Types: </Text>
      {teamMember.types.map(t => {
        return <Text>{`${t.slot}: ${t.type.name} `}</Text>;
      })}
    </View>
  );
};

export default MonDetail;
