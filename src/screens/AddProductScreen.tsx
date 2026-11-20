import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Product, saveImageToDeviceStorage } from '../types/product';

const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';

interface AddProductScreenProps {
  onAddProduct: (newProduct: Product) => void;
  onGoBack: () => void;
}

export default function AddProductScreen({
  onAddProduct,
  onGoBack,
}: AddProductScreenProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(DEFAULT_PRODUCT_IMAGE);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      const savedUri = await saveImageToDeviceStorage(result.assets[0].uri);
      setImageUrl(savedUri);
    }
  };

  const handleCreate = () => {
    const trimmedName = name.trim();
    const parsedPrice = parseFloat(price.replace(',', '.'));
    const trimmedDesc = description.trim() || 'No description provided.';

    if (!trimmedName || isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Invalid Input', 'Please enter a product name and valid price.');
      return;
    }

    const created: Product = {
      id: Date.now().toString(),
      name: trimmedName,
      price: parsedPrice,
      description: trimmedDesc,
      imageUrl,
    };

    onAddProduct(created);
    onGoBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
              <Ionicons name="arrow-back" size={20} color="#f8fafc" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Product</Text>
            <View style={styles.spacer} />
          </View>

          <View style={styles.imageSection}>
            <Image source={{ uri: imageUrl }} style={styles.previewImage} />
            <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
              <Ionicons name="folder-open-outline" size={18} color="#f8fafc" />
              <Text style={styles.photoButtonText}>Pick Image from Device</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter product name..."
              placeholderTextColor="#64748b"
            />

            <Text style={styles.label}>Price (AZN)</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price..."
              placeholderTextColor="#64748b"
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description..."
              placeholderTextColor="#64748b"
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCreate}
              activeOpacity={0.85}
            >
              <Ionicons name="add-circle-outline" size={20} color="#ffffff" />
              <Text style={styles.submitButtonText}>Create Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1120',
  },
  scrollContent: {
    paddingTop: 36,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#131c31',
  },
  backText: {
    color: '#f8fafc',
    fontWeight: '600',
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
  },
  spacer: {
    width: 66,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  previewImage: {
    width: 220,
    height: 150,
    borderRadius: 16,
    backgroundColor: '#131c31',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1e293b',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
  },
  photoButtonText: {
    color: '#f8fafc',
    fontWeight: '600',
    fontSize: 13,
  },
  formCard: {
    backgroundColor: '#131c31',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  label: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#0b1120',
    color: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: Platform.select({
      ios: 14,
      android: 8,
      default: 12,
    }),
    backgroundColor: Platform.select({
      ios: '#0ea5e9',
      android: '#16a34a',
      default: '#2563eb',
    }),
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});