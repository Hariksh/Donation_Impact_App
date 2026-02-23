import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const DONATION_TYPES = [
    { label: 'Emergency Relief', icon: 'medical' },
    { label: 'Medical Support', icon: 'heart' },
    { label: 'Education Fund', icon: 'book' },
    { label: 'General Fund', icon: 'leaf' },
];
const DonationTypeSelector = ({ selectedType, setSelectedType }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Donation Type</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.typeScrollContent}>
                {DONATION_TYPES.map((type) => {
                    const isActive = selectedType === type.label;
                    return (
                        <TouchableOpacity
                            key={type.label}
                            style={[styles.typeChip, isActive && styles.typeChipActive]}
                            activeOpacity={0.8}
                            onPress={() => setSelectedType(type.label)}>
                            <Ionicons
                                name={type.icon}
                                size={16}
                                color={isActive ? '#FFFFFF' : '#008A5E'}
                                style={styles.typeChipIcon}/>
                            <Text style={[styles.typeChipText, isActive && styles.typeChipTextActive]}>
                                {type.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
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
    typeScrollContent: {
        gap: 10,
    },
    typeChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
    },
    typeChipActive: {
        backgroundColor: '#008A5E',
        borderColor: '#008A5E',
    },
    typeChipIcon: {
        marginRight: 6,
    },
    typeChipText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#444444',
    },
    typeChipTextActive: {
        color: '#FFFFFF',
    },
});
export default DonationTypeSelector;
