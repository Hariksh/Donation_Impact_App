import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Platform, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDonation } from '../context/DonationContext';

const SettingItem = ({ icon, title, isToggle, value, onToggle, onPress, isLast }) => (
    <TouchableOpacity style={[styles.settingRow, isLast && { borderBottomWidth: 0 }]} onPress={onPress} activeOpacity={isToggle ? 1 : 0.6}>
        <View style={styles.settingLeft}>
            <View style={styles.settingIconCircle}>
                <Ionicons name={icon} size={18} color="#0D6855" />
            </View>
            <Text style={styles.settingTitle}>{title}</Text>
        </View>
        {isToggle ? (
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: '#E0E0E0', true: '#0D6855' }}
                thumbColor="#FFFFFF"
            />
        ) : (
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        )}
    </TouchableOpacity>
);

const ProfileScreen = () => {
    const { totalDonated, familiesSupported, campaignsContributed } = useDonation();
    const [notificationsOn, setNotificationsOn] = useState(true);
    const [darkModeOn, setDarkModeOn] = useState(false);

    const handleLogout = () => {
        Alert.alert('Logged Out', 'You have been logged out successfully.', [{ text: 'OK' }]);
    };

    const bg = darkModeOn ? '#121212' : '#F4F4F4';
    const cardBg = darkModeOn ? '#1E1E1E' : '#FFFFFF';
    const textColor = darkModeOn ? '#E0E0E0' : '#222222';
    const subTextColor = darkModeOn ? '#AAAAAA' : '#999999';

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: bg }]}>
            <StatusBar barStyle={darkModeOn ? 'light-content' : 'dark-content'} backgroundColor={bg} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={40} color="#0D6855" />
                    </View>
                    <Text style={[styles.userName, { color: textColor }]}>Hariksh Suryawanshi</Text>
                    <Text style={[styles.userEmail, { color: subTextColor }]}>hariksh.dev@gmail.com</Text>
                    <Text style={styles.memberSince}>Member since 2024</Text>
                    <TouchableOpacity style={styles.editProfileBtn}>
                        <Ionicons name="create-outline" size={16} color="#0D6855" />
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsCard}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>₹{totalDonated.toLocaleString('en-IN')}</Text>
                        <Text style={styles.statLabel}>Total Donated</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{campaignsContributed}</Text>
                        <Text style={styles.statLabel}>Campaigns</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{familiesSupported}</Text>
                        <Text style={styles.statLabel}>Families Supported</Text>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { color: textColor }]}>Settings</Text>
                <View style={[styles.settingsCard, { backgroundColor: cardBg }]}>
                    <SettingItem
                        icon="notifications-outline"
                        title="Notifications"
                        isToggle
                        value={notificationsOn}
                        onToggle={setNotificationsOn}
                    />
                    <SettingItem
                        icon="moon-outline"
                        title="Dark Mode"
                        isToggle
                        value={darkModeOn}
                        onToggle={setDarkModeOn}
                    />
                    <SettingItem
                        icon="download-outline"
                        title="Download Tax Receipts"
                        onPress={() => console.log('Download Tax Receipts')}
                    />
                    <SettingItem
                        icon="help-circle-outline"
                        title="Help & Support"
                        onPress={() => console.log('Help & Support')}
                    />
                    <SettingItem
                        icon="shield-checkmark-outline"
                        title="Privacy Policy"
                        onPress={() => console.log('Privacy Policy')}
                    />
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#FF4444" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 32,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 28,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E6F9F1',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    userName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#999999',
        fontWeight: '500',
        marginBottom: 4,
    },
    memberSince: {
        fontSize: 12,
        color: '#BBBBBB',
        fontWeight: '500',
        marginBottom: 16,
    },
    editProfileBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#0D6855',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
        gap: 6,
    },
    editProfileText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0D6855',
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: '#0D6855',
        borderRadius: 18,
        padding: 20,
        marginBottom: 28,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        height: 32,
        backgroundColor: 'rgba(255,255,255,0.25)',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 12,
    },
    settingsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F0F8F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333333',
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#FF4444',
        borderRadius: 16,
        paddingVertical: 14,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF4444',
    },
    versionText: {
        textAlign: 'center',
        fontSize: 11,
        color: '#CCCCCC',
        fontWeight: '500',
        marginTop: 20,
    },
});

export default ProfileScreen;
