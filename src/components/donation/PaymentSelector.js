import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const PAYMENT_METHODS = [
    { label: 'UPI', icon: 'phone-portrait-outline' },
    { label: 'Credit / Debit Card', icon: 'card-outline' },
    { label: 'Net Banking', icon: 'globe-outline' },
];
const PaymentSelector = ({ selectedPayment, setSelectedPayment }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {PAYMENT_METHODS.map((method) => {
                const isActive = selectedPayment === method.label;
                return (
                    <TouchableOpacity
                        key={method.label}
                        style={[styles.paymentOption, isActive && styles.paymentOptionActive]}
                        activeOpacity={0.8}
                        onPress={() => setSelectedPayment(method.label)}>
                        <View style={styles.paymentOptionLeft}>
                            <View style={[styles.paymentIconCircle, isActive && styles.paymentIconCircleActive]}>
                                <Ionicons
                                    name={method.icon}
                                    size={20}
                                    color={isActive ? '#FFFFFF' : '#0D6855'}
                                />
                            </View>
                            <Text style={[styles.paymentOptionText, isActive && styles.paymentOptionTextActive]}>
                                {method.label}
                            </Text>
                        </View>
                        <View style={[styles.radioOuter, isActive && styles.radioOuterActive]}>
                            {isActive && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>
                );
            })}
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
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
    },
    paymentOptionActive: {
        borderColor: '#0D6855',
        backgroundColor: '#F0F8F6',
    },
    paymentOptionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F8F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    paymentIconCircleActive: {
        backgroundColor: '#0D6855',
    },
    paymentOptionText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#444444',
    },
    paymentOptionTextActive: {
        color: '#0D6855',
        fontWeight: '700',
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterActive: {
        borderColor: '#0D6855',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0D6855',
    },
});
export default PaymentSelector;