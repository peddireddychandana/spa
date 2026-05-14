import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { GlowButton } from "@/components/GlowButton";
import { SERVICES } from "@/data/services";
import { useColors } from "@/hooks/useColors";

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.mutedForeground }}>Service not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient
        colors={[service.gradientColors[0], service.gradientColors[1] + "55", colors.background]}
        style={[styles.hero, { paddingTop: topPad + 16 }]}
      >
        <Pressable
          onPress={() => router.back()}
          style={[styles.back, { backgroundColor: "rgba(0,0,0,0.4)" }]}
        >
          <Feather name="arrow-left" size={20} color="#F5EDD6" />
        </Pressable>

        <LinearGradient
          colors={service.gradientColors}
          style={styles.heroIcon}
        >
          <Feather name={service.icon as any} size={36} color="#0D0A07" />
        </LinearGradient>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tags}>
          <View style={[styles.tag, { backgroundColor: service.gradientColors[1] + "22", borderColor: service.gradientColors[1] + "44" }]}>
            <Feather name="clock" size={12} color={service.gradientColors[1]} />
            <Text style={[styles.tagText, { color: service.gradientColors[1] }]}>{service.duration}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: service.gradientColors[1] + "22", borderColor: service.gradientColors[1] + "44" }]}>
            <Feather name="tag" size={12} color={service.gradientColors[1]} />
            <Text style={[styles.tagText, { color: service.gradientColors[1] }]}>{service.price}</Text>
          </View>
        </View>

        <Text style={[styles.name, { color: colors.foreground }]}>{service.name}</Text>
        <Text style={[styles.desc, { color: colors.mutedForeground }]}>{service.longDescription}</Text>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>What&apos;s Included</Text>
        {service.options.map((opt) => (
          <View key={opt} style={[styles.optionRow, { borderBottomColor: colors.border }]}>
            <LinearGradient
              colors={service.gradientColors}
              style={styles.optionDot}
            />
            <Text style={[styles.optionText, { color: colors.foreground }]}>{opt}</Text>
            <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
          </View>
        ))}

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="info" size={16} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
            Prices vary based on hair length, complexity, and product used. A consultation is recommended for first-time visitors.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 16, backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <GlowButton
          label="Book This Service"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("/(tabs)/book");
          }}
          size="lg"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "flex-start",
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  tags: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  name: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  desc: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  optionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  infoCard: {
    flexDirection: "row",
    gap: 12,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginTop: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    flexDirection: "row",
  },
});
