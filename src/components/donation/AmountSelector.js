import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';

const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

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
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Amount</Text>
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
                                ₹{amount.toLocaleString('en-IN')}
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
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 14,
    },
    amountsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    amountButton: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    amountButtonActive: {
        backgroundColor: '#008A5E',
        borderColor: '#008A5E',
        shadowColor: '#008A5E',
        shadowOpacity: 0.25,
    },
    amountButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333333',
    },
    amountButtonTextActive: {
        color: '#FFFFFF',
    },
    customAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 16 : 4,
    },
    currencyPrefix: {
        fontSize: 18,
        fontWeight: '700',
        color: '#008A5E',
        marginRight: 8,
    },
    customAmountInput: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
        fontWeight: '600',
    },
});
export default AmountSelector;
