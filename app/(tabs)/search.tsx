import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Search, X } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORAGE_KEY = 'SEARCH_HISTORY';

const search = () => {
  const [query, setQuery] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    };

    loadHistory();
  }, []);

  const saveHistory = async (newHistory: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error('Failed to save history:', e);
    }
  };

  const handleSearch = () => {
    if (query.trim() === '') return;

    if (!history.includes(query)) {
      const updatedHistory = [query, ...history];
      setHistory(updatedHistory);
      saveHistory(updatedHistory);
    }

    console.log('Searching for:', query);
  };

  const handleSelectHistory = (item: string) => {
    setQuery(item);
    // Optionally auto-search:
    // handleSearch();
  };

  const handleDeleteHistoryItem = (itemToDelete: string) => {
    const updatedHistory = history.filter(item => item !== itemToDelete);
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-blue-500">
      <View className="flex-row items-center gap-x-3 my-5">
        <TextInput
          className="flex-1 border border-white bg-white rounded-xl p-4"
          placeholder="Search Something"
          maxLength={40}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Search color="white" />
        </TouchableOpacity>
      </View>

      {history.length > 0 && (
        <View className="bg-white rounded-lg p-4">
          <FlatList
            data={history}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center mb-2">
                <TouchableOpacity onPress={() => handleSelectHistory(item)}>
                  <Text className="text-blue-600">{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteHistoryItem(item)}>
                  <X color="red" size={18} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default search;