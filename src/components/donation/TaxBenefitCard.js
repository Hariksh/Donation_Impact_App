import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaxBenefitCard = ({ taxBenefit, setTaxBenefit }) => {
    return (
        <View style={styles.taxCard}>
            <View style={styles.taxInfo}>
                <Ionicons name="document-text-outline" size={24} color="#D97706" />
                <View style={styles.taxTextContainer}>
                    <Text style={styles.taxTitle}>TAX BENEFIT</Text>
                    <Text style={styles.taxSubtitle}>Generate Tax Certificate (80G)</Text>
                </View>
            </View>
            <Switch
                value={taxBenefit}
                onValueChange={setTaxBenefit}
                trackColor={{ false: '#E0E0E0', true: '#008A5E' }}
                thumbColor={'#FFFFFF'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    taxCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF9EB',
        borderWidth: 1,
        borderColor: '#FDE68A',
        borderRadius: 16,
        padding: 16,
        marginTop: 24
    },
    taxInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    taxTextContainer: {
        marginLeft: 12
    },
    taxTitle: {
        fontSize: 11,
        fontWeight: '800',
        color: '#B46A14'
    },
    taxSubtitle: {
        fontSize: 11,
        color: '#B46A14',
        marginTop: 2
    }
});

export default TaxBenefitCard;
