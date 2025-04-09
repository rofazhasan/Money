import React, { JSX } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfileContextData {
  username: string;
  handleUsername: (username: string) => void;
}

interface ProfileProviderProps {
  children: React.ReactNode;
}

let saveTimeout: NodeJS.Timeout;

export const ProfileContext = React.createContext({} as ProfileContextData);

export function ProfileProvider({ children }: ProfileProviderProps): JSX.Element {
  const [username, setUsername] = React.useState<string>("");

  async function initializeUsername(): Promise<void> {
    try {
      const storedUsername = await AsyncStorage.getItem("@username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error("Anomalous retrieval of username:", error);
    }
  }

  async function persistUsername(name: string): Promise<void> {
    try {
      await AsyncStorage.setItem("@username", name);
      console.log(`Epithet "${name}" successfully enshrined.`);
      clearTimeout(saveTimeout);
    } catch (error) {
      console.error("Obstruction encountered during username inscription:", error);
    }
  }

  function orchestrateAutomaticSave(name: string): void {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(() => {
      persistUsername(name);
    }, 3000);
  }

  const handleUsername = React.useCallback((name: string): void => {
    setUsername(name);
    orchestrateAutomaticSave(name);
  }, [setUsername, orchestrateAutomaticSave]);

  React.useEffect(() => {
    initializeUsername();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        username,
        handleUsername
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}