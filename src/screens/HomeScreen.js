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
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
        campaign.urgent && campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerTopRow}>
                        <View style={styles.greetingContainer}>
                            <View style={styles.avatarPlaceholder}>
                                <Ionicons name="person" size={24} color="#008A5E" />
                            </View>
                            <View>
                                <Text style={styles.greetingText}>Assalamu Alaikum,</Text>
                                <Text style={styles.userName}>{userName}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
                            <Ionicons name="notifications-outline" size={26} color="#333" />
                            <View style={styles.notificationDot} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.impactCard}>
                        <View style={styles.impactCardContent}>
                            <Text style={styles.impactTitle}>Your Total Impact</Text>
                            <Text style={styles.impactAmount}>{familiesSupported} Families</Text>
                            <Text style={styles.impactSubtitle}>Supported through your generous contributions</Text>
                        </View>
                        <MaterialCommunityIcons name="hand-heart" size={85} color="rgba(255, 255, 255, 0.1)" style={styles.impactCardIcon} />
                    </View>

                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search campaigns (e.g., Assam Relief)"
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Urgent Relief</Text>
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
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    greetingText: {
        fontSize: 15,
        color: '#666666',
        marginBottom: 2,
        fontWeight: '500',
    },
    userName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#222222',
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E74C3C',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    impactCard: {
        backgroundColor: '#008A5E',
        borderRadius: 20,
        padding: 24,
        marginBottom: 28,
        shadowColor: '#008A5E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 14,
        elevation: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    impactCardContent: {
        zIndex: 1,
    },
    impactTitle: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
        marginBottom: 12,
    },
    impactAmount: {
        fontSize: 34,
        fontWeight: '900',
        color: '#FFFFFF',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    impactSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.85)',
        fontWeight: '500',
        lineHeight: 20,
    },
    impactCardIcon: {
        position: 'absolute',
        right: -10,
        bottom: -15,
        transform: [{ rotate: '-12deg' }],
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 14,
        marginBottom: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#222222',
        letterSpacing: 0.2,
    },
    viewAllText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#008A5E',
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
