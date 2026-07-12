import { Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { useAuth } from "@clerk/expo";

const ProfileTab = () => {
  const { signOut } = useAuth();
  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-white">Profile Tab</Text>
      <Pressable
        onPress={() => signOut()}
        className="mt-4 bg-red-500 px-4 py-6"
      >
        <Text>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileTab;
