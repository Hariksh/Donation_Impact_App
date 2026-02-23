import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProjectSelector = ({ selectedProject }) => {
    return (
        <View>
            <Text style={styles.sectionTitle}>Selected Project</Text>
            <TouchableOpacity style={styles.dropdown} activeOpacity={0.8}>
                <Ionicons name="business-outline" size={20} color="#008A5E" />
                <Text style={styles.dropdownText}>{selectedProject}</Text>
                <Ionicons name="chevron-down" size={20} color="#999" />
            </TouchableOpacity>
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
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 16,
        padding: 16,
        backgroundColor: '#FFF'
    },
    dropdownText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '700',
        color: '#222'
    }
});

export default ProjectSelector;
