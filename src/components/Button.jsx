import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../styles/global";


const Button = ({ children, onPress, buttonStyle, isDisabled }) => {
    return (
      <TouchableOpacity
        style={[style.button, isDisabled ? style.buttonUnactive : null, buttonStyle]}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  };
  
  export default Button;
  
  const style = StyleSheet.create({
    button: {
      borderRadius: 100,
      backgroundColor: colors.orange,
      paddingVertical: 16,
      paddingHorizontal: 32,
    },
    buttonUnactive: {
      backgroundColor: colors.light_gray,
      color: colors.text_gray,
    }
  })