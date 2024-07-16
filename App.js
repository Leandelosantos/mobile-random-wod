import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import Main from "./src/components/Main";
import Main from "./src/components/Main";
import Login from "./src/components/Login";
import { AuthProvider } from "./src/components/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ title: "Main", headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </AuthProvider>
    </NavigationContainer>
  );
}
