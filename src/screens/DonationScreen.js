import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDonation } from '../context/DonationContext';

import DonationHeader from '../components/donation/DonationHeader';
import ProgressIndicator from '../components/donation/ProgressIndicator';
import ProjectSelector from '../components/donation/ProjectSelector';
import DonationTypeSelector from '../components/donation/DonationTypeSelector';
import SegmentedControl from '../components/donation/SegmentedControl';
import AmountSelector from '../components/donation/AmountSelector';
import TaxBenefitCard from '../components/donation/TaxBenefitCard';
import MessageInput from '../components/donation/MessageInput';
import DonationSummary from '../components/donation/DonationSummary';
import DonationFooter from '../components/donation/DonationFooter';

const DonationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const campaign = route.params?.campaign;
    const initialType = route.params?.donationType;
    const { addDonation } = useDonation();

    const [selectedProject, setSelectedProject] = useState(campaign?.title || 'Assam Flood Relief 2024');
    const [selectedType, setSelectedType] = useState(initialType || 'Zakat');
    const [dedication, setDedication] = useState('For Myself');
    const [frequency, setFrequency] = useState('One-Time');
    const [selectedAmount, setSelectedAmount] = useState(1000);
    const [customAmount, setCustomAmount] = useState('');
    const [taxBenefit, setTaxBenefit] = useState(false);
    const [message, setMessage] = useState('');

    const presetAmounts = [1000, 2500, 5000, 10000, 15000, 25000];

    const getFinalAmount = () => {
        if (customAmount) {
            const parsed = parseInt(customAmount, 10);
            return parsed > 0 ? parsed : 0;
        }
        return selectedAmount;
    };

    const finalAmount = getFinalAmount();

    const handleDonate = () => {
        if (!finalAmount || finalAmount <= 0) {
            Alert.alert('Invalid Amount', 'Please select or enter a valid donation amount.');
            return;
        }

        const donationData = {
            campaignId: campaign?.id || null,
            donationType: selectedType,
            project: selectedProject,
            dedication,
            frequency,
            amount: finalAmount,
            taxBenefit,
            message,
        };

        addDonation(donationData);
        Alert.alert(
            'Thank You!',
            `Your contribution of ₹${finalAmount.toLocaleString('en-IN')} is deeply appreciated.`,
            [{ text: 'View Impact', onPress: () => navigation.navigate('Our impact') }]
        );
    };

    return (
        <View style={styles.container}>
            <DonationHeader />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.cardContainerWrapper}
            >
                <View style={styles.cardContainer}>
                    <ProgressIndicator />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <ProjectSelector selectedProject={selectedProject} />

                        <DonationTypeSelector
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                        />

                        <SegmentedControl
                            title="Dedicate This Donation"
                            options={['For Myself', 'For Loved One', 'In Memory Of']}
                            selectedValue={dedication}
                            onValueChange={setDedication}
                        />

                        <SegmentedControl
                            title="Frequency"
                            options={['One-Time', 'Daily', 'Weekly']}
                            selectedValue={frequency}
                            onValueChange={setFrequency}
                        />

                        <SegmentedControl
                            options={['Monthly', 'Annually']}
                            selectedValue={frequency}
                            onValueChange={setFrequency}
                            customStyle={{ marginTop: 10, width: '66.6%' }}
                        />

                        <AmountSelector
                            presetAmounts={presetAmounts}
                            selectedAmount={selectedAmount}
                            setSelectedAmount={setSelectedAmount}
                            customAmount={customAmount}
                            setCustomAmount={setCustomAmount}
                        />

                        <TaxBenefitCard
                            taxBenefit={taxBenefit}
                            setTaxBenefit={setTaxBenefit}
                        />

                        <MessageInput
                            message={message}
                            setMessage={setMessage}
                        />

                        <DonationSummary finalAmount={finalAmount} />

                    </ScrollView>

                    <DonationFooter handleDonate={handleDonate} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#006C4C'
    },
    cardContainerWrapper: {
        flex: 1
    },
    cardContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -20,
        overflow: 'hidden'
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 120
    }
});

export default DonationScreen;
