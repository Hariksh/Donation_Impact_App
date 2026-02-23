import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SegmentedControl = ({ title, options, selectedValue, onValueChange, customStyle }) => {
    return (
        <View>
            {title && <Text style={styles.sectionTitle}>{title}</Text>}
            <View style={[styles.segmentedControl, customStyle]}>
                {options.map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[styles.segmentButton, selectedValue === item && styles.segmentButtonActive]}
                        onPress={() => onValueChange(item)}
                    >
                        <Text style={[styles.segmentButtonText, selectedValue === item && styles.segmentButtonTextActive]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
        marginTop: 24,
        marginBottom: 12
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        borderRadius: 24,
        padding: 4
    },
    segmentButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 20
    },
    segmentButtonActive: {
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    segmentButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888'
    },
    segmentButtonTextActive: {
        color: '#222',
        fontWeight: '700'
    }
});

export default SegmentedControl;
