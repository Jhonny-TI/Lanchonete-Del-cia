import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert, 
  FlatList,
  TextInput, // Importado para os campos de texto
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CheckoutScreen({ route, navigation }) {
  const [showPix, setShowPix] = useState(false);
  
  // Estados para o cadastro do cliente
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const items = route.params?.items || [];
  const selectedItems = items.filter(item => item.qty > 0);
  
  const total = selectedItems.reduce(
    (sum, item) => sum + (item.qty * item.price),
    0
  );

  const handlePagarPix = () => {
    // Validação funcional: impede abrir o PIX sem os dados de entrega
    if (!nome || !telefone || !endereco) {
      Alert.alert("Campos Obrigatórios", "Por favor, preencha seus dados para entrega antes de pagar.");
      return;
    }
    setShowPix(!showPix);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedItems}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Resumo do Pedido</Text>
            
            {/* Seção de Cadastro */}
            <View style={styles.cadastroContainer}>
              <Text style={styles.label}>Dados para Entrega</Text>
              <TextInput 
                style={styles.input}
                placeholder="Seu nome completo"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput 
                style={styles.input}
                placeholder="Telefone (WhatsApp)"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />
              <TextInput 
                style={[styles.input, styles.inputEndereco]}
                placeholder="Endereço completo (Rua, Nº, Bairro)"
                multiline
                value={endereco}
                onChangeText={setEndereco}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name} x{item.qty}</Text>
            <Text style={styles.itemPrice}>R$ {(item.qty * item.price).toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Carrinho vazio</Text>}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>

            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.pixButton, (!nome || !telefone || !endereco) && styles.pixButtonDisabled]} 
              onPress={handlePagarPix}
            >
              <Text style={styles.pixButtonText}>
                {showPix ? "FECHAR QR CODE" : "PAGAR COM PIX"}
              </Text>
            </TouchableOpacity>

            {showPix && (
              <View style={styles.qrSection}>
                <Text style={styles.qrInfo}>Aguardando pagamento de {nome.split(' ')[0]}...</Text>
                <Image 
                  source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PIX_PAGAMENTO_AGNELLO' }} 
                  style={styles.qrImage}
                />
                <Text style={styles.enderecoEntrega}>Entrega em: {endereco}</Text>
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
  cadastroContainer: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6B00',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  inputEndereco: {
    height: 60,
    textAlignVertical: 'top',
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
    paddingBottom: 40 
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
    zIndex: 99, 
    elevation: 5
  },
  pixButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  pixButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  qrSection: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 20,
  },
  qrInfo: {
    marginBottom: 10,
    fontWeight: '600',
    color: '#2c3e50'
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 15
  },
  enderecoEntrega: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center'
  }
});