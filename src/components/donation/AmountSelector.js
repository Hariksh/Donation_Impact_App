import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';

const PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000, 25000];

const AmountSelector = ({ selectedAmount, setSelectedAmount, customAmount, setCustomAmount }) => {
    const handleAmountPress = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };
    const handleCustomAmountChange = (text) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        setCustomAmount(cleaned);
        setSelectedAmount(null);
    };
    const formatAmountLabel = (amount) => {
        if (amount >= 10000) return `₹${amount / 1000}k`;
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>SELECT AMOUNT</Text>
            <View style={styles.amountsGrid}>
                {PRESET_AMOUNTS.map((amount) => {
                    const isActive = selectedAmount === amount;
                    return (
                        <TouchableOpacity
                            key={amount}
                            style={[styles.amountButton, isActive && styles.amountButtonActive]}
                            activeOpacity={0.8}
                            onPress={() => handleAmountPress(amount)}
                        >
                            <Text style={[styles.amountButtonText, isActive && styles.amountButtonTextActive]}>
                                {formatAmountLabel(amount)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={styles.customAmountContainer}>
                <Text style={styles.currencyPrefix}>₹</Text>
                <TextInput
                    style={styles.customAmountInput}
                    placeholder="Enter custom amount"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="number-pad"
                    value={customAmount}
                    onChangeText={handleCustomAmountChange}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 1.2,
        marginBottom: 16,
    },
    amountsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    amountButton: {
        width: '31.5%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
    },
    amountButtonActive: {
        backgroundColor: '#ECFDF5',
        borderColor: '#008A5E',
    },
    amountButtonText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    amountButtonTextActive: {
        color: '#008A5E',
    },
    customAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 14 : 4,
    },
    currencyPrefix: {
        fontSize: 16,
        fontWeight: '700',
        color: '#94A3B8',
        marginRight: 8,
    },
    customAmountInput: {
        flex: 1,
        fontSize: 15,
        color: '#0F172A',
        fontWeight: '700',
    },
});
export default AmountSelector;
