import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const AmountSelector = ({ presetAmounts, selectedAmount, setSelectedAmount, customAmount, setCustomAmount }) => {
    return (
        <View>
            <Text style={styles.sectionTitle}>Choose Amount</Text>
            <View style={styles.grid3}>
                {presetAmounts.map((amt) => (
                    <TouchableOpacity
                        key={amt}
                        style={[styles.amountButton, selectedAmount === amt && !customAmount && styles.amountButtonActive]}
                        onPress={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.amountButtonText, selectedAmount === amt && !customAmount && styles.amountButtonTextActive]}>
                            ₹{amt.toLocaleString('en-IN')}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.customAmountLabel}>Enter Custom Amount ( Min ₹ 50 )</Text>
            <View style={styles.customAmountInputContainer}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                    style={styles.customAmountInput}
                    placeholder="1,000"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    value={customAmount}
                    onChangeText={(val) => {
                        setCustomAmount(val.replace(/[^0-9]/g, ''));
                        setSelectedAmount(null);
                    }}
                />
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
    grid3: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    amountButton: {
        width: '31%',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 20,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 12
    },
    amountButtonActive: {
        backgroundColor: '#008A5E',
        borderColor: '#008A5E'
    },
    amountButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#444'
    },
    amountButtonTextActive: {
        color: '#FFF'
    },
    customAmountLabel: {
        fontSize: 11,
        color: '#888',
        marginBottom: 8,
        marginTop: 4
    },
    customAmountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FFF'
    },
    currencySymbol: {
        fontSize: 16,
        fontWeight: '600',
        color: '#888',
        marginRight: 8
    },
    customAmountInput: {
        flex: 1,
        height: 52,
        fontSize: 15,
        fontWeight: '600',
        color: '#222'
    }
});

export default AmountSelector;
