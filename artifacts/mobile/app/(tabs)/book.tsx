import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { GlowButton } from "@/components/GlowButton";
import { BRIDAL_PACKAGES, SERVICES } from "@/data/services";
import { useColors } from "@/hooks/useColors";

const WHATSAPP_NUMBERS = ["9000243600"];

const TIMES = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM",
];

function openWhatsApp(number: string, message: string) {
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
  if (Platform.OS === "web") {
    window.open(url, "_blank");
  } else {
    Linking.openURL(url).catch(() => {});
  }
}

function sendToWhatsApp(numbers: string[], message: string) {
  numbers.forEach((num) => openWhatsApp(num, message));
}

function formatBookingMessage(
  name: string,
  phone: string,
  service: string,
  serviceDetails: string,
  time: string,
  notes: string,
) {
  let msg = `*New Booking Request*\n\n`;
  msg += `*Name:* ${name}\n`;
  msg += `*Phone:* ${phone}\n`;
  msg += `*Service:* ${service}\n`;
  if (serviceDetails) msg += `${serviceDetails}\n`;
  msg += `*Preferred Time:* ${time}\n`;
  if (notes) msg += `*Special Requests:* ${notes}\n`;
  return msg;
}

export default function BookScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ packageId?: string }>();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  const preselectedPackage = params.packageId
    ? BRIDAL_PACKAGES.find((p) => p.id === params.packageId)
    : null;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(
    preselectedPackage ? preselectedPackage.name : null,
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const handleBook = async () => {
    if (!name.trim()) {
      Alert.alert("Missing Details", "Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      Alert.alert("Missing Details", "Please enter your phone number.");
      return;
    }
    if (!selectedService) {
      Alert.alert("Missing Details", "Please select a service.");
      return;
    }
    if (!selectedTime) {
      Alert.alert("Missing Details", "Please select a preferred time.");
      return;
    }

    setLoading(true);
    try {
      const serviceDetails = preselectedPackage
        ? preselectedPackage.includes.map((s) => `  • ${s}`).join("\n")
        : "";

      const msg = formatBookingMessage(
        name.trim(),
        phone.trim(),
        selectedService,
        serviceDetails,
        selectedTime,
        notes.trim(),
      );

      sendToWhatsApp(WHATSAPP_NUMBERS, msg);

      const appointment = {
        id: Date.now().toString(),
        name: name.trim(),
        phone: phone.trim(),
        service: selectedService,
        time: selectedTime,
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
      };

      const existing = await AsyncStorage.getItem("appointments");
      const all = existing ? JSON.parse(existing) : [];
      all.unshift(appointment);
      await AsyncStorage.setItem("appointments", JSON.stringify(all));

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      Alert.alert(
        "Appointment Requested",
        `Thank you, ${name}! Your details have been sent via WhatsApp.`,
        [{ text: "Done", onPress: () => {
          setName(""); setPhone(""); setSelectedService(null);
          setSelectedTime(null); setNotes("");
        }}]
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedServiceObj = SERVICES.find((s) => s.id === selectedService);
  const serviceDisplayName = preselectedPackage
    ? `${preselectedPackage.name} (${preselectedPackage.price})`
    : selectedServiceObj?.name;
  const inputStyle = [styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <LinearGradient
        colors={["#1A1209", colors.background]}
        style={[styles.headerGrad, { paddingTop: topPad + 24 }]}
      >
        <Text style={[styles.eyebrow, { color: colors.primary }]}>SPA PRDTR</Text>
        <Text style={[styles.heading, { color: colors.foreground }]}>Book Appointment</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>
          Reserve your moment of luxury — we will confirm within 2 hours.
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quickActions}>
          <Pressable
            style={[styles.qBtn, { backgroundColor: colors.card, borderColor: "#25D366" + "44" }]}
            onPress={() => sendToWhatsApp(WHATSAPP_NUMBERS, "Hi! I'd like to book an appointment at Spa Prdtr.")}
          >
            <Feather name="message-circle" size={18} color="#25D366" />
            <Text style={[styles.qBtnText, { color: colors.foreground }]}>WhatsApp</Text>
          </Pressable>
          <Pressable style={[styles.qBtn, { backgroundColor: colors.card, borderColor: colors.primary + "44" }]}>
            <Feather name="phone" size={18} color={colors.primary} />
            <Text style={[styles.qBtnText, { color: colors.foreground }]}>Call Us</Text>
          </Pressable>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]}>
          <Text style={[styles.dividerText, { color: colors.mutedForeground, backgroundColor: colors.background }]}>
            or fill the form below
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>FULL NAME</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={colors.mutedForeground}
            style={inputStyle}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>PHONE NUMBER</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="+971 50 000 0000"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="phone-pad"
            style={inputStyle}
          />
        </View>

        {preselectedPackage && (
          <View style={[styles.section, { backgroundColor: colors.card, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: preselectedPackage.color + "44" }]}>
            <Text style={[styles.label, { color: preselectedPackage.color }]}>SELECTED PACKAGE</Text>
            <Text style={[styles.packageName, { color: colors.foreground, fontSize: 18, fontFamily: "Inter_700Bold", marginBottom: 8 }]}>
              {preselectedPackage.name}
            </Text>
            <Text style={[styles.packagePrice, { color: preselectedPackage.color, fontSize: 16, fontFamily: "Inter_700Bold", marginBottom: 12 }]}>
              {preselectedPackage.price}
            </Text>
            {preselectedPackage.includes.map((item) => (
              <View key={item} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Feather name="check" size={12} color={preselectedPackage.color} />
                <Text style={{ color: colors.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular" }}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>SERVICE</Text>
          <Pressable
            onPress={() => setServiceOpen(!serviceOpen)}
            style={[styles.input, styles.picker, { backgroundColor: colors.card, borderColor: serviceOpen ? colors.primary : colors.border }]}
          >
            <Text style={{ color: serviceDisplayName ? colors.foreground : colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 15 }}>
              {serviceDisplayName || "Select a service"}
            </Text>
            <Feather name={serviceOpen ? "chevron-up" : "chevron-down"} size={16} color={colors.mutedForeground} />
          </Pressable>
          {serviceOpen && (
            <View style={[styles.dropdown, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {SERVICES.map((svc) => (
                <Pressable
                  key={svc.id}
                  onPress={() => { setSelectedService(svc.id); setServiceOpen(false); }}
                  style={[
                    styles.dropdownItem,
                    { borderBottomColor: colors.border },
                    selectedService === svc.id && { backgroundColor: colors.primary + "22" },
                  ]}
                >
                  <Text style={[styles.dropdownText, { color: selectedService === svc.id ? colors.primary : colors.foreground }]}>
                    {svc.name}
                  </Text>
                  <Text style={[styles.dropdownPrice, { color: colors.mutedForeground }]}>{svc.price}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>PREFERRED TIME</Text>
          <View style={styles.timeGrid}>
            {TIMES.map((t) => (
              <Pressable
                key={t}
                onPress={() => setSelectedTime(t)}
                style={[
                  styles.timeChip,
                  {
                    backgroundColor: selectedTime === t ? colors.primary : colors.card,
                    borderColor: selectedTime === t ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    { color: selectedTime === t ? colors.primaryForeground : colors.mutedForeground },
                  ]}
                >
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>SPECIAL REQUESTS</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Any preferences or notes..."
            placeholderTextColor={colors.mutedForeground}
            multiline
            numberOfLines={4}
            style={[inputStyle, styles.textarea]}
          />
        </View>

        <GlowButton
          label={loading ? "Sending..." : "Confirm Booking"}
          onPress={handleBook}
          style={{ marginTop: 8 }}
          size="lg"
        />

        <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
          We will confirm your appointment via WhatsApp or phone call within 2 hours during working hours (10 AM – 8 PM).
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerGrad: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 3,
    marginBottom: 10,
  },
  heading: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  sub: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 23,
  },
  content: {
    paddingHorizontal: 20,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  qBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
  },
  qBtnText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  divider: {
    height: 1,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  dividerText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    paddingHorizontal: 14,
    top: -10,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  picker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    marginTop: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  dropdownPrice: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  timeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  timeText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
  },
  packageName: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
  },
  packagePrice: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 12,
  },
});
