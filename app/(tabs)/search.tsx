import PageWrapper from "@/components/pageWrapper";
import { STORAGE_KEY } from "@/constant/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Search, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const search = () => {
  const [query, setQuery] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    };

    loadHistory();
  }, []);

  const saveHistory = async (newHistory: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };

  const handleSearch = () => {
    if (query.trim() === "") return;

    if (!history.includes(query)) {
      const updatedHistory = [query, ...history];
      setHistory(updatedHistory);
      saveHistory(updatedHistory);
    }

    setQuery("");
    router.push("/product");

    console.log("Searching for:", query);
  };

  const handleSelectHistory = (item: string) => {
    setQuery(item);
  };

  const handleDeleteHistoryItem = (itemToDelete: string) => {
    const updatedHistory = history.filter((item) => item !== itemToDelete);
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  };

  return (
    <PageWrapper className="px-4">
      <View className="flex-row items-center gap-x-3 my-5">
        <TextInput
          className="flex-1 border border-white bg-white rounded-xl p-4"
          placeholder="Search Something"
          maxLength={40}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => handleSearch()}
          returnKeyType="search"
          autoFocus
        />
        <TouchableOpacity onPress={handleSearch}>
          <Search color="white" />
        </TouchableOpacity>
      </View>

      {history.length > 0 && (
        <View className="">
          <FlatList
            data={history}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-white rounded-lg p-4 flex-row justify-between items-center"
                onPress={() => router.push("/product")}
              >
                <TouchableOpacity onPress={() => handleSelectHistory(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteHistoryItem(item)}>
                  <X color="red" size={18} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </View>
      )}
    </PageWrapper>
  );
};

export default search;
