import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDonation } from '../context/DonationContext';

const ImpactScreen = () => {
    const { totalDonated, familiesSupported, campaignsContributed, donationHistory } = useDonation();

    const formatDate = (isoDate) => {
        const d = new Date(isoDate);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const renderHistoryItem = ({ item }) => (
        <View style={styles.historyCard}>
            <View style={styles.historyLeft}>
                <View style={styles.historyIconCircle}>
                    <Ionicons name="heart" size={18} color="#0D6855" />
                </View>
                <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle} numberOfLines={1}>{item.donationType}</Text>
                    <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
                </View>
            </View>
            <View style={styles.historyRight}>
                <Text style={styles.historyAmount}>₹{item.amount.toLocaleString('en-IN')}</Text>
                {item.isRecurring && (
                    <View style={styles.recurringBadge}>
                        <Text style={styles.recurringBadgeText}>Monthly</Text>
                    </View>
                )}
            </View>
        </View>
    );
    const renderEmptyHistory = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="wallet-outline" size={48} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No donations yet</Text>
            <Text style={styles.emptySubtitle}>Your donation history will appear here</Text>
        </View>
    );
    const renderHeader = () => (
        <>
            <View style={styles.impactCard}>
                <Text style={styles.impactLabel}>Your Total Impact</Text>
                <Text style={styles.impactAmount}>₹{totalDonated.toLocaleString('en-IN')}</Text>
                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>{familiesSupported}</Text>
                        <Text style={styles.statLabel}>Families Supported</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>{campaignsContributed}</Text>
                        <Text style={styles.statLabel}>Campaigns Contributed</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.sectionTitle}>Donation History</Text>
        </>
    );
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
            <View style={styles.headerBar}>
                <Text style={styles.screenTitle}>Impact</Text>
            </View>
            <FlatList
                data={donationHistory}
                keyExtractor={(item) => item.id}
                renderItem={renderHistoryItem}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmptyHistory}
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
