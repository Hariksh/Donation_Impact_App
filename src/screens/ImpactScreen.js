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
});

export default ImpactScreen;