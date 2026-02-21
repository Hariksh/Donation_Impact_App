import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CampaignCard = ({ campaign, onPress }) => {
    const { image, title, raised, goal, donors, urgent } = campaign;
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

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={onPress}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                {urgent && (
                    <View style={styles.urgentBadge}>
                        <Text style={styles.urgentText}>URGENT</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>

                <View style={styles.statsContainer}>
                    <Text style={styles.raisedText}>₹{raised.toLocaleString()}</Text>
                    <Text style={styles.goalText}> raised of ₹{goal.toLocaleString()}</Text>
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

                <View style={styles.footer}>
                    <Text style={styles.donorsText}>{donors} Supporters</Text>
                    <TouchableOpacity
                        style={styles.donateButton}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('DonationScreen', { campaign })}
                    >
                        <Text style={styles.donateButtonText}>Donate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginVertical: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    imageContainer: {
        height: 180,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    urgentBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#E74C3C',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    urgentText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#222222',
        marginBottom: 12,
        lineHeight: 24,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 10,
    },
    raisedText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0D6855', // slightly softened primary green
    },
    goalText: {
        fontSize: 13,
        color: '#777777',
        fontWeight: '500',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#E8E8E8',
        borderRadius: 4,
        marginBottom: 20,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0D6855',
        borderRadius: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    donorsText: {
        fontSize: 13,
        color: '#666666',
        fontWeight: '600',
    },
    donateButton: {
        backgroundColor: '#0D6855',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 24,
    },
    donateButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default CampaignCard;
