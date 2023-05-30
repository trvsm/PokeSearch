import React from 'react';
import {Button, Text, View} from 'react-native';
//theme styling

interface Props {
  member: {} | null;
  num: number;
}

//will take props to tell it what pokemon in this slot
const MoveSlot: React.FC<Props> = ({member, num}) => {
  return (
    <View>
      {/* each move view is headed with a button, onclick shows list
        list items each list available moves & on press sets the move at top
        below button a "selected text shown in diff color"
        */}
      <Button title={`Move ${num} \u02c5`} />
      {/* next: display movelist */}
    </View>
  );
};

export default MoveSlot;
