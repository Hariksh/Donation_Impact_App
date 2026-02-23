import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    SafeAreaView,
    Platform,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CampaignCard from '../components/CampaignCard';
import QuickDonation from '../components/QuickDonation';
import RecentImpact from '../components/RecentImpact';
import { useDonation } from '../context/DonationContext';
import { useUser } from '../context/UserContext';

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Zakat', 'General', 'Sadqa', 'Interest'];
    const navigation = useNavigation();
    const { totalDonated, familiesSupported, campaignsContributed, campaigns } = useDonation();
    const { userName } = useUser();

    const formatDonationAmount = (amount) => {
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
        if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
        return `₹${amount}`;
    };

    const formattedRaised = formatDonationAmount(totalDonated > 0 ? totalDonated : 24000000);
    const livesImpacted = familiesSupported > 0 ? `${familiesSupported}+` : '50K+';
    const donorsCount = campaignsContributed > 0 ? `${campaignsContributed * 10}+` : '12K+';

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase());
        return campaign.urgent && matchesSearch;
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <View style={styles.mainBackground}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.topGreenBanner}>
                        <View style={styles.headerTopRow}>
                            <View style={styles.logoContainer}>
                                <MaterialCommunityIcons name="mosque" size={26} color="#FFF" style={styles.logoIcon} />
                                <Text style={styles.headerTitle}>Jamiat Foundation</Text>
                            </View>
                            <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
                                <Ionicons name="notifications-outline" size={22} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.verseCard}>
                            <Text style={styles.verseLabel}>QURAN VERSE</Text>
                            <Text style={styles.verseText}>"And whatever you spend in good-it is for yourselves"</Text>
                            <Text style={styles.verseReference}>Al-Baqarah 2:272</Text>
                            <MaterialCommunityIcons name="book-open-page-variant" size={80} color="rgba(255, 255, 255, 0.05)" style={styles.verseBgIcon} />
                        </View>
                    </View>
                    <View style={styles.statsCardWrapper}>
                        <View style={styles.statsCard}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{livesImpacted}</Text>
                                <Text style={styles.statLabel}>Lives</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={[styles.statValue, { color: '#008A5E' }]}>{formattedRaised}</Text>
                                <Text style={styles.statLabel}>Raised</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{donorsCount}</Text>
                                <Text style={styles.statLabel}>Donors</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search campaigns..."
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <View style={styles.categoriesWrapper}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoryScrollContent}
                        >
                            {categories.map((cat, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.categoryPill,
                                        selectedCategory === cat && styles.categoryPillSelected
                                    ]}
                                    onPress={() => setSelectedCategory(cat)}
                                >
                                    <Text style={[
                                        styles.categoryPillText,
                                        selectedCategory === cat && styles.categoryPillTextSelected
                                    ]}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionTitle}>Urgent Campaigns</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Campaigns')}
                        >
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
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
                        <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Quick Donation</Text>
                        <QuickDonation />
                    </View>
                    <View style={styles.dailyGivingCard}>
                        <View style={styles.dailyGivingContent}>
                            <Text style={styles.dailyGivingTitle}>Start Your Daily Giving</Text>
                            <Text style={styles.dailyGivingSubtitle}>Just ₹1/Day</Text>
                            <TouchableOpacity style={styles.dailyGivingButton} activeOpacity={0.9}>
                                <Text style={styles.dailyGivingButtonText}>Set Up Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dailyGivingCircle} />
                        <View style={[styles.dailyGivingCircle, styles.dailyGivingCircleSmall]} />
                    </View>
                    <View style={styles.recentImpactWrapper}>
                        <RecentImpact />
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#008A5E',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    mainBackground: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    scrollContent: {
        paddingBottom: 24,
    },
    topGreenBanner: {
        backgroundColor: '#008A5E',
        paddingTop: 16,
        paddingHorizontal: 20,
        paddingBottom: 40,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF3B30',
        borderWidth: 1.5,
        borderColor: '#008A5E',
        zIndex: 10,
    },
    verseCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 16,
        position: 'relative',
        overflow: 'hidden',
    },
    verseLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 8,
    },
    verseText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 12,
        paddingRight: 10,
    },
    verseReference: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        textAlign: 'right',
    },
    verseBgIcon: {
        position: 'absolute',
        bottom: -20,
        right: -15,
        transform: [{ rotate: '-10deg' }],
    },
    statsCardWrapper: {
        paddingHorizontal: 20,
        marginTop: -30,
        marginBottom: 16,
    },
    statsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666666',
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#E0E0E0',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginHorizontal: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#333333',
    },
    categoriesWrapper: {
        marginBottom: 20,
    },
    categoryScrollContent: {
        paddingHorizontal: 20,
        gap: 10,
    },
    categoryPill: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    categoryPillSelected: {
        backgroundColor: '#008A5E',
        borderColor: '#008A5E',
    },
    categoryPillText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666666',
    },
    categoryPillTextSelected: {
        color: '#FFFFFF',
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#222222',
        letterSpacing: 0.2,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#008A5E',
    },
    horizontalListContent: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    horizontalCardWrapper: {
        width: 300,
        marginRight: 16,
    },
    quickDonationWrapper: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    dailyGivingCard: {
        backgroundColor: '#F5B041',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#F5B041',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    dailyGivingContent: {
        zIndex: 1,
    },
    dailyGivingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    dailyGivingSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 16,
        fontWeight: '600',
    },
    dailyGivingButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
    },
    dailyGivingButtonText: {
        color: '#F5B041',
        fontWeight: 'bold',
        fontSize: 14,
    },
    dailyGivingCircle: {
        position: 'absolute',
        right: -30,
        bottom: -30,
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    dailyGivingCircleSmall: {
        right: -10,
        top: -20,
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    recentImpactWrapper: {
        marginTop: 10,
    },
});

export default HomeScreen;
