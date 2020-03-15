import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import * as firebase from 'firebase';

export default class HomeScreen extends Component {

    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar} />
                <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                    <View>
                        <Text style={styles.name}>{post.name}</Text>
                        <Text style={styles.timestamp}>{post.timestamp}</Text>
                    </View>

                    <Text style={styles.post}>{post.text}</Text>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>
                </View>

                <FlatList
                    style={styles.feed} 
                    data={posts} 
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor =  {item => item.id}
                    showsVerticalScrollIndicator={false}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efecf4'
    },
    header: {
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ebecf4',
    },
    headerTitle:{
        fontSize: 18,
        fontWeight: '500'
    },
    feed:{
        marginHorizontal: 15,

    },
    name:{
        fontWeight: '300',
        fontSize: 18,
        color: '#454d65'
    },
    timestamp:{
        marginTop: 5,
        fontSize: 10,
        color: '#c4c6ce'
    },
    feedItem:{
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 8,
        flexDirection:  "row",
        marginVertical: 8
    },
    avatar:{
        width: 40,
        height: 40,
        marginRight: 15,
        borderRadius: 16
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    }
});