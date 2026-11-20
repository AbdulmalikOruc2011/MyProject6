import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types/product';

interface HomeScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenAddProduct: () => void;
}

export default function HomeScreen({
  products,
  onSelectProduct,
  onOpenAddProduct,
}: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Catalog</Text>
            <Text style={styles.subtitle}>{products.length} products available</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={onOpenAddProduct}
            activeOpacity={0.82}
          >
            <Ionicons name="add" size={20} color="#ffffff" />
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => onSelectProduct(item)}
              activeOpacity={0.85}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />

              <View style={styles.cardInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={styles.productPrice}>{item.price.toFixed(2)} AZN</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1120',
    paddingTop: 36,
    paddingHorizontal: 16,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: Platform.select({
      ios: 14,
      android: 8,
      default: 10,
    }),
    backgroundColor: Platform.select({
      ios: '#0ea5e9',
      android: '#16a34a',
      default: '#2563eb',
    }),
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 32,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131c31',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 14,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#1e293b',
  },
  cardInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
  },
  productDescription: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 3,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#38bdf8',
    marginTop: 6,
  },
});