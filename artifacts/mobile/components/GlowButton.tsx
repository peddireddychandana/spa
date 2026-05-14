import React, { useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { useColors } from "@/hooks/useColors";

type GlowButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: "gold" | "rose" | "outline";
  size?: "sm" | "md" | "lg";
};

export function GlowButton({
  label,
  onPress,
  style,
  variant = "gold",
  size = "md",
}: GlowButtonProps) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  const bgColor =
    variant === "gold"
      ? colors.primary
      : variant === "rose"
      ? colors.accent
      : "transparent";

  const borderColor = variant === "outline" ? colors.primary : "transparent";
  const textColor = variant === "outline" ? colors.primary : colors.primaryForeground;

  const heights: Record<string, number> = { sm: 40, md: 52, lg: 60 };
  const fontSizes: Record<string, number> = { sm: 12, md: 14, lg: 16 };
  const paddingH: Record<string, number> = { sm: 20, md: 28, lg: 36 };

  const webShadow =
    Platform.OS === "web" && variant !== "outline"
      ? { boxShadow: `0 0 18px ${colors.primary}80` }
      : {};

  const nativeShadow =
    Platform.OS !== "web" && variant !== "outline"
      ? {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.55,
          shadowRadius: 10,
          elevation: 6,
        }
      : {};

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: bgColor,
            borderColor,
            borderWidth: variant === "outline" ? 1.5 : 0,
            height: heights[size],
            paddingHorizontal: paddingH[size],
            transform: [{ scale }],
          },
          nativeShadow,
          webShadow as any,
          style,
        ]}
      >
        <Text style={[styles.label, { color: textColor, fontSize: fontSizes[size] }]}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
