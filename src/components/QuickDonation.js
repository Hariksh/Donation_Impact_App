import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const donationCategories = [
    { id: '1', title: 'Emergency Relief', icon: 'medical', color: '#E74C3C' },
    { id: '2', title: 'Medical Support', icon: 'heart', color: '#3498DB' },
    { id: '3', title: 'Education Fund', icon: 'book', color: '#F39C12' },
    { id: '4', title: 'General Fund', icon: 'leaf', color: '#0D6855' },
];

const QuickDonation = () => {
    const navigation = useNavigation();

    const handlePress = (categoryTitle) => {
        navigation.navigate('DonationScreen', { donationType: categoryTitle });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Quick Donation</Text>

            <View style={styles.grid}>
                {donationCategories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.card}
                        activeOpacity={0.7}
                        onPress={() => handlePress(category.title)}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: `${category.color}15` }]}>
                            <Ionicons name={category.icon} size={28} color={category.color} />
                        </View>
                        <Text style={styles.cardTitle}>{category.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#222222',
        letterSpacing: 0.2,
        marginBottom: 16,
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
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default QuickDonation;
