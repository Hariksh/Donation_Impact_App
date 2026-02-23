import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DONATION_TYPES = [
    { label: 'Zakat', icon: 'cash' },
    { label: 'Sadaqa', icon: 'hand-heart-outline' },
    { label: 'Lillah', icon: 'heart-outline' },
];
const DonationTypeSelector = ({ selectedType, setSelectedType }) => {
    return (
        <View style={styles.section}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>DONATION TYPE</Text>
                <View style={styles.taxBadge}>
                    <Text style={styles.taxBadgeText}>80G TAX BENEFIT</Text>
                </View>
            </View>
            <View style={styles.cardsContainer}>
                {DONATION_TYPES.map((type) => {
                    const isActive = selectedType === type.label;
                    return (
                        <TouchableOpacity
                            key={type.label}
                            style={[styles.typeCard, isActive && styles.typeCardActive]}
                            activeOpacity={0.8}
                            onPress={() => setSelectedType(type.label)}>
                            <MaterialCommunityIcons
                                name={type.icon}
                                size={28}
                                color={isActive ? '#008A5E' : '#94A3B8'}
                                style={styles.typeCardIcon} />
                            <Text style={[styles.typeCardText, isActive && styles.typeCardTextActive]}>
                                {type.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 1.2,
    },
    taxBadge: {
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    taxBadgeText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#B45309',
    },
    cardsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    typeCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
    },
    typeCardActive: {
        backgroundColor: '#ECFDF5',
        borderColor: '#008A5E',
    },
    typeCardIcon: {
        marginBottom: 8,
    },
    typeCardText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    typeCardTextActive: {
        color: '#008A5E',
    },
});
export default DonationTypeSelector;
