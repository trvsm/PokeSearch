import React from 'react';
import {Text, View} from 'react-native';
//theme styling

interface Props {
  member: {} | null;
  feat: [];
}

//will take props to tell it what pokemon in this slot
const MonDet: React.FC<Props> = ({member, feat}) => {
  return feat[0].ability ? (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Text>Abilities: </Text>
      {member.abilities.map(abil => {
        return (
          <Text key={abil.slot}>{`${abil.slot}: ${abil.is_hidden ? 'hidden ability: ' : ''}${
            abil.ability.name
          }  `}</Text>
        );
      })}
    </View>
  ) : feat[0].stat ? (
    <>
      <Text>Stats: </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        {member.stats.map(s => {
          return (
            <Text
              key={
                s.stat.name
              }>{`${s.stat.name}: ${s.base_stat}, `}</Text>
          );
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
      {member.types.map(t => {
        return (
          <Text key={t.type.name}>{`${t.slot}: ${t.type.name} `}</Text>
        );
      })}
    </View>
  );
};

export default MonDet;
