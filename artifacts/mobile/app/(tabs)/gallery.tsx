import React, { useState, useEffect, useCallback } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");
const COL_GAP = 10;
const COL_WIDTH = (width - 40 - COL_GAP) / 2;

const CATEGORIES = ["All", "Spa", "Hair", "Bridal", "Nails", "Skincare"];

type UploadedImage = {
  id: string;
  uri: string;
  label: string;
  category: string;
  createdAt: string;
};

const UPLOADS_KEY = "gallery_uploads";

function UploadCard({
  image,
  onDelete,
}: {
  image: UploadedImage;
  onDelete: (id: string) => void;
}) {
  const height = COL_WIDTH * 1.2;

  return (
    <View style={[styles.card, { height }]}>
      <Image
        source={{ uri: image.uri }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.uploadMeta}>
        <Text style={styles.cardLabel} numberOfLines={1}>
          {image.label}
        </Text>
        <Text style={styles.cardCategory}>{image.category}</Text>
      </View>
      <Pressable style={styles.deleteBtn} onPress={() => onDelete(image.id)}>
        <Feather name="trash-2" size={14} color="#fff" />
      </Pressable>
    </View>
  );
}

export default function GalleryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;
  const [active, setActive] = useState("All");
  const [uploads, setUploads] = useState<UploadedImage[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newCategory, setNewCategory] = useState("Spa");

  useEffect(() => {
    AsyncStorage.getItem(UPLOADS_KEY).then((data) => {
      if (data) setUploads(JSON.parse(data));
    });
  }, []);

  const saveUploads = useCallback(
    async (updated: UploadedImage[]) => {
      setUploads(updated);
      await AsyncStorage.setItem(UPLOADS_KEY, JSON.stringify(updated));
    },
    [],
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      ...(Platform.OS !== "web" ? { base64: true } : {}),
    });

    if (result.canceled || !result.assets?.[0]) return;

    const asset = result.assets[0];
    let uri = asset.uri;

    if (Platform.OS === "web") {
      const resp = await fetch(asset.uri);
      const blob = await resp.blob();
      const reader = new FileReader();
      const b64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      uri = b64;
    }

    const newImage: UploadedImage = {
      id: Date.now().toString(),
      uri,
      label: newLabel.trim() || asset.fileName || `Upload ${uploads.length + 1}`,
      category: newCategory,
      createdAt: new Date().toISOString(),
    };

    await saveUploads([newImage, ...uploads]);
    setNewLabel("");
    setShowUpload(false);
  };

  const deleteImage = (id: string) => {
    const updated = uploads.filter((u) => u.id !== id);
    saveUploads(updated);
  };

  const filtered =
    active === "All" ? uploads : uploads.filter((i) => i.category === active);

  const left = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 !== 0);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: topPad + 24, paddingHorizontal: 20 }}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>OUR GALLERY</Text>
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
              {cat} {cat !== "All" && `(${uploads.filter((u) => u.category === cat).length})`}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {!showUpload ? (
        <View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
          <Pressable
            onPress={() => setShowUpload(true)}
            style={[styles.uploadBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
          >
            <Feather name="plus" size={18} color={colors.primary} />
            <Text style={[styles.uploadText, { color: colors.foreground }]}>
              Upload Image
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.uploadForm, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TextInput
            value={newLabel}
            onChangeText={setNewLabel}
            placeholder="Image label (optional)"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.formInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.foreground }]}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 6 }}
          >
            {CATEGORIES.filter((c) => c !== "All").map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setNewCategory(cat)}
                style={[
                  styles.catChip,
                  {
                    backgroundColor: newCategory === cat ? colors.primary : colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color: newCategory === cat ? colors.primaryForeground : colors.mutedForeground,
                    fontSize: 12,
                    fontFamily: "Inter_500Medium",
                  }}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={pickImage}
              style={[styles.formSubmit, { backgroundColor: colors.primary, flex: 1 }]}
            >
              <Feather name="image" size={16} color={colors.primaryForeground} />
              <Text style={[styles.formSubmitText, { color: colors.primaryForeground }]}>
                Choose & Upload
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setShowUpload(false)}
              style={[styles.formSubmit, { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border }]}
            >
              <Text style={[styles.formSubmitText, { color: colors.mutedForeground }]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      )}

      {filtered.length === 0 ? (
        <View style={{ paddingHorizontal: 20, paddingTop: 40, alignItems: "center" }}>
          <Feather name="image" size={40} color={colors.mutedForeground} />
          <Text style={{ color: colors.mutedForeground, marginTop: 12, fontFamily: "Inter_400Regular", fontSize: 14 }}>
            {active === "All"
              ? "No images yet. Tap Upload to add your first image."
              : `No images in ${active}. Tap Upload to add one.`}
          </Text>
        </View>
      ) : (
        <View style={styles.masonry}>
          <View style={styles.col}>
            {left.map((item) => (
              <UploadCard key={item.id} image={item} onDelete={deleteImage} />
            ))}
          </View>
          <View style={styles.col}>
            {right.map((item) => (
              <UploadCard key={item.id} image={item} onDelete={deleteImage} />
            ))}
          </View>
        </View>
      )}
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
    paddingBottom: 8,
    paddingTop: 4,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  uploadText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  uploadForm: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    gap: 12,
  },
  formInput: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1,
  },
  formSubmit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
  },
  formSubmitText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
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
  cardCategory: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  uploadMeta: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  deleteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(220, 38, 38, 0.85)",
    borderRadius: 20,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
