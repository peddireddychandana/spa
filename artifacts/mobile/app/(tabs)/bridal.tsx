import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlowButton } from "@/components/GlowButton";
import { BRIDAL_PACKAGES } from "@/data/services";
import { useColors } from "@/hooks/useColors";
import { useRouter } from "expo-router";

export default function BridalScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroWrap}>
        <Image
          source={require("@/assets/images/bridal_hero.png")}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", colors.background]}
          style={styles.heroFade}
        />
        <LinearGradient
          colors={["rgba(13,10,7,0.45)", "transparent"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.heroBadge]}>
          <Text style={[styles.heroBadgeText, { color: colors.primary }]}>
            ✦  BRIDAL ATELIER  ✦
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.heading, { color: colors.foreground }]}>
          The Bridal{"\n"}Experience
        </Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>
          Your wedding day is a once-in-a-lifetime moment. Our dedicated bridal
          team ensures every detail is flawlessly executed, from your first trial
          to your final touch-up.
        </Text>

        <View style={[styles.featurePills, { borderColor: colors.border }]}>
          {["Dedicated Team", "Trial Sessions", "On-Location", "Day-Of Guarantee"].map((f) => (
            <View
              key={f}
              style={[styles.pill, { borderColor: colors.primary + "55", backgroundColor: colors.primary + "11" }]}
            >
              <Text style={[styles.pillText, { color: colors.primary }]}>{f}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Bridal Packages
        </Text>

        {BRIDAL_PACKAGES.map((pkg) => (
          <LinearGradient
            key={pkg.id}
            colors={[pkg.color + "22", "#1A1209"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.packageCard, { borderColor: pkg.color + "44" }]}
          >
            <View style={styles.pkgHeader}>
              <View>
                <View style={[styles.tagWrap, { backgroundColor: pkg.color + "33" }]}>
                  <Text style={[styles.tag, { color: pkg.color }]}>{pkg.tag}</Text>
                </View>
                <Text style={[styles.pkgName, { color: colors.foreground }]}>{pkg.name}</Text>
              </View>
              <Text style={[styles.pkgPrice, { color: pkg.color }]}>{pkg.price}</Text>
            </View>

            <View style={[styles.divider, { backgroundColor: pkg.color + "33" }]} />

            {pkg.includes.map((item) => (
              <View key={item} style={styles.pkgItem}>
                <Feather name="check" size={14} color={pkg.color} />
                <Text style={[styles.pkgItemText, { color: colors.foreground }]}>{item}</Text>
              </View>
            ))}

            <GlowButton
              label="Book This Package"
              onPress={() => router.push("/(tabs)/book")}
              style={{ marginTop: 20 }}
              variant={pkg.id === "signature" ? "rose" : pkg.id === "premier" ? "gold" : "outline"}
              size="sm"
            />
          </LinearGradient>
        ))}

        <View style={[styles.consultCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="phone" size={20} color={colors.primary} />
          <View style={styles.consultText}>
            <Text style={[styles.consultTitle, { color: colors.foreground }]}>
              Free Consultation
            </Text>
            <Text style={[styles.consultSub, { color: colors.mutedForeground }]}>
              Speak with our bridal team to plan your perfect wedding look.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    height: 380,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  heroBadge: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
  },
  heroBadgeText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  heading: {
    fontSize: 38,
    fontFamily: "Inter_700Bold",
    letterSpacing: -1,
    lineHeight: 44,
    marginBottom: 14,
  },
  sub: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
    marginBottom: 24,
  },
  featurePills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 32,
  },
  pill: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  pillText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  packageCard: {
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
  },
  pkgHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  tagWrap: {
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  tag: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  pkgName: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.3,
  },
  pkgPrice: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    marginBottom: 14,
  },
  pkgItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  pkgItemText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  consultCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 12,
  },
  consultText: {
    flex: 1,
  },
  consultTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  consultSub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
});
