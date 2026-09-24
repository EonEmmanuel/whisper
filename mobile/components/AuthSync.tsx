import { useAuthCallback } from "../hooks/useAuth";
import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/expo";

const AuthSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useAuthCallback();
  const hasSynched = useRef(false); // this is used to not run useEffect more than once

  useEffect(() => {
    if (isSignedIn && user && !hasSynched.current) {
      hasSynched.current = true;

      syncUser(undefined, {
        onSuccess: (data) => {
          console.log("✅ User synched with backend:", data.user.name);
        },
        onError: (error) => {
          console.log(
            "❌ User synched failed:",
            error.message,
            error.response?.status,
            error.response?.data,
          );
        },
      });
    }

    if (!isSignedIn) {
      hasSynched.current = false;
    }
  }, [isSignedIn, user, syncUser]);

  return null;
};

export default AuthSync;
