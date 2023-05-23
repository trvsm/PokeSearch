import React, {useContext} from 'react';
import {Text} from 'react-native';
import ThemeContext from '../../theme';
interface Props {
  title: string;
}

const Header = ({title}: Props): JSX.Element => {
  const {theme} = useContext(ThemeContext);
  return (
    <Text
      style={{
        color: theme.colors.background,
        backgroundColor: theme.colors.highlight,
        ...theme.textVariants['header'],
      }}>
      PokeSearch: {title ? title : 'easily lookup abilities & more!'}
    </Text>
  );
};
export default Header;
