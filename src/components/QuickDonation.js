import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const donationCategories = [
    {
        id: '1',
        title: 'Zakat',
        subtitle: 'OBLIGATORY',
        icon: 'hand-heart-outline',
        font: 'MaterialCommunityIcons',
        color: '#008A5E'
    },
    {
        id: '2',
        title: 'Sadaqa',
        subtitle: 'VOLUNTARY',
        icon: 'heart-outline',
        font: 'Ionicons',
        color: '#3B82F6'
    },
    {
        id: '3',
        title: 'General',
        subtitle: 'FOUNDATION FUND',
        icon: 'wallet-outline',
        font: 'Ionicons',
        color: '#F5B041'
    },
    {
        id: '4',
        title: 'Interest',
        subtitle: 'PURIFICATION',
        icon: 'broom',
        font: 'MaterialCommunityIcons',
        color: '#F87171'
    },
];

const QuickDonation = () => {
    const navigation = useNavigation();

    const handlePress = (categoryTitle) => {
        navigation.navigate('DonationScreen', { donationType: categoryTitle });
    };

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {donationCategories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.card,
                            { borderTopColor: category.color }
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handlePress(category.title)}
                    >
                        <View style={styles.iconContainer}>
                            {category.font === 'Ionicons' ? (
                                <Ionicons name={category.icon} size={32} color={category.color} />
                            ) : (
                                <MaterialCommunityIcons name={category.icon} size={32} color={category.color} />
                            )}
                        </View>
                        <Text style={styles.cardTitle}>{category.title}</Text>
                        <Text style={styles.cardSubtitle}>{category.subtitle}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 12,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
        borderTopWidth: 5,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222222',
        textAlign: 'center',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 10,
        fontWeight: '600',
        color: '#A0A0A0',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
});

export default QuickDonation;
