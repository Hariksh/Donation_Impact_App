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

            <View style={styles.taxCard}>
                <View style={styles.taxCardContent}>
                    <Text style={styles.taxTitle}>Tax Savings (80G)</Text>
                    <Text style={styles.taxSubtitle}>Download your FY 2023-24 tax-exempt certificate now.</Text>
                    <TouchableOpacity style={styles.taxButton}>
                        <Ionicons name="download-outline" size={16} color="#0D6855" />
                        <Text style={styles.taxButtonText}>Download 80G Receipt</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.timelineSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Impact Timeline</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
                </View>
                {IMPACT_TIMELINE.map((item, index) => (
                    <View key={item.id} style={styles.timelineItem}>
                        <View style={styles.timelineDotColumn}>
                            <View style={styles.timelineDot} />
                            {index < IMPACT_TIMELINE.length - 1 && <View style={styles.timelineLine} />}
                        </View>
                        <View style={styles.timelineContent}>
                            <Text style={styles.timelineDate}>{item.date}</Text>
                            <Text style={styles.timelineTitle}>{item.title}</Text>
                            <Text style={styles.timelineDesc}>{item.description}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Donation History</Text>
                <TouchableOpacity><Text style={styles.seeAllText}>View Statement</Text></TouchableOpacity>
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
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 14,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 20,
        backgroundColor: '#FFF0E5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    goldBadge: {
        backgroundColor: '#0D6855',
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: -10,
    },
    goldBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 4,
    },
    profileMeta: {
        fontSize: 13,
        color: '#999999',
        fontWeight: '500',
        marginBottom: 14,
    },
    editProfileBtn: {
        borderWidth: 1.5,
        borderColor: '#0D6855',
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    editProfileText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0D6855',
    },
    totalImpactCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#0D6855',
    },
    totalImpactLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#999999',
        letterSpacing: 1,
        marginBottom: 6,
    },
    totalImpactRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalImpactAmount: {
        fontSize: 34,
        fontWeight: '900',
        color: '#222222',
    },
    growthBadge: {
        backgroundColor: '#E6F9F1',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginLeft: 12,
    },
    growthBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0D6855',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
    },
    statCardLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#999999',
        letterSpacing: 0.8,
        marginBottom: 6,
    },
    statCardValue: {
        fontSize: 26,
        fontWeight: '900',
        color: '#222222',
        marginBottom: 10,
    },
    statProgressTrack: {
        height: 6,
        backgroundColor: '#E8E8E8',
        borderRadius: 3,
        overflow: 'hidden',
    },
    statProgressFill: {
        height: '100%',
        backgroundColor: '#0D6855',
        borderRadius: 3,
    },
    categoryDots: {
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    taxCard: {
        backgroundColor: '#0D6855',
        borderRadius: 16,
        padding: 22,
        marginBottom: 28,
    },
    taxCardContent: {},
    taxTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 6,
    },
    taxSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 20,
        marginBottom: 16,
    },
    taxButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 6,
    },
    taxButtonText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0D6855',
    },
    timelineSection: {
        marginBottom: 28,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#222222',
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0D6855',
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    timelineDotColumn: {
        alignItems: 'center',
        width: 24,
        marginRight: 12,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0D6855',
        marginTop: 4,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#E0E0E0',
        marginTop: 4,
    },
    timelineContent: {
        flex: 1,
        paddingBottom: 20,
    },
    timelineDate: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0D6855',
        marginBottom: 4,
    },
    timelineTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222222',
        marginBottom: 4,
    },
    timelineDesc: {
        fontSize: 13,
        color: '#777777',
        lineHeight: 19,
    },
    donationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        marginBottom: 10,
    },
    donationIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F8F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    donationInfo: {
        flex: 1,
    },
    donationTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222222',
        marginBottom: 3,
    },
    donationMeta: {
        fontSize: 12,
        color: '#999999',
        fontWeight: '500',
    },
    donationRight: {
        alignItems: 'flex-end',
        gap: 6,
    },
    donationAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222222',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 48,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#AAAAAA',
        marginTop: 16,
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#CCCCCC',
        fontWeight: '500',
    },
});

export default ImpactScreen;