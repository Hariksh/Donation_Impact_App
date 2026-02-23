import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CampaignCard from '../components/CampaignCard';
import { useDonation } from '../context/DonationContext';
const categories = ['All', 'Food', 'Water', 'Health', 'Education', 'Shelter'];

const CampaignListScreen = () => {
    const navigation = useNavigation();
    const { campaigns } = useDonation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || campaign.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                        <View style={styles.headerContainer}>
                            <View style={styles.searchRow}>
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
                                <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
                                    <Ionicons name="options-outline" size={24} color="#008A5E" />
                                </TouchableOpacity>
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
    headerContainer: {
        paddingTop: 8,
        paddingBottom: 4,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginRight: 12,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#333333',
    },
    filterButton: {
        width: 48,
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
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
        paddingVertical: 10,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
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
    listContent: {
        paddingBottom: 24,
    },
});

export default CampaignListScreen;
