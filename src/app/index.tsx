import React, { useState } from 'react';
import { Product } from '../types/product';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AddProductScreen from '../screens/AddProductScreen';

type ActiveRoute =
  | { name: 'home' }
  | { name: 'details'; product: Product }
  | { name: 'add' };

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 85,
    description: 'Over-ear noise-cancelling headphones with long battery life.',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    price: 120,
    description: 'Compact tactile keyboard built for fast typing and coding.',
    imageUrl:
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'Smart Watch',
    price: 150,
    description: 'Fitness tracking watch with water resistance and AMOLED display.',
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
];

export default function AppEntry() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [route, setRoute] = useState<ActiveRoute>({ name: 'home' });

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setRoute({ name: 'home' });
  };

  const handleAddProduct = (created: Product) => {
    setProducts((prev) => [created, ...prev]);
  };

  if (route.name === 'details') {
    return (
      <ProductDetailsScreen
        product={route.product}
        onSave={handleUpdateProduct}
        onGoBack={() => setRoute({ name: 'home' })}
      />
    );
  }

  if (route.name === 'add') {
    return (
      <AddProductScreen
        onAddProduct={handleAddProduct}
        onGoBack={() => setRoute({ name: 'home' })}
      />
    );
  }

  return (
    <HomeScreen
      products={products}
      onSelectProduct={(product) => setRoute({ name: 'details', product })}
      onOpenAddProduct={() => setRoute({ name: 'add' })}
    />
  );
}