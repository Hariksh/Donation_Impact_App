import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

export const dummyImpactData = [
    {
        id: "1",
        title: "New community kitchen opened in Bihar",
        description: "Serving 200+ hot meals daily to wage earners.",
        image: "https://picsum.photos/id/292/800/800"
    },
    {
        id: "2",
        title: "Education supplies for 500 children",
        description: "Distributed books and stationery in rural schools.",
        image: "https://picsum.photos/id/20/800/800"
    },
    {
        id: "3",
        title: "Clean drinking water project completed",
        description: "Installed 10 water purifiers in local villages.",
        image: "https://picsum.photos/id/403/800/800"
    }
];

const RecentImpact = () => {
    const renderImpactCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardContent}>
                <View>
                    <Text style={styles.cardTitle} numberOfLines={2}>
                        {item.title}
                    </Text>
                    <Text style={styles.cardDescription} numberOfLines={2}>
                        {item.description}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => console.log(`Read Full Story pressed for: ${item.id}`)}>
                    <Text style={styles.readMoreText}>READ FULL STORY →</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Recent Impact</Text>
                <TouchableOpacity>
                    <Text style={styles.headerLink}>See Stories</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={dummyImpactData}
                keyExtractor={(item) => item.id}
                renderItem={renderImpactCard}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    headerLink: {
        fontSize: 14,
        color: '#0D6855',
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardImage: {
        width: 95,
        height: 95,
        borderRadius: 12,
        marginRight: 16,
        backgroundColor: '#EAEAEA',
        overflow: 'hidden',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
        lineHeight: 22,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    readMoreText: {
        fontSize: 13,
        color: '#0D6855',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default RecentImpact;
