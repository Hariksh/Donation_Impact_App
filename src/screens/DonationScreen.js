import { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Switch, Alert, Platform, KeyboardAvoidingView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDonation } from '../context/DonationContext';
import DonationTypeSelector from '../components/donation/DonationTypeSelector';
import AmountSelector from '../components/donation/AmountSelector';
import PaymentSelector from '../components/donation/PaymentSelector';
import DonationSummary from '../components/donation/DonationSummary';

const DonationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const campaign = route.params?.campaign;
    const donationType = route.params?.donationType;
    const { addDonation } = useDonation();

    const [selectedType, setSelectedType] = useState(donationType || '');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');

    const getFinalAmount = () => {
        if (selectedAmount) return selectedAmount;
        const parsed = parseInt(customAmount, 10);
        return parsed > 0 ? parsed : 0;
    };

    const handleDonate = () => {
        const amount = getFinalAmount();

        if (!amount || amount <= 0) {
            Alert.alert('Select Amount', 'Please select or enter a donation amount.');
            return;
        }
        if (!selectedPayment) {
            Alert.alert('Payment Method', 'Please select a payment method.');
            return;
        }

        const donationData = {
            campaignId: campaign?.id || null,
            donationType: campaign ? campaign.title : selectedType,
            amount,
            isRecurring,
            paymentMethod: selectedPayment,
        };

        console.log('--- Donation Data ---');
        console.log(JSON.stringify(donationData, null, 2));

        addDonation(donationData);

        Alert.alert(
            'Thank You! 🎉',
            `Your donation of ₹${amount.toLocaleString('en-IN')} has been recorded successfully.`,
            [{ text: 'View Impact', onPress: () => navigation.navigate('Impact') }]
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.headerCard}>
                    <Text style={styles.headerTitle} numberOfLines={2}>
                        {campaign ? campaign.title : selectedType || 'Make a Donation'}
                    </Text>
                    <Text style={styles.headerSubtitle}>Make a secure contribution</Text>
                </View>

                {!campaign && (
                    <DonationTypeSelector
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                    />
                )}

                <AmountSelector
                    selectedAmount={selectedAmount}
                    setSelectedAmount={setSelectedAmount}
                    customAmount={customAmount}
                    setCustomAmount={setCustomAmount}
                />

                <View style={styles.section}>
                    <View style={styles.recurringRow}>
                        <View style={styles.recurringLabelContainer}>
                            <Ionicons name="repeat-outline" size={20} color="#0D6855" />
                            <Text style={styles.recurringLabel}>Make this a monthly donation</Text>
                        </View>
                        <Switch
                            value={isRecurring}
                            onValueChange={setIsRecurring}
                            trackColor={{ false: '#E0E0E0', true: '#A8D5CB' }}
                            thumbColor={isRecurring ? '#0D6855' : '#CCCCCC'}
                        />
                    </View>
                </View>

                <PaymentSelector
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                />

                <DonationSummary
                    amount={getFinalAmount()}
                    isRecurring={isRecurring}
                />
            </ScrollView>

            <View style={styles.donateButtonContainer}>
                <TouchableOpacity
                    style={styles.donateButton}
                    activeOpacity={0.85}
                    onPress={handleDonate}
                >
                    <Text style={styles.donateButtonText}>
                        Donate{getFinalAmount() > 0 ? ` ₹${getFinalAmount().toLocaleString('en-IN')}` : ' Now'}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    headerCard: {
        backgroundColor: '#0D6855',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 14,
        elevation: 8,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 6,
        lineHeight: 28,
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
    },
    section: {
        marginBottom: 24,
    },
    recurringRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    recurringLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    recurringLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444444',
        marginLeft: 10,
    },
    donateButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
        paddingTop: 14,
        backgroundColor: '#F4F4F4',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    donateButton: {
        backgroundColor: '#0D6855',
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0D6855',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 6,
    },
    donateButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});

export default DonationScreen;
