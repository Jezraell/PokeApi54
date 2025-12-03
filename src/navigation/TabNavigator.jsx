import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "./StackNavigator";   
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#1b3a70",
      tabBarInactiveTintColor: "#777",
      tabBarStyle: { height:70, paddingBottom:10, paddingTop:10 },
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "HomeStack") iconName = "game-controller-outline";
        if (route.name === "Favorites") iconName = "star-outline";
        if (route.name === "Profile") iconName = "person-outline";
        return <Ionicons name={iconName} size={26} color={color} />;
      }
    })}>
      <Tab.Screen name="HomeStack" component={StackNavigator} options={{ title: 'Quiz' }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
