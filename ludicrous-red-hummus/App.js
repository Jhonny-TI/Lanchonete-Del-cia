// Este arquivo é o ponto inicial da aplicação
// Ele configura a navegação por abas (Bottom Tabs)
// e conecta todas as telas do aplicativo
import React from 'react';
// Container obrigatório da navegação
import { NavigationContainer } from '@react-navigation/native';
// Função que cria navegação por abas
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importação das telas do aplicativo
import HomeScreen from './HomeScreen';
import MenuScreen from './MenuScreen';
import CheckoutScreen from './CheckoutScreen';
// Biblioteca de ícones profissionais
import Ionicons from 'react-native-vector-icons/Ionicons';
// Criação do navegador de abas
const Tab = createBottomTabNavigator();
export default function App() {
 return (
 // Envolve todo o sistema de navegação
 <NavigationContainer>
 {/* Define as opções gerais das abas */}
 <Tab.Navigator
 screenOptions={({ route }) => ({
 // Define o ícone de cada aba com base no nome da tela
 tabBarIcon: ({ color, size }) => {
 let iconName;
 if (route.name === 'Home') iconName = 'home';
 else if (route.name === 'Menu') iconName = 'fast-food';
 else if (route.name === 'Fechamento') iconName = 'receipt';
 return <Ionicons name={iconName} size={size} color={color} />;
 },
 tabBarActiveTintColor: 'tomato',
 tabBarInactiveTintColor: 'gray',
 })}
 >
 {/* Cada aba representa uma tela */}
 <Tab.Screen name="Home" component={HomeScreen} />
 <Tab.Screen name="Menu" component={MenuScreen} />
 <Tab.Screen name="Fechamento" component={CheckoutScreen} />
 </Tab.Navigator>
 </NavigationContainer>
 );
}