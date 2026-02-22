import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useDonation } from '../context/DonationContext';

const ImpactScreen = () => {
    const { totalDonated, familiesSupported, campaignsContributed } = useDonation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
            <View style={styles.headerBar}>
                <Text style={styles.screenTitle}>Impact</Text>
            </View>
            <View style={styles.content}>
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
            </View>
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
    content: {
        paddingHorizontal: 20,
    },
    impactCard: {
        backgroundColor: '#0D6855',
        borderRadius: 20,
        padding: 24,
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
    stat: {
        flex: 1,
    },
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
});

export default ImpactScreen;
