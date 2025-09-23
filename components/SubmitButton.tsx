import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, GestureResponderEvent, type ViewProps } from "react-native";

// Define the props interface
export type Props = ViewProps & {
  onPress: (event: GestureResponderEvent) => void;
  disabled: boolean;
  text: string;
};

export function SubmitButton({ onPress, style, disabled, text }: Props) {
  return (
    <View style={[style]}>
      <TouchableOpacity onPress={onPress} style={styles.ButtonBox} disabled={disabled}>
        <ActivityIndicator animating={disabled} size="small" color="#000" />
        <Text style={styles.ButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fec151",
    borderColor: "#f0b35b",
    borderWidth: 1,
    borderRadius: 30,
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
  ButtonText: {
    width: "100%",
    marginLeft: -20,
    textAlign: "center",
    color: "rgba(0,0,0,0.7)",
    textShadowColor: "rgba(255,255,255,0.6)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
});
