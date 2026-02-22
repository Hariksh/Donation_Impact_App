import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const dummyImpactData = [
    {
        id: "1",
        title: "New community kitchen opened in Bihar",
        description: "Serving 200+ hot meals daily to wage earners.",
        image: "https://picsum.photos/id/292/800/800",
        fullStory:
            "In the heart of rural Bihar, a new community kitchen has opened its doors to serve over 200 hot, nutritious meals every day to daily wage earners and their families.\n\n" +
            "Many of these workers travel long distances to find employment, often skipping meals due to lack of affordable food options. The community kitchen, funded entirely through donor contributions, operates from 11 AM to 3 PM, providing freshly cooked rice, dal, vegetables, and roti.\n\n" +
            "Local volunteers manage the kitchen, sourcing ingredients from nearby farms to keep costs low and support the local economy. The initiative has already made a visible difference — workers report feeling more energized, and families are saving money they previously spent on expensive roadside food.\n\n" +
            "Plans are underway to extend service hours and add a breakfast slot to reach even more people in need.",
        stats: [
            { icon: "restaurant-outline", value: "200+", label: "Meals Daily" },
            { icon: "people-outline", value: "1,500+", label: "People Served" },
            { icon: "location-outline", value: "Bihar", label: "Location" },
        ],
        highlights: [
            "200+ hot meals served every single day",
            "Kitchen staffed entirely by local volunteers",
            "Ingredients sourced from nearby farms, supporting local economy",
            "Plans to expand with breakfast service soon",
        ],
        date: "February 15, 2026",
    },
    {
        id: "2",
        title: "Education supplies for 500 children",
        description: "Distributed books and stationery in rural schools.",
        image: "https://picsum.photos/id/20/800/800",
        fullStory:
            "Access to quality education remains one of the biggest challenges for children in rural India. In many schools, students are forced to share a single textbook among five or more classmates, and some don't even have a notebook to write in.\n\n" +
            "Through generous donations, we were able to assemble and distribute comprehensive education kits to 500 children across 12 government schools in Jharkhand and Chhattisgarh. Each kit included notebooks, pens, pencils, a geometry box, a school bag, and age-appropriate storybooks.\n\n" +
            "The distribution events were celebrated with joy by students, teachers, and parents alike. Teachers reported an immediate increase in attendance and classroom participation. For many children, it was the first time they owned a brand-new school bag.\n\n" +
            "This initiative is just the beginning — we aim to reach 2,000 children by the end of the academic year with your continued support.",
        stats: [
            { icon: "book-outline", value: "500", label: "Children" },
            { icon: "school-outline", value: "12", label: "Schools" },
            { icon: "location-outline", value: "Jharkhand", label: "Location" },
        ],
        highlights: [
            "500 children received full education kits",
            "Coverage across 12 government schools in 2 states",
            "Immediate increase in attendance and participation",
            "Goal to reach 2,000 children by year-end",
        ],
        date: "February 8, 2026",
    },
    {
        id: "3",
        title: "Clean drinking water project completed",
        description: "Installed 10 water purifiers in local villages.",
        image: "https://picsum.photos/id/403/800/800",
        fullStory:
            "For decades, families in several villages across Rajasthan have struggled with contaminated water sources. Waterborne diseases like cholera, typhoid, and dysentery were alarmingly common, especially among children under five.\n\n" +
            "Thanks to the collective efforts of our donors, we have successfully installed 10 advanced water purification units across these villages. Each unit is capable of filtering up to 1,000 litres per day, providing clean and safe drinking water to approximately 500 families.\n\n" +
            "Community members were trained on the maintenance and upkeep of these units to ensure long-term sustainability. Local health workers have already noted a significant drop in waterborne illness cases since the installations were completed.\n\n" +
            "The project also included awareness workshops on hygiene and safe water storage practices, empowering communities to take charge of their health. We plan to install 15 more units in neighbouring districts by mid-2026.",
        stats: [
            { icon: "water-outline", value: "10", label: "Purifiers" },
            { icon: "home-outline", value: "500+", label: "Families" },
            { icon: "location-outline", value: "Rajasthan", label: "Location" },
        ],
        highlights: [
            "10 purification units installed, each filtering 1,000 litres/day",
            "Clean water access for 500+ families",
            "Community-trained maintenance for long-term sustainability",
            "Significant drop in waterborne illness cases reported",
        ],
        date: "January 28, 2026",
    }
];

const RecentImpact = () => {
    const navigation = useNavigation();

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
                <TouchableOpacity onPress={() => navigation.navigate('StoryDetailScreen', { story: item })}>
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
