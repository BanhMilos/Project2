import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

function AuthenticationScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [SignInVisible, setSignInVisible] = useState("none");
  const [SignUpVisible, setSignUpVisible] = useState("flex");
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    Keyboard.dismiss();
    setLoading(true);
    /*auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("signed in");
      })
      .catch((error) => alert(error.message));*/
    try {
      const userCredentials = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredentials.user;
      console.log(user.uid + " sign in");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };
  const onForgotPressed = () => {
    console.log("forgot");
  };
  const onSignUpSwitch = () => {
    console.log("sign up switched");
    setSignInVisible("none");
    setSignUpVisible("flex");
  };
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredentials.user;
      console.log(user.uid + " sign up");
      await db.collection("User").doc(user.uid).set({
        email: email,
        username: username,
        favList: [],
      });
    } catch (error) {
      alert(error.message);
    }
    /*auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));*/
    setLoading(false);
  };
  const onSignInSwitch = () => {
    console.log("sign in switched");
    setSignInVisible("flex");
    setSignUpVisible("none");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("RecipeList", { uid: user.uid });
      }
    });
    return unsubscribe;
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      disabled={loading}
    >
      <ImageBackground
        source={require("../../assets/images/welcome-image.png")}
        style={styles.background}
      >
        {loading && (
          <ActivityIndicator
            style={{
              top: Dimensions.get("screen").height / 2.5,
              alignSelf: "center",
              position: "absolute",
              zIndex: 2,
            }}
            size={"large"}
          />
        )}
        <Image
          style={styles.logo}
          //source={require("C:/Users/44886/OneDrive/Desktop/React Native/Project2/assets/logo.png")}
          source={require("../../assets/logo.png")}
        />

        <View
          id="Sign up box"
          style={[styles.container, { display: SignUpVisible }]}
        >
          <CustomInput
            placeholder={"Email"}
            value={email}
            setValue={(text) => setEmail(text)}
            isDisabled={loading}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={(text) => setPassword(text)}
            secureTextEntry={true}
            isDisabled={loading}
          />
          <CustomInput
            placeholder="Confirm password"
            value={confirmPassword}
            setValue={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
            isDisabled={loading}
          />
          <CustomInput
            placeholder="Username"
            value={username}
            setValue={(text) => setUsername(text)}
            isDisabled={loading}
          />
          <CustomButton
            text="Sign up"
            onPress={handleSignUp}
            isDisabled={loading}
          />
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}
          >
            <Text style={{ marginVertical: 10 }}>
              {" "}
              Already have an account?
              <Text
                style={{
                  color: "#5A57E1",
                  fontWeight: "bold",
                }}
                onPress={onSignInSwitch}
              >
                {" "}
                Sign in
              </Text>
            </Text>
          </View>
        </View>
        <View
          id="Sign in box"
          style={[styles.container, { display: SignInVisible }]}
        >
          <CustomInput
            placeholder="Email"
            value={email}
            setValue={setEmail}
            isDisabled={loading}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            isDisabled={loading}
          />
          <CustomButton
            text="Sign in"
            onPress={handleSignIn}
            isDisabled={loading}
          />
          <Pressable onPress={onForgotPressed}>
            <Text
              style={{
                marginBottom: 10,
                color: "#5A57E1",
                left: -90,
                fontWeight: "bold",
              }}
              isDisabled={loading}
            >
              {" "}
              Forgot password
            </Text>
          </Pressable>
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}
          >
            <Text style={{ marginVertical: 10 }}>
              {" "}
              Dont have an account?
              <Text
                style={{ color: "#5A57E1", fontWeight: "bold" }}
                onPress={onSignUpSwitch}
              >
                {" "}
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    padding: 30,
  },
  logo: {
    height: 260,
    width: 260,
    resizeMode: "contain",
  },
  container: {
    backgroundColor: "#F4F4F3",
    alignItems: "center",
    width: "100%",
    height: 370,
    paddingHorizontal: 30,
    paddingTop: 30,
    borderWidth: 0.5,
    borderRadius: 25,
  },
});

export default AuthenticationScreen;
