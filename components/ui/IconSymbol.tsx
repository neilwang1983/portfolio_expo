// This file is a fallback for using MaterialIcons on Android and web.
//import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  bell: "bell",
  clock: "clock-outline",
  creditcard: "credit-card-outline",
  "checkmark.shield": "shield-check-outline",
  gift: "gift-outline",
  "lightbulb.max": "lightbulb-on-outline",
  "questionmark.bubble": "message-question-outline",
  "chevron.left.forwardslash.chevron.right": "code-tags",
  "chevron.left": "chevron-left",
  "chevron.right": "chevron-right",
  "chevron.up": "chevron-up",
  "chevron.down": "chevron-down",
  "checkmark.circle": "check-circle-outline",
  "ellipsis.circle": "dots-horizontal-circle-outline",
  "square.and.pencil": "square-edit-outline",
} as Partial<Record<import("expo-symbols").SymbolViewProps["name"], React.ComponentProps<typeof MaterialCommunityIcons>["name"]>>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 **/
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialCommunityIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
