import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    Platform,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
const StoryDetailScreen = ({ route, navigation }) => {
    const { story } = route.params;

    const handleShare = async () => {
        try {
            await Share.share({
                title: story.title,
                message: `${story.title}\n\n${story.description}\n\nRead more about this impact story on the Donation Impact App!`,
            });
        } catch (error) {
            console.log('Error sharing:', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}>
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: story.image }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <View style={styles.heroOverlay} />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.heroTextContainer}>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>Impact Story</Text>
                        </View>
                        <Text style={styles.heroTitle}>{story.title}</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    {story.stats && (
                        <View style={styles.statsRow}>
                            {story.stats.map((stat, index) => (
                                <View key={index} style={styles.statItem}>
                                    <Ionicons
                                        name={stat.icon}
                                        size={22}
                                        color="#0D6855"
                                    />
                                    <Text style={styles.statValue}>{stat.value}</Text>
                                    <Text style={styles.statLabel}>{stat.label}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                    <View style={styles.summaryCard}>
                        <Ionicons name="information-circle-outline" size={20} color="#0D6855" />
                        <Text style={styles.summaryText}>{story.description}</Text>
                    </View>
                    <Text style={styles.sectionTitle}>The Full Story</Text>
                    <Text style={styles.bodyText}>{story.fullStory}</Text>
                    {story.highlights && (
                        <>
                            <Text style={styles.sectionTitle}>Impact Highlights</Text>
                            {story.highlights.map((highlight, index) => (
                                <View key={index} style={styles.highlightItem}>
                                    <View style={styles.highlightDot} />
                                    <Text style={styles.highlightText}>{highlight}</Text>
                                </View>
                            ))}
                        </>
                    )}
                    {story.date && (
                        <View style={styles.dateContainer}>
                            <Ionicons name="calendar-outline" size={16} color="#999" />
                            <Text style={styles.dateText}>{story.date}</Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                        <Ionicons name="share-outline" size={20} color="#FFFFFF" />
                        <Text style={styles.shareButtonText}>Share This Story</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    heroContainer: {
        position: 'relative',
        width: width,
        height: 320,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.40)',
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight + 10,
        left: 16,
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroTextContainer: {
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
    },
    categoryBadge: {
        backgroundColor: '#0D6855',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    heroTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: 34,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#222',
        marginTop: 6,
    },
    statLabel: {
        fontSize: 11,
        color: '#888',
        fontWeight: '500',
        marginTop: 2,
        textAlign: 'center',
    },
    summaryCard: {
        flexDirection: 'row',
        backgroundColor: '#E8F5F1',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        alignItems: 'flex-start',
        gap: 10,
    },
    summaryText: {
        flex: 1,
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#222',
        marginBottom: 12,
        letterSpacing: 0.2,
    },
    bodyText: {
        fontSize: 16,
        color: '#444',
        lineHeight: 26,
        marginBottom: 24,
        fontWeight: '400',
    },
    highlightItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingLeft: 4,
    },
    highlightDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0D6855',
        marginTop: 7,
        marginRight: 12,
    },
    highlightText: {
        flex: 1,
        fontSize: 15,
        color: '#444',
        lineHeight: 22,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 24,
        gap: 6,
    },
    dateText: {
        fontSize: 13,
        color: '#999',
        fontWeight: '500',
    },
    shareButton: {
        flexDirection: 'row',
        backgroundColor: '#0D6855',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#0D6855',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default StoryDetailScreen;
