import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  compact?: boolean;
};

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const colors = useColors();
  const router = useRouter();
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 50 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePress = () => {
    router.push({ pathname: "/service/[id]", params: { id: service.id } } as never);
  };

  if (compact) {
    return (
      <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <LinearGradient
            colors={[service.gradientColors[0] + "CC", service.gradientColors[1] + "33"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.compact, { borderColor: service.gradientColors[1] + "55" }]}
          >
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: service.gradientColors[1] + "33" },
              ]}
            >
              <Feather name={service.icon as any} size={20} color={service.gradientColors[1]} />
            </View>
            <Text style={[styles.compactName, { color: colors.foreground }]}>
              {service.name}
            </Text>
            <Text style={[styles.compactPrice, { color: service.gradientColors[1] }]}>
              {service.price}
            </Text>
          </LinearGradient>
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient
          colors={[service.gradientColors[0] + "BB", "#1A1209"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, { borderColor: service.gradientColors[1] + "44" }]}
        >
          <View style={styles.cardTop}>
            <LinearGradient
              colors={service.gradientColors}
              style={styles.iconCircle}
            >
              <Feather name={service.icon as any} size={22} color="#0D0A07" />
            </LinearGradient>
            <View style={styles.cardMeta}>
              <Text style={[styles.duration, { color: colors.mutedForeground }]}>
                {service.duration}
              </Text>
              <Text style={[styles.price, { color: service.gradientColors[1] }]}>
                {service.price}
              </Text>
            </View>
          </View>
          <Text style={[styles.cardName, { color: colors.foreground }]}>
            {service.name}
          </Text>
          <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>
            {service.description}
          </Text>
          <View style={[styles.viewMore, { borderTopColor: service.gradientColors[1] + "33" }]}>
            <Text style={[styles.viewMoreText, { color: service.gradientColors[1] }]}>
              View Details
            </Text>
            <Feather name="arrow-right" size={14} color={service.gradientColors[1]} />
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardMeta: {
    alignItems: "flex-end",
  },
  duration: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  cardName: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  cardDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
    marginBottom: 14,
  },
  viewMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  viewMoreText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.5,
  },
  compact: {
    width: 140,
    height: 155,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    justifyContent: "flex-end",
  },
  compactName: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  compactPrice: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
});
