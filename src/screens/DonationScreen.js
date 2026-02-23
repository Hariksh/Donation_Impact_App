import { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Switch, Alert, Platform, KeyboardAvoidingView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDonation } from '../context/DonationContext';
import DonationTypeSelector from '../components/donation/DonationTypeSelector';
import AmountSelector from '../components/donation/AmountSelector';
import PaymentSelector from '../components/donation/PaymentSelector';
import DonationSummary from '../components/donation/DonationSummary';

const DonationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
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
            <View style={[styles.stickyHeader, { paddingTop: insets.top }]}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#008A5E" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {campaign ? campaign.title : 'Support Jamiat'}
                    </Text>
                    <View style={styles.secureBadge}>
                        <Ionicons name="shield-checkmark-outline" size={14} color="#008A5E" />
                        <Text style={styles.secureText}>SECURE</Text>
                    </View>
                </View>

                {/* Progress Steps Component */}
                <View style={styles.stepsContainer}>
                    {/* Step 1 */}
                    <View style={styles.stepWrapper}>
                        <View style={[styles.stepCircle, styles.stepCircleActive]}>
                            <Text style={[styles.stepNumber, styles.stepNumberActive]}>1</Text>
                        </View>
                        <Text style={[styles.stepLabel, styles.stepLabelActive]}>Amount</Text>
                    </View>

                    {/* Connecting Line 1 */}
                    <View style={[styles.stepLine, styles.stepLineActive]} />

                    {/* Step 2 */}
                    <View style={styles.stepWrapper}>
                        <View style={styles.stepCircle}>
                            <Text style={styles.stepNumber}>2</Text>
                        </View>
                        <Text style={styles.stepLabel}>Payment</Text>
                    </View>

                    {/* Connecting Line 2 */}
                    <View style={[styles.stepLine, styles.stepLineActive]} />

                    {/* Step 3 */}
                    <View style={styles.stepWrapper}>
                        <View style={styles.stepCircle}>
                            <Text style={styles.stepNumber}>3</Text>
                        </View>
                        <Text style={styles.stepLabel}>Impact</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

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
                            <Ionicons name="repeat-outline" size={20} color="#008A5E" />
                            <Text style={styles.recurringLabel}>Make this a monthly donation</Text>
                        </View>
                        <Switch
                            value={isRecurring}
                            onValueChange={setIsRecurring}
                            trackColor={{ false: '#E0E0E0', true: '#A8D5CB' }}
                            thumbColor={isRecurring ? '#008A5E' : '#CCCCCC'}
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
        paddingTop: 24,
        paddingBottom: 100,
    },
    stickyHeader: {
        backgroundColor: '#FFFFFF',
        zIndex: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F5F2',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
    },
    secureBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 4,
    },
    secureText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#008A5E',
        letterSpacing: 0.5,
    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
    },
    stepWrapper: {
        alignItems: 'center',
        width: 60,
    },
    stepCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    stepCircleActive: {
        backgroundColor: '#008A5E',
    },
    stepNumber: {
        fontSize: 16,
        fontWeight: '800',
        color: '#CBD5E1',
    },
    stepNumberActive: {
        color: '#FFFFFF',
    },
    stepLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#94A3B8',
    },
    stepLabelActive: {
        color: '#008A5E',
    },
    stepLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 8,
        marginTop: 21,
        maxWidth: 70,
    },
    stepLineActive: {
        backgroundColor: '#CCEAE0',
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
        backgroundColor: '#008A5E',
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#008A5E',
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
