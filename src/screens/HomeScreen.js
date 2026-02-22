import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CampaignCard from '../components/CampaignCard';
import QuickDonation from '../components/QuickDonation';
import RecentImpact from '../components/RecentImpact';
import { useDonation } from '../context/DonationContext';
import { useUser } from '../context/UserContext';

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();
    const { totalDonated, familiesSupported, campaignsContributed, campaigns } = useDonation();
    const { userName } = useUser();

    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.featured && campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingText}>Welcome back,</Text>
                        <Text style={styles.userName}>{userName.split(' ')[0]}</Text>
                    </View>

                    <View style={styles.impactCard}>
                        <Text style={styles.impactTitle}>Your Total Impact</Text>
                        <Text style={styles.impactAmount}>₹{totalDonated.toLocaleString('en-IN')}</Text>

                        <View style={styles.impactStatsRow}>
                            <View style={styles.impactStat}>
                                <Text style={styles.impactStatValue}>{familiesSupported}</Text>
                                <Text style={styles.impactStatLabel}>Families Supported</Text>
                            </View>
                            <View style={styles.impactStatDivider} />
                            <View style={styles.impactStat}>
                                <Text style={styles.impactStatValue}>{campaignsContributed}</Text>
                                <Text style={styles.impactStatLabel}>Campaigns Contributed</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search campaigns..."
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Featured Campaigns</Text>
                </View>

                <FlatList
                    data={filteredCampaigns}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.horizontalCardWrapper}>
                            <CampaignCard
                                campaign={item}
                                onPress={() => navigation.navigate('CampaignDetailsScreen', { campaign: item })}
                            />
                        </View>
                    )}
                    contentContainerStyle={styles.horizontalListContent}
                    decelerationRate="fast"
                    snapToInterval={316}
                    snapToAlignment="start"
                />
                <View style={styles.quickDonationWrapper}>
                    <QuickDonation />
                </View>

                <View style={styles.recentImpactWrapper}>
                    <RecentImpact />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 10,
        paddingBottom: 24,
    },
    headerContainer: {
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    greetingContainer: {
        marginTop: 8,
        marginBottom: 24,
    },
    greetingText: {
        fontSize: 15,
        color: '#666666',
        marginBottom: 4,
        fontWeight: '500',
    },
    userName: {
        fontSize: 26,
        fontWeight: '800',
        color: '#222222',
    },
    impactCard: {
        backgroundColor: '#0D6855', // slightly softened green
        borderRadius: 20,
        padding: 24,
        marginBottom: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 14,
        elevation: 8,
    },
    impactTitle: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.85)',
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
    impactStatsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    impactStat: {
        flex: 1,
    },
    impactStatValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    impactStatLabel: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.85)',
        fontWeight: '500',
    },
    impactStatDivider: {
        width: 1,
        height: 36,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: 20,
    },
    searchContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginBottom: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    searchInput: {
        fontSize: 16,
        color: '#333333',
    },
    sectionTitleContainer: {
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#222222',
        letterSpacing: 0.2,
    },
    horizontalListContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    horizontalCardWrapper: {
        width: 300,
        marginRight: 16,
    },
    quickDonationWrapper: {
        paddingHorizontal: 20,
        marginTop: 12,
    },
    recentImpactWrapper: {
        marginTop: 16,
    },
});
export default HomeScreen;
