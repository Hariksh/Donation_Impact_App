import { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDonation } from '../context/DonationContext';

const IMPACT_TIMELINE = [
    {
        id: '1',
        date: 'OCT 2023',
        title: 'Handpump Installed in Bihar',
        description: 'Your donation helped provide clean water to a village of 45 households.',
    },
    {
        id: '2',
        date: 'JUN 2023',
        title: 'Food Kit Distribution',
        description: '10 families in New Delhi received essential groceries for a month.',
    },
];

const ImpactScreen = () => {
    const { totalDonated, familiesSupported, campaignsContributed, donationHistory } = useDonation();
    const donorId = useMemo(() => `DNR-${Math.floor(1000 + Math.random() * 9000)}`, []);

    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        const d = new Date(isoDate);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
    };

    const renderHistoryItem = ({ item }) => (
        <View style={styles.donationCard}>
            <View style={styles.donationIconCircle}>
                <Ionicons name="heart" size={18} color="#0D6855" />
            </View>
            <View style={styles.donationInfo}>
                <Text style={styles.donationTitle} numberOfLines={1}>{item.donationType || 'General Donation'}</Text>
                <Text style={styles.donationMeta}>{formatDate(item.date)} • #{item.id.toString().slice(-4)}</Text>
            </View>
            <View style={styles.donationRight}>
                <Text style={styles.donationAmount}>₹{item.amount.toLocaleString('en-IN')}{item.isRecurring ? ' / month' : ''}</Text>
                <Ionicons name="download-outline" size={16} color="#0D6855" />
            </View>
        </View>
    );
    const renderEmptyDonations = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="wallet-outline" size={48} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No donations yet</Text>
            <Text style={styles.emptySubtitle}>Your donation history will appear here</Text>
        </View>
    );
    const renderHeader = () => (
        <>
            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={32} color="#FF8C42" />
                    </View>
                    <View style={styles.goldBadge}>
                        <Text style={styles.goldBadgeText}>GOLD</Text>
                    </View>
                </View>
                <Text style={styles.profileName}>Welcome Back, Donor!</Text>
                <Text style={styles.profileMeta}>Member since 2024 • ID: {donorId}</Text>
                <TouchableOpacity style={styles.editProfileBtn}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.totalImpactCard}>
                <Text style={styles.totalImpactLabel}>TOTAL IMPACT</Text>
                <View style={styles.totalImpactRow}>
                    <Text style={styles.totalImpactAmount}>₹{totalDonated.toLocaleString('en-IN')}</Text>
                    {totalDonated > 5000 && (
                        <View style={styles.growthBadge}>
                            <Text style={styles.growthBadgeText}>Growing Impact</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <Text style={styles.statCardLabel}>LIVES TOUCHED</Text>
                    <Text style={styles.statCardValue}>{familiesSupported > 0 ? `${familiesSupported}+` : '0'}</Text>
                    <View style={styles.statProgressTrack}>
                        <View style={[styles.statProgressFill, { width: `${Math.min(familiesSupported * 5, 100)}%` }]} />
                    </View>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statCardLabel}>CAMPAIGNS</Text>
                    <Text style={styles.statCardValue}>{campaignsContributed}</Text>
                    <View style={styles.categoryDots}>
                        <View style={[styles.dot, { backgroundColor: '#FF6B6B' }]}><Text style={styles.dotText}>R</Text></View>
                        <View style={[styles.dot, { backgroundColor: '#0D6855' }]}><Text style={styles.dotText}>E</Text></View>
                        <View style={[styles.dot, { backgroundColor: '#4ECDC4' }]}><Text style={styles.dotText}>W</Text></View>
                    </View>
                </View>
            </View>
        </>
    );
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
            <FlatList
                data={donationHistory}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderHistoryItem}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmptyDonations}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerBar: {
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#222222',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    impactCard: {
        backgroundColor: '#0D6855',
        borderRadius: 20,
        padding: 24,
        marginBottom: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 14,
        elevation: 8,
    },
    impactLabel: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.85)',
        fontWeight: '500',
        marginBottom: 10,
    },
    impactAmount: {
        fontSize: 38,
        fontWeight: '900',
        color: '#FFFFFF',
        marginBottom: 28,
        letterSpacing: 0.5,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stat: { flex: 1 },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        height: 36,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 14,
        letterSpacing: 0.2,
    },
});

export default ImpactScreen;