import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CampaignCard from '../components/CampaignCard';
import { useDonation } from '../context/DonationContext';

const CampaignListScreen = () => {
    const navigation = useNavigation();
    const { campaigns } = useDonation();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={filteredCampaigns}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CampaignCard
                            campaign={item}
                            onPress={() => navigation.navigate('CampaignDetailsScreen', { campaign: item })}
                        />
                    )}
                    ListHeaderComponent={
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Campaigns</Text>
                            <Text style={styles.headerSubtitle}>Discover and support causes that matter to you.</Text>
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
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    container: {
        flex: 1,
    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        fontSize: 15,
        color: '#666666',
        fontWeight: '500',
        marginBottom: 16,
    },
    searchContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 14,
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
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 24,
    },
});

export default CampaignListScreen;
