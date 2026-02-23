import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CampaignCard = ({ campaign, onPress }) => {
    const { image, title, raised, goal, category, location, description } = campaign;
    const progressRatio = Math.min(raised / goal, 1);
    const progressPercent = progressRatio * 100;
    const navigation = useNavigation();

    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: progressPercent,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [progressPercent]);

    const formatAmount = (amount) => {
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        }
        return `₹${amount.toLocaleString()}`;
    };

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={onPress}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                {campaign.urgent && (
                    <View style={styles.urgentBadge}>
                        <Text style={styles.urgentBadgeText}>HIGH PRIORITY</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <View style={styles.headerInfo}>
                    <Text style={styles.categoryText}>{category ? category.toUpperCase() : 'GENERAL'}</Text>
                    <View style={styles.dotSeparator} />
                    <Text style={styles.locationText}>{location || 'India'}</Text>
                </View>

                <Text style={styles.title} numberOfLines={2}>{title}</Text>

                {description && (
                    <Text style={styles.description} numberOfLines={3}>
                        {description}
                    </Text>
                )}

                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressPercentText}>{Math.floor(progressPercent)}% <Text style={styles.raisedLabel}>Raised</Text></Text>
                        <Text style={styles.goalText}>Goal: {formatAmount(goal)}</Text>
                    </View>

                    <View style={styles.progressBarBackground}>
                        <Animated.View
                            style={[
                                styles.progressBarFill,
                                {
                                    width: animatedWidth.interpolate({
                                        inputRange: [0, 100],
                                        outputRange: ['0%', '100%']
                                    })
                                }
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountRaisedLabel}>AMOUNT RAISED</Text>
                        <Text style={styles.raisedAmountText}>{formatAmount(raised)}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.donateButton}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('DonationScreen', { campaign })}
                    >
                        <Text style={styles.donateButtonText}>Donate Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginVertical: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
        marginHorizontal: 4,
    },
    imageContainer: {
        height: 200,
        width: '100%',
        backgroundColor: '#EAEAEA',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    urgentBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#F39C12',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    urgentBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    content: {
        padding: 24,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#008A5E',
        letterSpacing: 0.5,
    },
    dotSeparator: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#D1D1D1',
        marginHorizontal: 8,
    },
    locationText: {
        fontSize: 12,
        color: '#777777',
        fontWeight: '500',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111111',
        marginBottom: 8,
        lineHeight: 26,
    },
    description: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 22,
        marginBottom: 20,
    },
    progressSection: {
        marginBottom: 20,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    progressPercentText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#008A5E',
    },
    raisedLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#999999',
    },
    goalText: {
        fontSize: 12,
        color: '#999999',
        fontWeight: '500',
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#008A5E',
        borderRadius: 3,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    amountContainer: {
        justifyContent: 'center',
    },
    amountRaisedLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#A0A0A0',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    raisedAmountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111111',
    },
    donateButton: {
        backgroundColor: '#008A5E',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        shadowColor: '#008A5E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    donateButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default CampaignCard;
