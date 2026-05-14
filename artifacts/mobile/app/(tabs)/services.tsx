import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";

export default function ServicesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.container,
        { paddingTop: topPad + 24, paddingBottom: bottomPad },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.eyebrow, { color: colors.primary }]}>
        WHAT WE OFFER
      </Text>
      <Text style={[styles.heading, { color: colors.foreground }]}>
        Our Services
      </Text>
      <Text style={[styles.sub, { color: colors.mutedForeground }]}>
        Every service is a carefully crafted ritual — designed to restore, beautify, and uplift.
      </Text>

      <View style={styles.list}>
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 3,
    marginBottom: 8,
  },
  heading: {
    fontSize: 34,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  sub: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
    marginBottom: 28,
  },
  list: {
    gap: 0,
  },
});
