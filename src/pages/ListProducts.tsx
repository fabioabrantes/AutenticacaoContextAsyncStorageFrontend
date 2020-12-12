import React,{useState} from 'react';
import { ScrollView, View,StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import api from '../services/api';

import styles from './styles/ListProducts';

interface Product{
  id:number;
  name:string;
  price:number;
  description:string;
}
const ListProduct: React.FC = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  
  useFocusEffect(()=>{
    api.get('products').then(response =>{
      setProducts(response.data);
    })
  })

  function goToPageProductDetail(id:number){
    navigation.navigate('ProductDetails',{id});
  }

  function goToPageCreateProduct(){
    navigation.navigate('ProductData');
  }

  return (
    <ScrollView style={styles.container}>
     
      <Text style={styles.itemProductTitle}>Lista de Produtos</Text>
      {
        products.map(product =>
          <View key={product.id} style={styles.itemProductContainer}>
            <Text style={styles.itemProductName}>{product.name}</Text>
            <TouchableOpacity 
              style={styles.goToProductDetailButton} 
              onPress={() => goToPageProductDetail(product.id)}
            >
              <Feather name="arrow-right" size={20} color="#fff"/>
            </TouchableOpacity>
          </View>
        )
      }  

      <View style={styles.createProductContainer}>
        <Text style={styles.createProductText}>Cadastrar Produtos </Text>
        <RectButton style={styles.createProductButton} onPress={goToPageCreateProduct}>
          <Feather name="plus" size={20} color="#fff"/>
        </RectButton>
      </View>
  </ScrollView>
  );
}


export default ListProduct;