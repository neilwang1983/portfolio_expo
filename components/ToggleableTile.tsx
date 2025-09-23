import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, OpaqueColorValue, GestureResponderEvent } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import type { IconSymbolName } from "@/components/ui/IconSymbol";

// Define the props interface
interface Props {
  onPress: (event: GestureResponderEvent) => void;
  icon: IconSymbolName;
  color: string | OpaqueColorValue;
  toggle: boolean;
  loading: boolean;
  text: string;
}

export function ToggleableTile({ onPress, icon, color, toggle, loading, text }: Props) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.tile}>
          <View style={styles.bullet}>
            <IconSymbol size={24} name={icon} color={color} />
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.toggle}>
            <ActivityIndicator style={{ marginRight: 10 }} animating={loading} size="small" color="#333" />
            {toggle ? <MaterialIcons size={32} name="toggle-on" color="#348feb" /> : <MaterialIcons size={32} name="toggle-off" color="grey" />}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 10,
    marginVertical: 4,
    display: "flex",
  },
  tile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
    borderRadius: 7,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: "#666",
    fontFamily: "Montserrat",
  },
  toggle: {
    flexDirection: "row",
  },
});
