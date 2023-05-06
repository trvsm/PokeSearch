import React, {useContext} from 'react';
import {Text} from 'react-native';
import ThemeContext from '../../theme';

const Header = (): JSX.Element => {
  const {theme} = useContext(ThemeContext);
  return (
    <Text
      style={{
        color: theme.colors.background,
        backgroundColor: theme.colors.highlight,
        ...theme.textVariants['header'],
      }}>
      PokeSearch: easily lookup abilities & more!
    </Text>
  );
};
export default Header;
