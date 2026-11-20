import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export async function saveImageToDeviceStorage(sourceUri: string): Promise<string> {
  if (Platform.OS === 'web' || !FileSystem.documentDirectory) {
    return sourceUri;
  }

  const cleanName = sourceUri.split('/').pop()?.split('?')[0] || 'product.jpg';
  const extMatch = cleanName.match(/\.[a-zA-Z0-9]+$/);
  const ext = extMatch ? extMatch[0] : '.jpg';
  const targetDir = `${FileSystem.documentDirectory}products/`;
  const targetUri = `${targetDir}${Date.now()}-${Math.floor(Math.random() * 10000)}${ext}`;

  await FileSystem.makeDirectoryAsync(targetDir, { intermediates: true });
  await FileSystem.copyAsync({ from: sourceUri, to: targetUri });

  return targetUri;
}