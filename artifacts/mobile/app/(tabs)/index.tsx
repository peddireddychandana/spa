import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { GlowButton } from "@/components/GlowButton";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";
import { useColors } from "@/hooks/useColors";

const { width, height } = Dimensions.get("window");
const HERO_HEIGHT = Math.min(height * 0.72, 620);

const QUICK_LINKS = [
  { id: "spa", icon: "wind", label: "Spa", color: "#4A8C7A" },
  { id: "hair", icon: "scissors", label: "Hair", color: "#C9A84C" },
  { id: "makeup", icon: "star", label: "Makeup", color: "#B76E79" },
  { id: "nails", icon: "feather", label: "Nails", color: "#A67FA6" },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  const headerOpacity = scrollY.interpolate({
    inputRange: [HERO_HEIGHT - 120, HERO_HEIGHT - 60],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            paddingTop: topPad + 8,
            backgroundColor: colors.background + "F5",
            borderBottomColor: colors.border,
            opacity: headerOpacity,
          },
        ]}
      >
        <Text style={[styles.stickyTitle, { color: colors.primary }]}>SPA PRDTR</Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPad }}
      >
        <ImageBackground
          source={require("@/assets/images/hero_spa.png")}
          style={[styles.heroWrap, { height: HERO_HEIGHT, width }]}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(13,10,7,0.2)", "rgba(13,10,7,0.55)", "#0D0A07"]}
            locations={[0, 0.55, 1]}
            style={StyleSheet.absoluteFill}
          />

          <View style={[styles.heroContent, { paddingTop: topPad + 20 }]}>
            <Text style={styles.heroBadge}>✦  LUXURY BEAUTY & WELLNESS  ✦</Text>
            <Text style={styles.heroTitle}>SPA{"\n"}PRDTR</Text>
            <Text style={styles.heroSub}>
              Step into a world where beauty meets serenity
            </Text>

            <View style={styles.heroCtas}>
              <GlowButton
                label="Book Now"
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/(tabs)/book");
                }}
                size="lg"
              />
              <Pressable
                onPress={() => router.push("/(tabs)/services")}
                style={styles.ghostBtn}
              >
                <Text style={styles.ghostBtnText}>Our Services</Text>
                <Feather name="arrow-right" size={15} color="#C9A84C" />
              </Pressable>
            </View>
          </View>

          <View style={styles.quickLinks}>
            {QUICK_LINKS.map((q) => (
              <Pressable
                key={q.id}
                onPress={() =>
                  router.push({ pathname: "/service/[id]", params: { id: q.id } } as never)
                }
                style={[styles.quickLink, { borderColor: q.color + "66" }]}
              >
                <View style={[styles.quickLinkIcon, { backgroundColor: q.color + "33" }]}>
                  <Feather name={q.icon as any} size={16} color={q.color} />
                </View>
                <Text style={styles.quickLinkText}>{q.label}</Text>
              </Pressable>
            ))}
          </View>
        </ImageBackground>

        <View style={styles.body}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.eyebrow, { color: colors.primary }]}>CURATED FOR YOU</Text>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Popular Services
              </Text>
            </View>
            <Pressable onPress={() => router.push("/(tabs)/services")} style={styles.seeAll}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
              <Feather name="arrow-right" size={14} color={colors.primary} />
            </Pressable>
          </View>

          <FlatList
            data={SERVICES.slice(0, 5)}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
            renderItem={({ item }) => <ServiceCard service={item} compact />}
            scrollEnabled={!!SERVICES && SERVICES.length > 3}
          />

          <ImageBackground
            source={require("@/assets/images/bridal_hero.png")}
            style={styles.bridalFeature}
            resizeMode="cover"
            imageStyle={{ borderRadius: 20 }}
          >
            <LinearGradient
              colors={["rgba(13,10,7,0.05)", "rgba(13,10,7,0.88)"]}
              style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
            <View style={styles.bridalContent}>
              <Text style={styles.bridalEyebrow}>✦  BRIDAL ATELIER</Text>
              <Text style={styles.bridalTitle}>Your Perfect{"\n"}Wedding Look</Text>
              <GlowButton
                label="Explore Packages"
                onPress={() => router.push("/(tabs)/bridal")}
                size="sm"
                variant="rose"
              />
            </View>
          </ImageBackground>

          <View style={styles.statsRow}>
            {[
              { value: "10+", label: "Years of\nExcellence" },
              { value: "5K+", label: "Happy\nClients" },
              { value: "50+", label: "Expert\nArtists" },
            ].map((stat) => (
              <View
                key={stat.label}
                style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.ctaBlock, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.ctaTitle, { color: colors.foreground }]}>
              Ready for Your{"\n"}Transformation?
            </Text>
            <Text style={[styles.ctaSub, { color: colors.mutedForeground }]}>
              Open daily 10 AM – 8 PM{"\n"}Dubai, UAE
            </Text>
            <View style={styles.ctaBtns}>
              <Pressable
                style={[styles.ctaIconBtn, { backgroundColor: "#25D366" + "22", borderColor: "#25D366" + "44" }]}
              >
                <Feather name="message-circle" size={20} color="#25D366" />
              </Pressable>
              <Pressable
                style={[styles.ctaIconBtn, { backgroundColor: colors.primary + "22", borderColor: colors.primary + "44" }]}
              >
                <Feather name="phone" size={20} color={colors.primary} />
              </Pressable>
              <GlowButton
                label="Book Now"
                onPress={() => router.push("/(tabs)/book")}
                size="sm"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  stickyTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    letterSpacing: 4,
  },
  heroWrap: {
    position: "relative",
    justifyContent: "space-between",
  },
  heroContent: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: "flex-start",
  },
  heroBadge: {
    color: "#C9A84C",
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 3,
    marginBottom: 20,
    opacity: 0.9,
  },
  heroTitle: {
    color: "#F5EDD6",
    fontSize: Math.min(width * 0.16, 60),
    fontFamily: "Inter_700Bold",
    letterSpacing: 8,
    lineHeight: Math.min(width * 0.17, 64),
    marginBottom: 16,
  },
  heroSub: {
    color: "rgba(245,237,214,0.75)",
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    marginBottom: 32,
    lineHeight: 23,
  },
  heroCtas: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  ghostBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ghostBtnText: {
    color: "#C9A84C",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
  },
  quickLinks: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },
  quickLink: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: "rgba(13,10,7,0.55)",
    gap: 6,
  },
  quickLinkIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLinkText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.3,
    color: "#F5EDD6",
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.3,
  },
  seeAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  hList: {
    paddingRight: 20,
    marginLeft: -4,
    paddingBottom: 4,
  },
  bridalFeature: {
    height: 260,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 28,
    marginBottom: 24,
    justifyContent: "flex-end",
  },
  bridalContent: {
    padding: 22,
    gap: 10,
  },
  bridalEyebrow: {
    color: "#C9A84C",
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 3,
  },
  bridalTitle: {
    color: "#F5EDD6",
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 15,
  },
  ctaBlock: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.4,
    lineHeight: 32,
    marginBottom: 10,
  },
  ctaSub: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    marginBottom: 20,
  },
  ctaBtns: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  ctaIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
