import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions,
    StatusBar,
    Platform,
    SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 270;

const CampaignDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const campaign = route.params?.campaign;
    const animatedWidth = useRef(new Animated.Value(0)).current;
    const raisedAmount = campaign?.raisedAmount ?? campaign?.raised ?? 0;
    const goalAmount = campaign?.goalAmount ?? campaign?.goal ?? 1;
    const donors = campaign?.donors ?? 0;
    const progressPercent = Math.min((raisedAmount / goalAmount) * 100, 100);

    useEffect(() => {
        if (campaign) {
            Animated.timing(animatedWidth, {
                toValue: progressPercent,
                duration: 1200,
                useNativeDriver: false,
            }).start();
        }
    }, [progressPercent]);

    if (!campaign) {
        return (
            <SafeAreaView style={styles.fallbackContainer}>
                <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
                <View style={styles.fallbackContent}>
                    <Text style={styles.fallbackEmoji}>📭</Text>
                    <Text style={styles.fallbackTitle}>No Campaign Found</Text>
                    <Text style={styles.fallbackSubtitle}>
                        It looks like you arrived here without selecting a campaign.
                    </Text>
                    <TouchableOpacity
                        style={styles.fallbackButton}
                        activeOpacity={0.85}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.fallbackButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.screenContainer}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: campaign.image }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <View style={styles.imageOverlay} />
                </View>
                <View style={styles.contentCard}>
                    <Text style={styles.campaignTitle}>{campaign.title}</Text>
                    <View style={styles.amountRow}>
                        <Text style={styles.raisedAmountText}>
                            ₹{raisedAmount.toLocaleString('en-IN')}
                        </Text>
                        <Text style={styles.goalAmountText}>
                            {' '}raised of ₹{goalAmount.toLocaleString('en-IN')}
                        </Text>
                    </View>
                    <View style={styles.progressBarTrack}>
                        <Animated.View
                            style={[
                                styles.progressBarFill,
                                {
                                    width: animatedWidth.interpolate({
                                        inputRange: [0, 100],
                                        outputRange: ['0%', '100%'],
                                    }),
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.statsRow}>
                        <View style={styles.statBadge}>
                            <Text style={styles.statBadgeValue}>
                                {progressPercent.toFixed(0)}%
                            </Text>
                            <Text style={styles.statBadgeLabel}>Funded</Text>
                        </View>
                        <View style={styles.statBadge}>
                            <Text style={styles.statBadgeValue}>
                                {donors.toLocaleString('en-IN')}
                            </Text>
                            <Text style={styles.statBadgeLabel}>Donors</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.sectionLabel}>About this Campaign</Text>
                    <Text style={styles.descriptionText}>
                        {campaign.description ||
                            'This campaign aims to make a meaningful difference in the lives of those affected. ' +
                            'Every contribution counts towards reaching the goal and creating lasting impact. ' +
                            'Your generous donation will help provide essential resources, support, and hope to communities in need. ' +
                            'Together, we can build a brighter future — one act of kindness at a time.\n\n' +
                            'All funds raised are transparently managed and directed towards on-ground relief efforts. ' +
                            'Donors will receive regular updates on how their contributions are being utilised.'}
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.donateButtonContainer}>
                <TouchableOpacity
                    style={styles.donateButton}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('DonationScreen', { campaign })}
                >
                    <Text style={styles.donateButtonText}>Donate Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    scrollView: {
        flex: 1,
    },
    imageWrapper: {
        width: SCREEN_WIDTH,
        height: IMAGE_HEIGHT,
        overflow: 'hidden',
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    contentCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: -32,
        borderRadius: 20,
        padding: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 14,
        elevation: 6,
        marginBottom: 100,
    },
    campaignTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#222222',
        lineHeight: 30,
        marginBottom: 16,
        letterSpacing: 0.2,
    },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 14,
    },
    raisedAmountText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0D6855',
    },
    goalAmountText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#888888',
    },
    progressBarTrack: {
        height: 10,
        backgroundColor: '#E8E8E8',
        borderRadius: 5,
        marginBottom: 18,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0D6855',
        borderRadius: 5,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statBadge: {
        alignItems: 'center',
        backgroundColor: '#F0F8F6',
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 14,
    },
    statBadgeValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0D6855',
        marginBottom: 2,
    },
    statBadgeLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#777777',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 23,
        color: '#555555',
        fontWeight: '400',
    },
    donateButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
        paddingTop: 14,
        backgroundColor: '#F4F4F4',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    donateButton: {
        backgroundColor: '#0D6855',
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0D6855',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 6,
    },
    donateButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    fallbackContainer: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    fallbackContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    fallbackEmoji: {
        fontSize: 56,
        marginBottom: 20,
    },
    fallbackTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 8,
    },
    fallbackSubtitle: {
        fontSize: 15,
        color: '#777777',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 28,
    },
    fallbackButton: {
        backgroundColor: '#0D6855',
        paddingHorizontal: 36,
        paddingVertical: 14,
        borderRadius: 24,
    },
    fallbackButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});

export default CampaignDetailsScreen;
