import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

function useSocialAuth() {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // Session was created, you can handle it here if needed
        console.log("Session created with ID:", createdSessionId);
      }
    } catch (error) {
      console.error("Error during social authentication:", error);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(
        "Authentication Error",
        `Failed to sign in with ${provider}. Please try again or use another method.`,
      );
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
}

export default useSocialAuth;
