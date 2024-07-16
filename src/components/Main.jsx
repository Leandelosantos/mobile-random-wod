import Constants from "expo-constants";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from "react-native";
import option from "../../options";
import { useAuth } from "./AuthContext";

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#b9ef31",
    paddingTop: Constants.statusBarHeight + 1,
  },
  container: {
    //paddingTop: Constants.statusBarHeight + 1,
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    paddingVertical: 50,
    marginBottom: 60,
  },
  containerMain: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#b9ef31",
    alignItems: "center",
    //height: 330,
    padding: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  containerDado: {
    flex: 1,
    justifyContent: "center",
    //backgroundColor: "#b9ef31",
    alignItems: "center",
    paddingTop: 200,
  },
  button: {
    width: 100,
    height: 100,
    //flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dado: {
    alignSelf: "center",
    width: 100,
    height: 100,
    //marginBottom: 180,
  },
  containerWod: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#b9ef31",
    padding: 40,
    gap: 10,
  },
  nameEx: {
    fontSize: 28,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  type: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eq: {
    fontSize: 18,
  },
  desc: {
    fontSize: 20,
  },
  reset: {
    borderRadius: 5,
    backgroundColor: "#10c891",
    marginBottom: 50,
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
  },
});

const Main = () => {
  const { user, signOut } = useAuth(); // Obtenemos el usuario y la función signOut del contexto de autenticación

  const [wod, setWod] = useState({
    nameExercise: "",
    type: "",
    equipment: "",
    instructions: "",
  });

  const onResetButton = () => {
    setWod({
      nameExercise: "",
      type: "",
      equipment: "",
      instructions: "",
    });
  };

  const onPressButton = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7d6e2da24bmsh60b57f855290610p1e8115jsne1332cec514b",
          "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
        },
      };

      const longitudArray = option.muscle.length;
      const indiceAleatorio = Math.floor(Math.random() * longitudArray);
      const valorAleatorio = option.muscle[indiceAleatorio];
      //console.log(valorAleatorio);

      const resp = await fetch(
        `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${valorAleatorio}&offset=1`,
        options
      );
      const data = await resp.json();
      const { name, type, equipment, instructions } =
        data[Math.floor(Math.random() * data.length)];
      //console.log(data);

      setWod({
        nameExercise: name,
        type: type,
        equipment: equipment,
        instructions: instructions,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.scroll}>
      {user && (
        <>
          <View style={styles.containerMain}>
            <Text style={styles.text}>Bienvenidx {user.username}</Text>
            <Text style={styles.text}>Toca el dado para obtener tu Wod!</Text>
          </View>
          <View style={styles.containerDado}>
            <TouchableOpacity style={styles.button} onPress={onPressButton}>
              <Image
                style={styles.dado}
                source={require("../../assets/dado-unscreen.gif")}
              />
            </TouchableOpacity>
          </View>
          {/* {showResult && ( */}
          <View style={styles.containerWod}>
            <Text style={styles.nameEx}>{wod.nameExercise}</Text>
            <Text style={styles.type}>{wod.type}</Text>
            <Text style={styles.eq}>{wod.equipment}</Text>
            <Text style={styles.desc}>{wod.instructions}</Text>
          </View>
          {/* ) */}
          <View style={styles.container}>
            <TouchableOpacity style={styles.reset} onPress={onResetButton}>
              <Text style={styles.type}>Reset</Text>
            </TouchableOpacity>
            <Button
              title="Cerrar Sesion"
              onPress={signOut}
              style={{ marginBottom: 30 }}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Main;
