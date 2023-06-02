import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';

import monMoves from '../../helpers/monMoves';
//theme styling

interface Props {
  member: {} | null;
  num: number;
  moveHandler: Function;
}

const MoveSlot: React.FC<Props> = ({member, num, moveHandler}) => {
  const moves = monMoves(member);

  return (
    <View>
      {/* each move view is headed with a button, onclick shows list
        list items each list available moves & on press sets the move at top  */}

      {member[`move_${num}`] ? (
        <Button color="#666" title={`${member[`move_${num}`]}`} />
      ) : (
        <Button color="#666" title={`Move ${num} \u02c5`} />
      )}
      <FlatList
        style={{
          height: '70%',
        }}
        //data: array from monmoves
        data={moves}
        //each item is simply the string name of move
        renderItem={({item}) => {
          return (
            <Text key={item} onPress={() => moveHandler(item, num)}>
              {item}
            </Text>
          );
        }}
      />
    </View>
  );
};

export default MoveSlot;
