import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import ImgPicker from "../components/ImagePicker";
// import LocationPicker from "../components/LocationPicker";
import Colors from "../constants/Colors";
import * as placesActions from "../store/places-actions";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const dispatch = useDispatch();

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };
  const locationChangeHandler = (text) => {
    setLocationValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage, locationValue));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImgPicker onImageTake={imageTakenHandler} />
        {/* <LocationPicker /> */}
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={locationChangeHandler}
          value={locationValue}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
