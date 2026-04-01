import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert, 
  FlatList,
  ScrollView,
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CheckoutScreen({ route, navigation }) {
  const [showPix, setShowPix] = useState(false);

  // Pega os itens ou cria um array vazio se der erro
  const items = route.params?.items || [];
  const selectedItems = items.filter(item => item.qty > 0);
  
  const total = selectedItems.reduce(
    (sum, item) => sum + (item.qty * item.price),
    0
  );

  const handleFinalizar = () => {
    Alert.alert(
      "Pedido Confirmado",
      "Recebemos seu pagamento! Voltando ao início...",
      [{ text: "OK", onPress: () => navigation.navigate('Home') }]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedItems}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<Text style={styles.title}>Resumo do Pedido</Text>}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name} x{item.qty}</Text>
            <Text style={styles.itemPrice}>R$ {(item.qty * item.price).toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Carrinho vazio</Text>}
        // Colocamos os botões e o total aqui para garantir que fiquem no final da lista
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>

            <TouchableOpacity 
              activeOpacity={0.7}
              style={styles.pixButton} 
              onPress={() => setShowPix(!showPix)}
            >
              <Text style={styles.pixButtonText}>
                {showPix ? "FECHAR QR CODE" : "PAGAR COM PIX"}
              </Text>
            </TouchableOpacity>

            {showPix && (
              <View style={styles.qrSection}>
                <Image 
                  source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PIX_PAGAMENTO' }} 
                  style={styles.qrImage}
                />
                
                <TouchableOpacity 
                  activeOpacity={0.7}
                  style={styles.doneButton} 
                  onPress={handleFinalizar}
                >
                  <Text style={styles.doneButtonText}>JÁ PAGUEI</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        }
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  itemText: { fontSize: 16, color: '#444' },
  itemPrice: { fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' },
  footer: {
    marginTop: 20,
    paddingBottom: 40 // Espaço para não bater na barra de abas
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 15,
  },
  pixButton: {
    backgroundColor: '#32BCAD',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    // O segredo para o botão funcionar: garantir que ele não tenha nada na frente
    zIndex: 99, 
    elevation: 5
  },
  pixButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  qrSection: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  doneButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 3
  },
  doneButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
