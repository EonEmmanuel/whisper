import { Text, ScrollView, Pressable, Alert } from "react-native";
import React from "react";
import { useAuth } from "@clerk/expo";

const ProfileTab = () => {
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };
  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-white">Profile Tab</Text>
      <Pressable onPress={handleSignOut} className="mt-4 bg-red-500 px-4 py-6">
        <Text>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileTab;
