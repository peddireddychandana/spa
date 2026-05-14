import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");
const COL_GAP = 10;
const COL_WIDTH = (width - 40 - COL_GAP) / 2;

const CATEGORIES = ["All", "Spa", "Hair", "Bridal", "Nails", "Skincare"];

type GalleryItem = {
  id: string;
  label: string;
  category: string;
  tall?: boolean;
  gradient: [string, string];
  localImage?: any;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    label: "Luxury Spa",
    category: "Spa",
    tall: true,
    gradient: ["#2C4A3E", "#4A8C7A"],
    localImage: require("@/assets/images/hero_spa.png"),
  },
  {
    id: "2",
    label: "Bridal Suite",
    category: "Bridal",
    gradient: ["#6D3B47", "#B76E79"],
    localImage: require("@/assets/images/bridal_hero.png"),
  },
  {
    id: "3",
    label: "Massage Room",
    category: "Spa",
    tall: true,
    gradient: ["#3D5A80", "#6B9CC4"],
    localImage: require("@/assets/images/spa_massage.png"),
  },
  {
    id: "4",
    label: "Hair Styling",
    category: "Hair",
    gradient: ["#8B6914", "#C9A84C"],
  },
  {
    id: "5",
    label: "Nail Artistry",
    category: "Nails",
    tall: true,
    gradient: ["#6B4F6E", "#A67FA6"],
  },
  {
    id: "6",
    label: "Skincare Ritual",
    category: "Skincare",
    gradient: ["#3D5A80", "#6B9CC4"],
  },
  {
    id: "7",
    label: "Bridal Makeup",
    category: "Bridal",
    tall: true,
    gradient: ["#7B3F5E", "#B76E79"],
  },
  {
    id: "8",
    label: "Reception",
    category: "Spa",
    gradient: ["#2C4A3E", "#C9A84C"],
  },
  {
    id: "9",
    label: "Balayage",
    category: "Hair",
    gradient: ["#8B6914", "#7A5C3A"],
  },
  {
    id: "10",
    label: "Facial Treatment",
    category: "Skincare",
    tall: true,
    gradient: ["#3D5A80", "#2C4A3E"],
  },
];

function GalleryCard({ item }: { item: GalleryItem }) {
  const height = item.tall ? COL_WIDTH * 1.5 : COL_WIDTH * 0.9;

  return (
    <Pressable style={[styles.card, { height }]}>
      {item.localImage ? (
        <>
          <Image
            source={item.localImage}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(13,10,7,0.7)"]}
            style={StyleSheet.absoluteFill}
          />
        </>
      ) : (
        <LinearGradient
          colors={item.gradient}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}
      <Text style={styles.cardLabel}>{item.label}</Text>
    </Pressable>
  );
}

export default function GalleryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.category === active);

  const left = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 !== 0);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: topPad + 24, paddingHorizontal: 20 }}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>OUR WORK</Text>
        <Text style={[styles.heading, { color: colors.foreground }]}>Gallery</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        style={{ paddingTop: 8 }}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setActive(cat)}
            style={[
              styles.filterPill,
              active === cat
                ? { backgroundColor: colors.primary }
                : { borderColor: colors.border, borderWidth: 1 },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { color: active === cat ? colors.primaryForeground : colors.mutedForeground },
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.masonry}>
        <View style={styles.col}>
          {left.map((item) => <GalleryCard key={item.id} item={item} />)}
        </View>
        <View style={styles.col}>
          {right.map((item) => <GalleryCard key={item.id} item={item} />)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 4,
  },
  filters: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 16,
    paddingTop: 4,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 100,
  },
  filterText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  masonry: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: COL_GAP,
  },
  col: {
    flex: 1,
    gap: COL_GAP,
  },
  card: {
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 12,
  },
  cardLabel: {
    color: "#F5EDD6",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.3,
  },
});
