import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DonationHeader = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Make Your Donation</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <Text style={styles.headerSubtitle}>
                Empowering the <Text style={{ fontWeight: 'bold' }}>Ummah</Text>, one life at a time.
            </Text>

            <View style={styles.statsRow}>
                <View style={styles.statPill}>
                    <Ionicons name="people" size={12} color="#A8D5CB" />
                    <Text style={styles.statPillText}>10K+ Donors</Text>
                </View>
                <View style={styles.statPill}>
                    <Ionicons name="heart" size={12} color="#A8D5CB" />
                    <Text style={styles.statPillText}>25K+ Lives</Text>
                </View>
                <View style={styles.statPill}>
                    <Ionicons name="map" size={12} color="#A8D5CB" />
                    <Text style={styles.statPillText}>14 States</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF'
    },
    headerSubtitle: {
        color: '#FFF',
        fontSize: 13,
        marginTop: 16
    },
    statsRow: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 10
    },
    statPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 4
    },
    statPillText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '600'
    }
});

export default DonationHeader;
