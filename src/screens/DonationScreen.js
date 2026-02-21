import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DonationScreen = ({ route }) => {
    const campaign = route.params?.campaign;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Donation Screen</Text>
            {campaign && (
                <Text style={styles.subtext}>Donating to: {campaign.title}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtext: {
        fontSize: 16,
        color: '#666',
    }
});

export default DonationScreen;
