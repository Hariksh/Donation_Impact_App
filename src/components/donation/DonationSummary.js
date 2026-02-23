import { View, Text, StyleSheet } from 'react-native';
const DonationSummary = ({ amount, isRecurring }) => {
    if (!amount || amount <= 0) return null;
    return (
        <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>You are donating</Text>
            <Text style={styles.summaryAmount}>
                ₹{amount.toLocaleString('en-IN')}
                {isRecurring ? ' / month' : ''}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    summaryCard: {
        backgroundColor: '#F0F8F6',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#D0E8E2',
    },
    summaryLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#777777',
        marginBottom: 4,
    },
    summaryAmount: {
        fontSize: 28,
        fontWeight: '900',
        color: '#008A5E',
    },
});
export default DonationSummary;
