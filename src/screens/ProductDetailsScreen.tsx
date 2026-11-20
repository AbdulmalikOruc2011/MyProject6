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

interface ProductDetailsScreenProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onGoBack: () => void;
}

export default function ProductDetailsScreen({
  product,
  onSave,
  onGoBack,
}: ProductDetailsScreenProps) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);

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

  const handleSaveChanges = () => {
    const trimmedName = name.trim();
    const parsedPrice = parseFloat(price.replace(',', '.'));
    const trimmedDesc = description.trim();

    if (!trimmedName || isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid name and positive price.');
      return;
    }

    onSave({
      ...product,
      name: trimmedName,
      price: parsedPrice,
      description: trimmedDesc,
      imageUrl,
    });
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
            <Text style={styles.headerTitle}>Product Details</Text>
            <View style={styles.spacer} />
          </View>

          <View style={styles.imageSection}>
            <Image source={{ uri: imageUrl }} style={styles.previewImage} />
            <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
              <Ionicons name="camera-outline" size={18} color="#f8fafc" />
              <Text style={styles.photoButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Product name"
              placeholderTextColor="#64748b"
            />

            <Text style={styles.label}>Price (AZN)</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              placeholderTextColor="#64748b"
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Product description"
              placeholderTextColor="#64748b"
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
              activeOpacity={0.85}
            >
              <Ionicons name="checkmark" size={20} color="#ffffff" />
              <Text style={styles.saveButtonText}>Save</Text>
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
  saveButton: {
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
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});