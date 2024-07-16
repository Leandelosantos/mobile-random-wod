import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth(); // Obtenemos la función signIn del contexto de autenticación

  const navigation = useNavigation();

  const handleLoginPress = () => {
    signIn(username, password); // Llamamos a la función signIn con las credenciales ingresadas
    // Aquí puedes agregar lógica de autenticación si es necesario
    // Después de la autenticación, navegar a la pantalla Main2
    navigation.navigate("Main");
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#000"
          onChangeText={setUsername} // Actualizamos el estado 'username' cuando el usuario escribe algo
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#000"
          onChangeText={setPassword} // Actualizamos el estado 'password' cuando el usuario escribe algo
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b9ef31",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: "#000",
  },
  button: {
    width: 250,
    height: 40,
    backgroundColor: "#10c891",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
