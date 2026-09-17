import { StyleSheet, Text, TextStyle, StyleProp  } from 'react-native';

type Props = { text: string, textSize?: 'sm' | 'md' | 'lg', additionalStyles?: StyleProp<TextStyle> };

export default function Error({ text, textSize = 'md', additionalStyles }: Props) {
  const textSizeStyles = {
    sm: styles.textSm,
    md: styles.textMd,
    lg: styles.textLg,
  };

  return (
    <Text style={[styles.container, textSizeStyles[textSize], additionalStyles]  }>{text}</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'red',
  },
  textSm: {
    fontSize: 11,
  },
  textMd: {
    fontSize: 14,
  },
  textLg: {
    fontSize: 16,
  },
});
