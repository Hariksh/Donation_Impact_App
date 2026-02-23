import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DonationFooter = ({ handleDonate }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.payButton} onPress={handleDonate} activeOpacity={0.8}>
                <Text style={styles.payButtonText}>Proceed to Pay</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            <View style={styles.secureFooter}>
                <Ionicons name="shield-checkmark-outline" size={12} color="#888" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    payButton: {
        flexDirection: 'row',
        backgroundColor: '#008A5E',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#008A5E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4
    },
    payButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700'
    },
    secureFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        gap: 6
    },
    secureFooterText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#888',
        letterSpacing: 0.5
    }
});

export default DonationFooter;
