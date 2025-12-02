import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Poke Quiz" }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: "Pergunta" }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: "Resultado" }} />
    </Stack.Navigator>
  );
}
