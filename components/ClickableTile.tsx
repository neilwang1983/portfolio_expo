import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, OpaqueColorValue, GestureResponderEvent } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import type { IconSymbolName } from "@/components/ui/IconSymbol";

// Define the props interface
interface Props {
  onPress: (event: GestureResponderEvent) => void;
  icon: IconSymbolName;
  color: string | OpaqueColorValue;
  text: string;
}

export function ClickableTile({ onPress, icon, color, text }: Props) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.tile}>
          <View style={styles.bullet}>
            <IconSymbol size={24} name={icon} color={color} />
            <Text style={styles.text}>{text}</Text>
          </View>
          <IconSymbol style={styles.arrow} size={24} name="chevron.right" color={color} />
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
  icon: {
    width: 24,
    height: 24,
    opacity: 0.4,
    marginRight: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 15,
    color: "#666",
    fontFamily: "Montserrat",
    fontWeight: 500,
  },
  arrow: {
    width: 12,
    height: 12,
    opacity: 0.6,
  },
});
