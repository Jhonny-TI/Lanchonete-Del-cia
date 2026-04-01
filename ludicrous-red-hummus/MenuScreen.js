import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function MenuScreen({ navigation }) {

  const [items, setItems] = useState([
    // Lanches
    { id: '1', category: 'lanche', name: 'X-Burguer', desc: 'Pão, carne, queijo, alface, tomate', price: 12, qty: 0 },
    { id: '2', category: 'lanche', name: 'X-Salada', desc: 'Pão, carne, queijo, salada', price: 13, qty: 0 },
    { id: '3', category: 'lanche', name: 'X-Bacon', desc: 'Pão, carne, queijo, bacon', price: 14, qty: 0 },
    { id: '4', category: 'lanche', name: 'Dog-ao-molho', desc: 'Pão, salsicha, milho, batata-palha', price: 8, qty: 0 },
    { id: '5', category: 'lanche', name: 'Dog-na-chapa', desc: 'Pão, salsicha, milho, batata-palha', price: 8, qty: 0 },
    { id: '6', category: 'lanche', name: 'Dog-Bacon', desc: 'Pão, salsicha, milho, batata-palha,bacon', price: 9, qty: 0 },
    { id: '7', category: 'lanche', name: 'Dog-Frango', desc: 'Pão, frango-desfiado, milho, batata-palha', price: 10, qty: 0 },
    { id: '8', category: 'lanche', name: 'Dog-FranBacon', desc: 'Pão, frango-desfiado, milho, batata-palha, Bacon', price: 11, qty: 0 },
    
    // Bebidas 
    { id: '9', category: 'bebida', name: 'Refrigerante Lata', desc: '350ml', price: 5, qty: 0 },
    { id: '10', category: 'bebida', name: 'Suco Natural', desc: 'Laranja ou Limão 400ml', price: 7, qty: 0 },
    { id: '11', category: 'bebida', name: 'Água Mineral', desc: '500ml sem gás', price: 3, qty: 0 },

  //Aperitivos 
    { id: '12', category: 'aperitivo', name: 'Batata-Frita', desc: '350g', price: 5, qty: 0 },
    { id: '13', category: 'aperitivo', name: 'Batata-Chedar-Bacon', desc: '500g', price: 15, qty: 0 },
    { id: '14', category: 'aperitivo', name: 'Pasteiszinhos(12 un.)', desc: 'Carne ou queijo', price: 12, qty: 0 },
    { id: '20', category: 'aperitivo', name: 'Frango-Empanado(12 un.)', desc: 'petiscos de frango empanados', price: 3, qty: 0 },
  
  //Sobremesas 
    { id: '16', category: 'sobremesa', name: 'Sorvete-Casquinha', desc: 'baunilha, Chocolate, Misto', price: 5, qty: 0 },
    { id: '17', category: 'sobremesa', name: 'Milkshake', desc: 'Ovomaltine, Morango,Chocolate, Ninho', price: 10, qty: 0 },
    { id: '18', category: 'sobremesa', name: 'Açaí', desc: '300ml', price: 12, qty: 0 },
    
  ]);

  const updateQty = (id, delta) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ));
  };

  // Função para renderizar cada item
  const renderItem = ({ item, index }) => {
    // 1. Mostra Lanches se for o primeiríssimo item da lista
    const showLancheHeader = index === 0;

    // 2. Mostra Bebidas se o item atual for bebida E o anterior for lanche
    const showBebidaHeader = item.category === 'bebida' && items[index - 1]?.category === 'lanche';

    // 3. Mostra Aperitivos se o item atual for aperitivo E o anterior for bebida
    const showAperitivoHeader = item.category === 'aperitivo' && items[index - 1]?.category === 'bebida';
    // 3. Mostra Aperitivos se o item atual for aperitivo E o anterior for bebida
    const showSobremesaHeader = item.category === 'sobremesa' && items[index - 1]?.category === 'aperitivo';

    return (
      <View>
        {showLancheHeader && <Text style={[styles.headerTitle, { color: 'red' }]}>Lanches:</Text>}
        {showBebidaHeader && <Text style={[styles.headerTitle, { color: 'blue' }]}>Bebidas:</Text>}
        {showAperitivoHeader && <Text style={[styles.headerTitle, { color: 'orange'}]}>Aperitivos:</Text>}
        {showSobremesaHeader && <Text style={[styles.headerTitle, { color: 'purple' }]}>Sobremesas:</Text>}
        
        <View style={styles.item}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name} - R$ {item.price}</Text>
            {item.desc ? <Text style={styles.desc}>{item.desc}</Text> : null}
          </View>
          <View style={styles.controls}>
            <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.button}>
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item.qty}</Text>
            <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={items} 
        renderItem={renderItem} 
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <Button 
          title="Fechar Pedido" 
          color="#28a745"
          onPress={() => navigation.navigate('Fechamento', { items })} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  item: { 
    flexDirection: 'row', 
    marginBottom: 10, 
    padding: 12, 
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee'
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  desc: { fontSize: 14, color: '#555' },
  controls: { flexDirection: 'row', alignItems: 'center' },
  button: { backgroundColor: '#ddd', padding: 8, borderRadius: 4, minWidth: 35, alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
  qty: { marginHorizontal: 10, fontSize: 16, fontWeight: 'bold' },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5
  },
  footer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  }
});