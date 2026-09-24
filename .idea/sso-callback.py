import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";
import { View, ActivityIndicator } from "react-native";

export default function SSOCallback() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/(tabs)");
    }
    // no else branch — just wait, don't force back to (auth)
  }, [isLoaded, isSignedIn, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0D0D0F",
      }}
    >
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}
