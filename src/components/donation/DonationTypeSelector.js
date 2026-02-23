import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DonationTypeSelector = ({ selectedType, setSelectedType }) => {
    return (
        <View>
            <Text style={styles.sectionTitle}>Donation Type</Text>
            <View style={styles.grid2}>
                {[
                    { id: 'Zakat', icon: 'cash-outline' },
                    { id: 'Sadaqah', icon: 'heart-outline' },
                    { id: 'Fitrana', icon: 'restaurant-outline' },
                    { id: 'General', icon: 'infinite-outline' },
                ].map((type) => (
                    <TouchableOpacity
                        key={type.id}
                        style={[styles.typeButton, selectedType === type.id && styles.typeButtonActive]}
                        onPress={() => setSelectedType(type.id)}
                        activeOpacity={0.8}
                    >
                        <Ionicons name={type.icon} size={20} color={selectedType === type.id ? "#008A5E" : "#777"} />
                        <Text style={[styles.typeButtonText, selectedType === type.id && styles.typeButtonTextActive]}>{type.id}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
        marginTop: 24,
        marginBottom: 12
    },
    grid2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    typeButton: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 24,
        padding: 14,
        marginBottom: 12
    },
    typeButtonActive: {
        borderColor: '#008A5E',
        backgroundColor: '#F0FFF8'
    },
    typeButtonText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#666'
    },
    typeButtonTextActive: {
        color: '#008A5E',
        fontWeight: '700'
    }
});

export default DonationTypeSelector;
