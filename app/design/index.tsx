import DraggableImage from '@/components/dragableImages';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { ChevronDown, ChevronLeft, ImagePlus } from 'lucide-react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-get-random-values';
import { useLocalSearchParams } from "expo-router";
import { v4 as uuidv4 } from 'uuid';
import ViewShot, { captureRef } from "react-native-view-shot";
import { API_CLOUDINARY } from '@/constant/env';

  type CustomImage = {
    id: string;
    uri: string;
    position: { x: number; y: number };
    zIndex: number;
    scale: number;
    side: 'Front' | 'Back';
    shape: 'none' | 'circle' | 'square';
  };

export default function Design() {
  const MAX_IMAGES = 3;
  const IMAGE_SIZE = 100;
  const CONTAINER_WIDTH = 300;
  const CONTAINER_HEIGHT = 340;

  const [frontImages, setFrontImages] = useState<CustomImage[]>([]);
  const [backImages, setBackImages] = useState<CustomImage[]>([]);
  const [frontWidth, setFrontWidth] = useState<string>('');
  const [backWidth, setBackWidth] = useState<string>('');
  const parsedFrontWidth = parseFloat(frontWidth);
  const parsedBackWidth = parseFloat(backWidth);
  const [view, setView] = useState<'Front' | 'Back'>('Front');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

    const increment = () => {
    setQuantity(prev => (prev < 100 ? prev + 1 : prev));
  };

  const decrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : prev));
  };

  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [color, setColor] = useState('#000000');
  const [textInput, setTextInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [designData, setDesignData] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState('Pilih Model');
  const [modelImage, setModelImage] = useState(require('@/assets/images/clothes/shirt_template.png'));

  const {isShortcut} = useLocalSearchParams();

  const models = [
    { label: 'Kaos Pendek', value: 'shirt_template' },
    { label: 'Kaos Panjang', value: 'kaosPanjang_template' },
    { label: 'Jaket', value: 'jaket_template' },
    { label: 'Sweater', value: 'sweater_template' }
  ];

  const getImageByValue = (value: string) => {
    switch (value) {
      case 'shirt_template':
        return require('@/assets/images/clothes/shirt_template.png');
      case 'kaosPanjang_template':
        return require('@/assets/images/clothes/kaosPanjang_template.png');
      case 'jaket_template':
        return require('@/assets/images/clothes/jaket_template.png');
      case 'sweater_template':
        return require('@/assets/images/clothes/sweater_template.png');
      default:
        return require('@/assets/images/clothes/shirt_template.png');
    }
  };

  useEffect(() => {
  let catStr = '';
  if (Array.isArray(category)) {
    catStr = category[0] ?? '';
  } else if (typeof category === 'string') {
    catStr = category;
  }

  console.log('Received category:', catStr);

  const normalizedCategory = catStr.toLowerCase().trim();
  console.log('Normalized category:', normalizedCategory);

  const categoryToModelValueMap: Record<string, string> = {
    'kaos pendek': 'shirt_template',
    'kaos panjang': 'kaosPanjang_template',
    'jaket': 'jaket_template',
    'sweater': 'sweater_template',
  };

  console.log('Keys available:', Object.keys(categoryToModelValueMap));
  const modelValue = categoryToModelValueMap[normalizedCategory];

  console.log('Model Value found:', modelValue);

  if (modelValue) {
    const matchedModel = models.find(model => model.value === modelValue);
    console.log('Matched model:', matchedModel);
    setSelectedModel(matchedModel?.label || 'Pilih Model');
    setModelImage(getImageByValue(modelValue));
  } else {
    console.log('No matching model, set default');
    setSelectedModel('Pilih Model');
    setModelImage(getImageByValue('shirt_template'));
  }
}, [category]);

const uploadToCloudinary = async (
  uri: string,
  side: 'front' | 'back'
): Promise<string | null> => {
  const data = new FormData();
  data.append('file', {
    uri,
    type: 'image/png',
    name: `design_${side}.png`, // Dinamis berdasarkan sisi
  } as any);
  data.append('upload_preset', 'pejebeel');

  try {
    const res = await fetch(API_CLOUDINARY, {
      method: 'POST',
      body: data,
    });
    const json = await res.json();
    return json.secure_url;
  } catch (err) {
    console.error('Cloudinary upload error', err);
    return null;
  }
};


const viewShotRef = useRef<ViewShot>(null);
const captureDesign = async (): Promise<string | null> => {
  try {
    return await viewShotRef.current?.capture?.() ?? null;
  } catch (error) {
    console.error('Capture failed', error);
    return null;
  }
};

// Checkout dan Simpan Desain
  const handleCheckout = async () => {
      const hasFrontChanges = frontImages.length > 0;
      const hasBackChanges = backImages.length > 0;
      const hasColorChange = color !== '#000000';
      const hasModelChange = selectedModel !== 'Pilih Model';

      if (!hasFrontChanges && !hasBackChanges && !hasColorChange && !hasModelChange) {
        Alert.alert('Info', 'Tidak ada perubahan');
        return;
      }

      if (!frontWidth || isNaN(parsedFrontWidth) || parsedFrontWidth <= 0) {
        Alert.alert('Error', 'Masukkan lebar depan yang valid.');
        return;
      }

      if (!backWidth || isNaN(parsedBackWidth) || parsedBackWidth <= 0) {
        Alert.alert('Error', 'Masukkan lebar belakang yang valid.');
        return;
      }

      if (!quantity || quantity < 1 || quantity > 100) {
      Alert.alert('Error', 'Masukkan jumlah pesanan antara 1 sampai 100.');
      return;
      }

    try {
      setIsLoading(true);

      // Capture Front
      setView('Front');
      await new Promise((res) => setTimeout(res, 300));
      const frontUri = await captureDesign();
      if (!frontUri) throw new Error('Gagal menangkap desain depan');
      const uploadedFrontUrl = await uploadToCloudinary(frontUri, 'front');
      if (!uploadedFrontUrl) throw new Error('Upload desain depan gagal');

      // Capture Back (jika ada)
      let uploadedBackUrl = null;
      if (hasBackChanges) {
        setView('Back');
        await new Promise((res) => setTimeout(res, 300));
        const backUri = await captureDesign();
        if (!backUri) throw new Error('Gagal menangkap desain belakang');
        uploadedBackUrl = await uploadToCloudinary(backUri, 'back');
        if (!uploadedBackUrl) throw new Error('Upload desain belakang gagal');
      }

      // Siapkan metadata desain
      const frontDesign = frontImages.map(img => ({
        id: img.id,
        uri: img.uri,
        position: img.position,
        scale: img.scale,
        zIndex: img.zIndex,
        shape: img.shape,
      }));

      const backDesign = backImages.map(img => ({
        id: img.id,
        uri: img.uri,
        position: img.position,
        scale: img.scale,
        zIndex: img.zIndex,
        shape: img.shape,
      }));

      const checkoutPayload = {
        id: uuidv4(),
        quantity,
        color,
        type: 'custom',
        product_custom: {
          front_image_path: uploadedFrontUrl,
          back_image_path: uploadedBackUrl,
          front_width: frontWidth,
          back_width: backWidth,
        },
        model: selectedModel,
        createdAt: new Date().toISOString(),
      };

      // Simpan ke state
      setDesignData(checkoutPayload);
      console.log('Checkout Data:', checkoutPayload);

      Alert.alert('Sukses', 'Desain berhasil disimpan untuk checkout!');
    } catch (error) {
      Alert.alert('Gagal', error instanceof Error ? error.message : 'Terjadi kesalahan tidak dikenal');
    } finally {
      setIsLoading(false);
    }
  };

const handleSelectModel = (label: string, value: string) => {
  setSelectedModel(label);
  setModelImage(getImageByValue(value));
  setShowDropdown(false);
};

const handleColorChange = (text: string) => {
  let input = text.replace(/^#/, '');
  input = input.replace(/[^0-9a-fA-F]/g, '');
  if (input.length > 6) input = input.slice(0, 6);
  setColor('#' + input);
};

const handleDeleteImage = () => {
  if (!selectedImageId) return;

  if (view === 'Front') {
    setFrontImages((imgs) => imgs.filter((img) => img.id !== selectedImageId));
  } else {
    setBackImages((imgs) => imgs.filter((img) => img.id !== selectedImageId));
  }

  setSelectedImageId(null);
};

const toggleView = (side: 'Front' | 'Back') => {
  setView(side);
  setSelectedImageId(null);
};

const pickImage = async () => {
  try {
    const currentImages = view === 'Front' ? frontImages : backImages;

    if (currentImages.length >= MAX_IMAGES) {
      Alert.alert('Maksimum Gambar Tercapai', `Maksimal ${MAX_IMAGES} gambar per sisi.`);
      return;
    }

    setIsLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      base64: false,
    });

   if (!result.canceled) {
    const localUri = result.assets[0].uri;

    const side = view.toLowerCase() === 'front' ? 'front' : 'back';

    const uploadedUrl = await uploadToCloudinary(localUri, side);

    if (!uploadedUrl) {
      Alert.alert('Error', 'Gagal upload gambar ke server');
      return;
    }

    const newImage: CustomImage = {
      id: Date.now().toString(),
      uri: uploadedUrl,
      position: { x: 0, y: 0 },
      zIndex: currentImages.length,
      scale: 1,
      side: view,
      shape: 'none',
    };

    if (view === 'Front') {
      setFrontImages((prev) => [...prev, newImage]);
    } else {
      setBackImages((prev) => [...prev, newImage]);
    }

    setSelectedImageId(newImage.id);
  }
} catch (error) {
  Alert.alert('Error', 'Gagal menambahkan gambar.');
} finally {
  setIsLoading(false);
}
};

  const onDragEnd = (id: string, x: number, y: number) => {
    if (view === 'Front') {
      setFrontImages((imgs) =>
        imgs.map((img) => (img.id === id ? { ...img, position: { x, y } } : img))
      );
    } else {
      setBackImages((imgs) =>
        imgs.map((img) => (img.id === id ? { ...img, position: { x, y } } : img))
      );
    }
  };

  const selectImage = (id: string) => {
    setSelectedImageId(id === selectedImageId ? null : id);
  };

  const moveLayer = (direction: 'up' | 'down') => {
  const updateZIndex = (images: CustomImage[]) => {
    const index = images.findIndex(img => img.id === selectedImageId);
    if (index === -1) return images;

    const newImages = [...images];
    const targetIndex = direction === 'up' ? index + 1 : index - 1;

    if (targetIndex < 0 || targetIndex >= images.length) return images;

    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;

    return newImages.map((img, i) => ({ ...img, zIndex: i }));
  };

  if (view === 'Front') {
    setFrontImages((imgs) => updateZIndex(imgs));
  } else {
    setBackImages((imgs) => updateZIndex(imgs));
  }
};

  return (
    <GestureHandlerRootView className='flex-1 bg-blue-500'>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <SafeAreaView className="flex-1 bg-blue-500">
          <ScrollView
              className="flex-1 px-5 py-2 bg-blue-500"
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
            <View className="mb-8">
              <ChevronLeft color={'white'} onPress={() => navigation.goBack()} />
            </View>

            <View className="items-start w-full">
              <View className="bg-white rounded-2xl p-4 self-center">
                <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
                  <View className="bg-gray-200 p-3 rounded-md border-2 border-blue-500 items-center justify-center">
                    <View style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}>
                      <Image
                        source={modelImage} 
                        className="absolute w-full h-full"
                        style={{ tintColor: color }}
                      />

                      {(view === 'Front' ? frontImages : backImages).map((img) => {
                        const posX = Math.min(Math.max(img.position.x, 0), CONTAINER_WIDTH - IMAGE_SIZE * img.scale);
                        const posY = Math.min(Math.max(img.position.y, 0), CONTAINER_HEIGHT - IMAGE_SIZE * img.scale);

                        return (
                          <DraggableImage
                            key={img.id}
                            img={{ ...img, position: { x: posX, y: posY } }}
                            containerWidth={CONTAINER_WIDTH}
                            containerHeight={CONTAINER_HEIGHT}
                            imageSize={IMAGE_SIZE}
                            onDragEnd={onDragEnd}
                            onScaleEnd={(id, scale) => {
                              if (view === 'Front') {
                                setFrontImages((imgs) =>
                                  imgs.map((img) => (img.id === id ? { ...img, scale } : img))
                                );
                              } else {
                                setBackImages((imgs) =>
                                  imgs.map((img) => (img.id === id ? { ...img, scale } : img))
                                );
                              }
                            }}
                            isSelected={img.id === selectedImageId}
                            onSelect={() => selectImage(img.id)}
                          />
                        );
                      })}
                    </View>
                  </View>
                </ViewShot>
              </View>

              <View className="flex-row items-center justify-between mt-6 w-full px-2">
                <TouchableOpacity
                  className={`w-[48%] py-5 rounded-xl items-center shadow ${
                    view === 'Front' ? 'bg-white' : 'bg-gray-300'
                  }`}
                  onPress={() => toggleView('Front')}
                >
                  <Text className={`font-bold text-xl ${view === 'Front' ? 'text-black' : 'text-gray-500'}`}>
                    Depan
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`w-[48%] py-5 rounded-xl items-center shadow ${
                    view === 'Back' ? 'bg-white' : 'bg-gray-300'
                  }`}
                  onPress={() => toggleView('Back')}
                >
                  <Text className={`font-bold text-xl ${view === 'Back' ? 'text-black' : 'text-gray-500'}`}>
                    Belakang
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-4 px-2 flex-row justify-between w-full">
                {/* Lebar Depan */}
                <View className="w-[48%] bg-white rounded-xl py-4 px-3 shadow">
                  <Text className="text-center font-bold text-gray-800 mb-1">Lebar Depan (cm)</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={frontWidth ?? ''}
                    onChangeText={(text) => {
                      const numeric = text.replace(/[^0-9.]/g, '');
                      const parsed = parseFloat(numeric);

                      if (!isNaN(parsed) && parsed > 60) {
                        setFrontWidth('60');
                      } else {
                        setFrontWidth(numeric);
                      }
                    }}
                    placeholder="0"
                    className="text-center text-xl text-black"
                  />
                </View>

                {/* Lebar Belakang */}
                <View className="w-[48%] bg-white rounded-xl py-4 px-3 shadow">
                  <Text className="text-center font-bold text-gray-800 mb-1">Lebar Belakang (cm)</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={backWidth ?? ''}
                    onChangeText={(text) => {
                      const numeric = text.replace(/[^0-9.]/g, '');
                      const parsed = parseFloat(numeric);

                      if (!isNaN(parsed) && parsed > 60) {
                        setBackWidth('60');
                      } else {
                        setBackWidth(numeric);
                      }
                    }}
                    placeholder="0"
                    className="text-center text-xl text-black"
                  />
                </View>
              </View>

              <View className="flex-row justify-between items-start mt-4 w-full px-2 space-x-2">
                <TextInput
                  className="bg-white border border-gray-300 px-4 py-3 rounded-xl text-center text-black w-[48%]"
                  placeholder="#000000"
                  value={color}
                  onChangeText={handleColorChange}
                  autoCapitalize="none"
                  keyboardType="default"
                />

                <View className="w-[48%] relative z-10">
                  <TouchableOpacity
                    disabled={Boolean(Number(isShortcut))}
                    onPress={() => setShowDropdown(!showDropdown)}
                    className={`bg-white px-4 py-3 rounded-xl shadow items-center flex-row justify-between${
                      Boolean(Number(isShortcut)) ? ' opacity-70' : ''
                    }`}
                  >
                    <Text className="text-black font-medium text-base">{selectedModel}</Text>
                    <ChevronDown size={16} color="black" />
                  </TouchableOpacity>

                  {showDropdown && (
                    <View className="mt-2 bg-white rounded-xl shadow border border-gray-200 max-h-48">
                      <ScrollView nestedScrollEnabled>
                        {models.map((model) => (
                          <TouchableOpacity
                            key={model.value}
                            onPress={() => {
                              setSelectedModel(model.label);
                              setModelImage(getImageByValue(model.value));
                              setShowDropdown(false);
                            }}
                            className="px-4 py-3 border-b border-gray-200"
                          >
                            <Text>{model.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>

              <View className="mt-4 mb-10 flex-row gap-2 justify-between w-full px-2">
                <TouchableOpacity
                  onPress={pickImage}
                  disabled={isLoading}
                  className={`w-[46%] flex-row items-center px-4 py-3 rounded-xl shadow space-x-2 ${
                    isLoading ? 'bg-gray-200' : 'bg-white'
                  }`}
                >
                  <ImagePlus color={isLoading ? '#999' : 'black'} size={22} />
                  <Text
                    className={`ml-2 font-medium text-base ${
                      isLoading ? 'text-gray-500' : 'text-black'
                    }`}
                  >
                    {isLoading ? 'Loading...' : 'Tambah Gambar'}
                  </Text>
                </TouchableOpacity>

                {selectedImageId && (
                  <View className="flex-1 gap-2">
                  <TouchableOpacity
                    onPress={handleDeleteImage}
                    className="bg-red-500 px-6 py-3 rounded-xl shadow items-center justify-center"
                  >
                    <Text className="text-white font-semibold text-base text-center">Hapus Gambar</Text>
                  </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (view === 'Front') {
                          setFrontImages((imgs) =>
                            imgs.map((img) =>
                              img.id === selectedImageId
                                ? {
                                    ...img,
                                    shape:
                                      img.shape === 'none'
                                        ? 'circle'
                                        : img.shape === 'circle'
                                        ? 'square'
                                        : 'none',
                                  }
                                : img
                            )
                          );
                        } else {
                          setBackImages((imgs) =>
                            imgs.map((img) =>
                              img.id === selectedImageId
                                ? {
                                    ...img,
                                    shape:
                                      img.shape === 'none'
                                        ? 'circle'
                                        : img.shape === 'circle'
                                        ? 'square'
                                        : 'none',
                                  }
                                : img
                            )
                          );
                        }
                      }}
                      className="bg-white px-6 py-3 rounded-xl shadow items-center justify-center"
                    >
                      <Text className="text-black font-semibold text-base text-center">Ubah Bentuk Gambar</Text>
                    </TouchableOpacity>

                    <View className="flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => moveLayer('up')}
                        className="flex-1 bg-white px-4 py-3 rounded-xl shadow items-center"
                      >
                        <Text className="text-black font-medium text-base">Naikkan Layer</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => moveLayer('down')}
                        className="flex-1 bg-white px-4 py-3 rounded-xl shadow items-center"
                      >
                        <Text className="text-black font-medium text-base">Turunkan Layer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>  
            
          <View className="w-full p-4 mb-4 ">
            <View className="flex-row items-center justify-between mb-4 bg-white p-4 rounded-xl">
              <Text className='text-black font-semibold text-lg'>
                Jumlah Pesanan:
              </Text>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  <Text className="text-white text-xl">-</Text>
                </TouchableOpacity>

                <Text className="mx-6 text-lg">{quantity}</Text>

                <TouchableOpacity
                  onPress={() => setQuantity(q => (q < 100 ? q + 1 : 100))}
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  <Text className="text-white text-xl">+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              className="bg-blue-500 py-4 border-2 border-white rounded-xl shadow items-center justify-center"
              onPress={handleCheckout}>
              <Text className="text-white font-bold text-xl">Tambah Keranjang</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}