import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';

import monMoves from '../../helpers/monMoves';
//theme styling

interface Props {
  member: {} | null;
  num: number;
}


const MoveSlot: React.FC<Props> = ({member, num}) => {
  const moves =monMoves(member)

  return (
    <View>
      {/* each move view is headed with a button, onclick shows list
        list items each list available moves & on press sets the move at top
        below button a "selected text shown in diff color"
        */}
      <Button title={`Move ${num} \u02c5`} />
      <FlatList
      style={{
        height: "60%"
      }}
      //data: array from monmoves
      data={moves}
      //each item is simply the string name of move
      renderItem={({item})=>{
        return(
          <Text key={item}
          // TODO: next add presshandler at teambuild, pass as props
          //will take a num (use num from props) and the item name
          >
            {item}
          </Text>
        )
      }}
      />
    </View>
  );
};

export default MoveSlot;
