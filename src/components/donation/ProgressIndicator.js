import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressIndicator = () => {
    return (
        <View>
            <View style={styles.progressIndicator}>
                {['CAUSE', 'AMOUNT', 'DETAILS', 'PAYMENT'].map((step, idx, arr) => (
                    <React.Fragment key={step}>
                        <View style={styles.stepItem}>
                            <Text style={[styles.stepText, idx === 1 && styles.stepTextActive]}>{step}</Text>
                            <View style={[styles.stepDot, idx === 1 && styles.stepDotActive, idx < 1 && styles.stepDotCompleted]} />
                        </View>
                        {idx < arr.length - 1 && (
                            <View style={[styles.stepLine, idx < 1 && styles.stepLineCompleted]} />
                        )}
                    </React.Fragment>
                ))}
            </View>
            <Text style={styles.stepSubtext}>Step 2: Selection & Amount</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    progressIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 24
    },
    stepItem: {
        alignItems: 'center'
    },
    stepText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#C0C0C0',
        marginBottom: 4
    },
    stepTextActive: {
        color: '#008A5E'
    },
    stepDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0'
    },
    stepDotActive: {
        backgroundColor: '#008A5E',
        width: 12,
        height: 12,
        borderRadius: 6
    },
    stepDotCompleted: {
        backgroundColor: '#008A5E'
    },
    stepLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
        marginTop: 12
    },
    stepLineCompleted: {
        backgroundColor: '#008A5E'
    },
    stepSubtext: {
        textAlign: 'center',
        fontSize: 11,
        color: '#888',
        marginTop: 8,
        marginBottom: 16
    }
});

export default ProgressIndicator;
