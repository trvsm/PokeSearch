import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';

import monMoves from '../../helpers/monMoves';
//theme styling

interface Props {
  member: {} | null;
  num: number;
}

//will take props to tell it what pokemon in this slot
const MoveSlot: React.FC<Props> = ({member, num}) => {
  const moves =monMoves(member)
  // console.log(moves)
  return (
    <View>
      {/* each move view is headed with a button, onclick shows list
        list items each list available moves & on press sets the move at top
        below button a "selected text shown in diff color"
        */}
      <Button title={`Move ${num} \u02c5`} />
      {/* next: display movelist */}
      <FlatList
      style={{
        height: "60%"
      }}
      //data: array from monmoves
      data={moves}
      //render item
      renderItem={({item})=>{
        return(
          <Text key={item}>
            {item}
          </Text>
        )
      }}
      />
    </View>
  );
};

export default MoveSlot;
