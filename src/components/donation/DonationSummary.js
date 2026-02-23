import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DonationSummary = ({ finalAmount }) => {
    return (
        <View>
            <Text style={styles.sectionTitle}>Donation Summary</Text>
            <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Donation Amount</Text>
                    <Text style={styles.summaryValue}>₹{finalAmount ? finalAmount.toLocaleString('en-IN') : '0'}.00</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Processing Fee</Text>
                    <Text style={styles.summaryValue}>₹0.00</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>Total Contribution</Text>
                    <Text style={styles.totalValue}>₹{finalAmount ? finalAmount.toLocaleString('en-IN') : '0'}</Text>
                </View>
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
    summaryCard: {
        backgroundColor: '#F0FDF4',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    summaryLabel: {
        fontSize: 13,
        color: '#777'
    },
    summaryValue: {
        fontSize: 13,
        fontWeight: '700',
        color: '#444'
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 12
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: '800',
        color: '#222'
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#008A5E'
    }
});

export default DonationSummary;
