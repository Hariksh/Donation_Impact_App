import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const MessageInput = ({ message, setMessage }) => {
    return (
        <View>
            <Text style={styles.sectionTitle}>A Message or Dua (Optional)</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Write your prayers or messages here..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
            />
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
    textArea: {
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 16,
        padding: 16,
        height: 100,
        backgroundColor: '#FFF',
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#222'
    }
});

export default MessageInput;
