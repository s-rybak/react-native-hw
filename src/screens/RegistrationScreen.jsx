import { useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Keyboard,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { colors } from "../../styles/global";

import Input from "../components/Input";
import Button from "../components/Button";
import CirclePlusSvg from "../../icons/CirclePlusSvg";
import CircleCrossSvg from "../../icons/CircleCrossSvg";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const RegistrationScreen = ({ onHasAccount }) => {
  const [photo, setPhoto] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handlePhotoUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Необхідний дозвіл на доступ до галереї');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }

    } catch (error) {
      console.log('Помилка при завантаженні фото:', error);
      alert('Помилка при завантаженні фото');
    }
  };

  const handlePhotoRemove = () => {
    setPhoto("");
  };

  const handleLoginChange = (value) => {
    setLogin(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const showPassword = () => {
    setIsPasswordVisible(prev => !prev)
  };

  const onLogin = async () => {
    console.log('login')
  };

  const onSignUp = () => {
    onHasAccount(); // temporary page change fix for preview
  };
  
  const showButton = (
    <TouchableOpacity
      onPress={showPassword}
    >
      <Text style={[styles.baseText, styles.passwordButtonText]}>
        Показати
      </Text>
    </TouchableOpacity>
  );

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <>
        <Image
          source={require("../../assets/background.png")}
          resizeMode="cover"
          style={styles.image}
        />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? 'padding' : 'height'}
        >
          <View style={styles.formContainer}>

            <View style={styles.photoContainer}>

                {photo && (
                    <>
                    <Image source={{ uri: photo }} style={styles.photo} />
                    <Pressable onPress={handlePhotoRemove} style={styles.circlePlus}>
                        <CircleCrossSvg/>
                    </Pressable>
                    </>
                )}

                {!photo && (
                    <Pressable onPress={handlePhotoUpload} style={styles.circlePlus}>
                        <CirclePlusSvg/>
                    </Pressable>
                )}

            </View>

            <Text style={styles.title}>Реєстрація</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={login}
                autofocus={true}
                placeholder="Логін"
                onTextChange={handleLoginChange}
              />

              <Input
                value={email}
                autofocus={true}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
              />

              <Input
                value={password}
                placeholder="Пароль"
                rightButton={showButton}
                outerStyles={styles.passwordButton}
                onTextChange={handlePasswordChange}
                secureTextEntry={isPasswordVisible}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onLogin}>
                <Text style={[styles.baseText, styles.loginButtonText]}>
                  Зареєструватися
                </Text>
              </Button>

              <View style={styles.signUpContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Вже є акаунт ?{' '}
                  <TouchableWithoutFeedback style={styles.signUpTextHolder} onPress={onSignUp}>
                    <Text style={styles.signUpText}>Увійти</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    </Pressable>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%"
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: "67.61%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    //paddingBottom: 79,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    textDecorationLine: "underline",
  },
  photoContainer: {
    position: "absolute",
    top: -60,
    bottom: 0,
    height: 120,
    width: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    alignSelf: "center",
  },
  circlePlus: {
    position: "absolute",
    right: -12.5,
    bottom: 14,
    height: 25,
    width: 25,
  },
  photo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: 120,
    width: 120,
    borderRadius: 16,
  }
});
