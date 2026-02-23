import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const dummyImpactData = [
    {
        id: "1",
        tag: "SUCCESS STORY",
        title: "Clean Water in Mewat",
        description: "Installed 5 hand pumps providing clean water to 200 families...",
        image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2 days ago",
        fullStory: "We successfully installed 5 hand pumps in the Mewat region, ensuring that over 200 families now have reliable access to clean and safe drinking water. This initiative will significantly reduce the incidence of waterborne diseases in the community."
    },
    {
        id: "2",
        tag: "SUCCESS STORY",
        title: "Free Eye Surgery Camp",
        description: "150 successful cataract surgeries performed this weekend in...",
        image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "5 days ago",
        fullStory: "Our medical team hosted a free eye surgery camp where 150 elderly patients underwent successful cataract operations. Thanks to our donors' generous contributions, these individuals have regained their vision and independence."
    }
];

const RecentImpact = () => {
    const navigation = useNavigation();

    const renderImpactCard = ({ item }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('StoryDetailScreen', { story: item })}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardContent}>
                <View>
                    <Text style={styles.tagText}>{item.tag}</Text>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={styles.cardDescription} numberOfLines={2}>
                        {item.description}
                    </Text>
                </View>
                <View style={styles.dateContainer}>
                    <Ionicons name="calendar-outline" size={12} color="#999" style={styles.calendarIcon} />
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Recent Impact</Text>
                <TouchableOpacity>
                    <Text style={styles.headerLink}>Read More</Text>
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
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    headerLink: {
        fontSize: 14,
        color: '#008A5E',
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 12,
        backgroundColor: '#EAEAEA',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    tagText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#008A5E',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 13,
        color: '#666',
        marginBottom: 8,
        lineHeight: 18,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarIcon: {
        marginRight: 4,
    },
    dateText: {
        fontSize: 12,
        color: '#999',
    },
});

export default RecentImpact;
