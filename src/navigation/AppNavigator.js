import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CampaignListScreen from '../screens/CampaignListScreen';
import CampaignDetailsScreen from '../screens/CampaignDetailsScreen';
import DonationScreen from '../screens/DonationScreen';
import ImpactScreen from '../screens/ImpactScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
                name="CampaignDetailsScreen"
                component={CampaignDetailsScreen}
                options={{ headerShown: true, title: 'Campaign Details', headerBackTitleVisible: false }}
            />
            <Stack.Screen
                name="DonationScreen"
                component={DonationScreen}
                options={{ headerShown: true, title: 'Donate', headerBackTitleVisible: false }}
            />
            <Stack.Screen
                name="StoryDetailScreen"
                component={StoryDetailScreen}/>
        </Stack.Navigator>
    );
};

const CampaignStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CampaignListScreen" component={CampaignListScreen} />
            <Stack.Screen
                name="CampaignDetailsScreen"
                component={CampaignDetailsScreen}
                options={{ headerShown: true, title: 'Campaign Details', headerBackTitleVisible: false }}
            />
            <Stack.Screen
                name="DonationScreen"
                component={DonationScreen}
                options={{ headerShown: true, title: 'Donate', headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    );
};


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: '#0D6855',
                    tabBarInactiveTintColor: '#888',
                    tabBarStyle: {
                        paddingBottom: 5,
                        paddingTop: 5,
                        height: 60,
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (route.name === 'Campaigns') {
                            iconName = focused ? 'heart' : 'heart-outline'
                        } else if (route.name === 'Impact') {
                            iconName = focused ? 'analytics' : 'analytics-outline'
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Campaigns" component={CampaignStack} />
                <Tab.Screen name="Impact" component={ImpactScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
