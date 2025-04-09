import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert, // Using Alert for a more standard feedback
} from "react-native";
import Clipboard from "expo-clipboard";

const PIX_KEY = "445e5708-c93c-4caa-9041-6a991aa918c8";

export default function DonateScreen(): JSX.Element {
  const [isPixKeyCopied, setIsPixKeyCopied] = React.useState<boolean>(false);

  const handleCopyToClipboard = React.useCallback(async () => {
    try {
      await Clipboard.setString(PIX_KEY);
      setIsPixKeyCopied(true);
      Alert.alert("Gratitude!", "The Pix key has been diligently copied to your clipboard.");
    } catch (error) {
      Alert.alert("Oops!", "An issue arose while attempting to copy the Pix key.");
      console.error("Error copying to clipboard:", error);
    }
  }, []);

  React.useEffect(() => {
    // Optional: Reset the copied state after a delay if using a local state instead of Alert
    // const resetTimeout = setTimeout(() => setIsPixKeyCopied(false), 5000);
    // return () => clearTimeout(resetTimeout);
  }, [isPixKeyCopied]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.spacingBuffer} />
      <Text style={styles.titleText}>Express Your Gratitude</Text>
      <Text style={[styles.bodyText, styles.topMargin]}>
        This application stands as a testament to open-source ethos, freely available under the MIT license. Its
        genesis resides within the digital halls of GitHub: github.com/Mitacho/bufunfa.
      </Text>
      <Text style={[styles.bodyText, styles.topMargin]}>
        Should this application have, in any measure, facilitated your financial endeavors, I humbly beseech you to
        consider offering a token of appreciation by bestowing any valued amount upon the Pix key presented below.
      </Text>
      <Text style={[styles.bodyText, styles.topMargin]}>
        Your benevolent contribution will significantly aid in realizing the aspiration of acquiring a Samsung Galaxy
        Book S notebook:
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/png/book-s.png")}
          style={styles.dreamDeviceImage}
        />
      </View>
      <Text style={[styles.bodyText, styles.topMargin]}>
        Your magnanimity in this regard is profoundly appreciated! :D
      </Text>
      <Text style={[styles.bodyText, styles.topMargin]}>
        Ephemeral Pix Key:
      </Text>
      <Text style={[styles.bodyText, styles.topMargin, styles.emphasizedText]}>
        {PIX_KEY}
      </Text>
      <TouchableOpacity
        style={styles.donateButtonContainer}
        onPress={handleCopyToClipboard}
        accessibilityLabel="Copy Pix key to clipboard"
      >
        <View style={[styles.button, isPixKeyCopied ? styles.copiedButton : styles.copyButton]}>
          <Text style={styles.buttonText}>
            {isPixKeyCopied ? "Pix Key Imprinted!" : "Imprint Pix Key"}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.spacingBuffer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  titleText: {
    fontFamily: "Poppins-Medium",
    fontSize: 28, // Slightly larger for impact
    textAlignVertical: "center",
    color: "#050505",
    marginBottom: 20, // Added some bottom margin
  },
  bodyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlignVertical: "center",
    color: "#333333", // Slightly darker for better readability
    lineHeight: 24, // Improved line height for better reading flow
  },
  emphasizedText: {
    fontFamily: "Poppins-Medium",
    marginTop: 15,
    fontSize: 18, // Slightly larger for the key
    color: "#171717",
  },
  button: {
    width: "100%",
    height: 60,
    borderRadius: 6, // Slightly more rounded
    justifyContent: "center",
    alignItems: "center",
  },
  copyButton: {
    backgroundColor: "#E2D5FE",
  },
  copiedButton: {
    backgroundColor: "#CFF4CF",
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#171717",
  },
  spacingBuffer: {
    height: 35, // Adjusted spacing
  },
  topMargin: {
    marginTop: 25, // Adjusted top margin for text blocks
  },
  imageContainer: {
    marginVertical: 30,
    alignItems: "center", // Center the image
  },
  dreamDeviceImage: {
    height: 300,
    width: "90%",
    resizeMode: "contain",
  },
  donateButtonContainer: {
    marginTop: 50,
  },
});
