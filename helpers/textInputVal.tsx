import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native/types';
const currentVal = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
  const field = event.nativeEvent.text;
  return field;
};
export default currentVal;
