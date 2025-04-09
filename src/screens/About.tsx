import React, { JSX } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity, // Changed from TouchableWithoutFeedback for better semantics
} from "react-native";
import * as Linking from "expo-linking";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import Icon from "../components/Icon";
import Icons8 from "../assets/images/svgs/Icons8";
import GitHub from "../assets/images/svgs/GitHub";

type Props = StackScreenProps<StackParamList, "About">;

const AboutScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attributions</Text>
        <View style={styles.items}>
          <TouchableOpacity style={styles.card} onPress={() => Linking.openURL("https://icons8.com")}>
            <View style={styles.image}>
              <Icon svg={Icons8} fill="#050505" height={37} width={37} />
            </View>
            <Text style={styles.text}>Illustrations courtesy of Icons8</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Luminary Developer</Text>
        <View style={styles.items}>
          <TouchableOpacity style={styles.card} onPress={() => Linking.openURL("https://github.com/Mitacho")}>
            <View style={styles.image}>
              <Icon svg={GitHub} fill="#050505" height={37} width={37} />
            </View>
            <Text style={styles.text}>Crafted with finesse by Mitacho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40, // Slightly adjusted for better top spacing
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  image: {
    marginRight: 16, // Adjusted for better spacing
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: 24, // Adjusted for better spacing between sections
  },
  sectionTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 18, // Slightly increased for emphasis
    color: "#050505",
    marginBottom: 12, // Added margin below title
  },
  items: {
    flexDirection: "column",
  },
  card: {
    height: 48, // Slightly increased for better touch target
    flexDirection: "row",
    alignItems: "center", // Vertically align items in the card
    marginTop: 8, // Adjusted spacing between cards
    paddingVertical: 8, // Added padding within the card
    borderRadius: 6, // Added subtle border radius
    backgroundColor: "#f7f7f7", // Added a light background for visual separation
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlignVertical: "center",
    color: "#050505",
    flex: 1, // Allows text to take up remaining space
  },
});

export default AboutScreen;
