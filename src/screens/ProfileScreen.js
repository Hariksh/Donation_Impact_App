import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Platform, StatusBar, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDonation } from '../context/DonationContext';
import { useUser } from '../context/UserContext';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
const SettingItem = ({ icon, title, isToggle, value, onToggle, onPress, isLast }) => (
    <TouchableOpacity style={[styles.settingRow, isLast && { borderBottomWidth: 0 }]} onPress={onPress} activeOpacity={isToggle ? 1 : 0.6}>
        <View style={styles.settingLeft}>
            <View style={styles.settingIconCircle}>
                <Ionicons name={icon} size={18} color="#008A5E" />
            </View>
            <Text style={styles.settingTitle}>{title}</Text>
        </View>
        {isToggle ? (
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: '#E0E0E0', true: '#008A5E' }}
                thumbColor="#FFFFFF"
            />
        ) : (
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        )}
    </TouchableOpacity>
);

const ProfileScreen = () => {
    const { totalDonated, familiesSupported, campaignsContributed } = useDonation();
    const { userName, setUserName, userEmail, setUserEmail } = useUser();
    const [notificationsOn, setNotificationsOn] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(userName);
    const [tempEmail, setTempEmail] = useState(userEmail);

    const handleEdit = () => {
        setTempName(userName);
        setTempEmail(userEmail);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!tempName.trim()) {
            Alert.alert('Error', 'Name cannot be empty.');
            return;
        }
        setUserName(tempName.trim());
        setUserEmail(tempEmail.trim());
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleLogout = () => {
        Alert.alert('Logged Out', 'You have been logged out successfully.', [{ text: 'OK' }]);
    };

    const handleDownloadReceipt = async () => {
        try {
            const html = `
                <html>
                    <body style="font-family: Helvetica, Arial, sans-serif; padding: 40px; color: #333;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #008A5E; margin-bottom: 5px;">DONATION IMPACT CHARITY</h1>
                            <p style="color: #666; margin-top: 0;">Official Tax Receipt</p>
                        </div>
                        <hr style="border: 0; border-top: 1px solid #E0E0E0; margin-bottom: 30px;" />
                        
                        <div style="margin-bottom: 30px;">
                            <p style="margin: 8px 0;"><strong>Donor Name:</strong> ${userName}</p>
                            <p style="margin: 8px 0;"><strong>Donor Email:</strong> ${userEmail}</p>
                            <p style="margin: 8px 0;"><strong>Date Generated:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                        </div>

                        <div style="background-color: #F4F4F4; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                            <h3 style="margin-top: 0; color: #222;">Donation Summary</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">Total Amount Donated</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">₹${totalDonated.toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">Campaigns Supported</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">${campaignsContributed}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">Families Supported</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">${familiesSupported}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="margin-top: 50px; text-align: center; color: #666; font-size: 14px;">
                            <p>Thank you for your generous support!</p>
                            <p>Your contributions help make a real difference.</p>
                        </div>
                        
                        <div style="margin-top: 40px; text-align: center; color: #999; font-size: 11px;">
                            <p>This receipt is valid for income tax deduction purposes under applicable laws.</p>
                            <p>This is a computer-generated document and requires no physical signature.</p>
                        </div>
                    </body>
                </html>
            `;

            const { uri } = await Print.printToFileAsync({ html });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    dialogTitle: 'Download Tax Receipt',
                    mimeType: 'application/pdf',
                    UTI: 'com.adobe.pdf'
                });
            } else {
                Alert.alert('Success', 'Tax receipt downloaded!', [{ text: 'OK' }]);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to generate tax receipt. Please try again.');
            console.error('Error generating receipt:', error);
        }
    };

    const handleHelpSupport = () => {
        Alert.alert(
            'Help & Support',
            'If you need assistance, please contact us at support@donationimpact.org.',
            [
                { text: 'Email Support', onPress: () => Linking.openURL('mailto:support@donationimpact.org') },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const handlePrivacyPolicy = () => {
        Alert.alert(
            'Privacy Policy',
            'Your privacy is important to us. We securely store your data and never share it with third parties.',
            [{ text: 'OK' }]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={40} color="#008A5E" />
                    </View>
                    {isEditing ? (
                        <>
                            <TextInput
                                style={styles.editInput}
                                value={tempName}
                                onChangeText={setTempName}
                                placeholder="Full Name"
                                placeholderTextColor="#BBBBBB"
                            />
                            <TextInput
                                style={styles.editInput}
                                value={tempEmail}
                                onChangeText={setTempEmail}
                                placeholder="Email"
                                placeholderTextColor="#BBBBBB"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <View style={styles.editActions}>
                                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                                    <Text style={styles.saveBtnText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                                    <Text style={styles.cancelBtnText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={styles.userName}>{userName}</Text>
                            <Text style={styles.userEmail}>{userEmail}</Text>
                            <Text style={styles.memberSince}>Member since 2024</Text>
                            <TouchableOpacity style={styles.editProfileBtn} onPress={handleEdit}>
                                <Ionicons name="create-outline" size={16} color="#008A5E" />
                                <Text style={styles.editProfileText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </>
                    )}
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

                <Text style={styles.sectionTitle}>Settings</Text>
                <View style={styles.settingsCard}>
                    <SettingItem
                        icon="notifications-outline"
                        title="Notifications"
                        isToggle
                        value={notificationsOn}
                        onToggle={setNotificationsOn}
                    />
                    <SettingItem
                        icon="download-outline"
                        title="Download Tax Receipts"
                        onPress={handleDownloadReceipt}
                    />
                    <SettingItem
                        icon="help-circle-outline"
                        title="Help & Support"
                        onPress={handleHelpSupport}
                    />
                    <SettingItem
                        icon="shield-checkmark-outline"
                        title="Privacy Policy"
                        onPress={handlePrivacyPolicy}
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
        borderColor: '#008A5E',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
        gap: 6,
    },
    editProfileText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#008A5E',
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: '#008A5E',
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
    editInput: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: '#222222',
        marginBottom: 10,
        textAlign: 'center',
    },
    editActions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 6,
    },
    saveBtn: {
        backgroundColor: '#008A5E',
        paddingHorizontal: 28,
        paddingVertical: 10,
        borderRadius: 20,
    },
    saveBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    cancelBtn: {
        borderWidth: 1.5,
        borderColor: '#CCCCCC',
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 20,
    },
    cancelBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#999999',
    },
});

export default ProfileScreen;
