import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import colors from "../../styles/colors";
import headers from "../../styles/headers";

export default class LoginInputs extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      pw: ""
    };
  }

  _onLoginPress() {
    Alert.alert("you pressed the button");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={text => this.setState({ username: text })}
              placeholder="e-mail"
              placeholderTextColor={colors.black}
              style={styles.input}
            />
            <Text>Icon</Text>
          </View>
          <View style={styles.lineStyle} />
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={text => this.setState({ pw: text })}
              placeholder="password"
              placeholderTextColor={colors.black}
              style={styles.input}
            />
            <Text>Icon</Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={this._onLoginPress}>
            <Text style={styles.buttonText}>sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    width: 125
  },
  buttonText: {
    color: colors.black,
    padding: 15,
    textAlign: "center"
  },
  container: {},
  lineStyle: {
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: colors.black,
    width: "80%"
  },
  inputsContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 125,
    justifyContent: "space-evenly",
    margin: 10
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30
  },
  input: {
    ...headers.two
  }
});
