import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CampaignCard from '../components/CampaignCard';
import { dummyCampaigns } from '../data/dummyData';

const CampaignListScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList
                data={dummyCampaigns}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CampaignCard
                        campaign={item}
                        onPress={() => navigation.navigate('CampaignDetailsScreen', { campaign: item })}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
});

export default CampaignListScreen;
