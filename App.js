import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceListScreen from "./screens/PlaceListScreen";
import PlaceDetailScreen from "./screens/PlaceDetailScreen";
import NewPlaceScreen from "./screens/NewPlaceScreen";
import MapScreen from "./screens/MapScreen";
import Colors from "./constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from "./store/places-reducer";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Initalize database");
  })
  .catch((err) => console.log(err));

const Stack = createNativeStackNavigator();

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === "android" ? Colors.primary : "",
            },
            headerTintColor:
              Platform.OS === "android" ? "white" : Colors.primary,
          }}
        >
          <Stack.Screen
            name="All Places"
            component={PlaceListScreen}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <Icon
                  name="add"
                  size={32}
                  color={Platform.OS === "android" ? "white" : Colors.primary}
                  style={{ fontWeight: "bold" }}
                  onPress={() => navigation.navigate("Add Place")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="PlaceDetail"
            component={PlaceDetailScreen}
            options={({ route }) => ({ title: route.params.placeTitle })}
          />
          <Stack.Screen name="Add Place" component={NewPlaceScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
