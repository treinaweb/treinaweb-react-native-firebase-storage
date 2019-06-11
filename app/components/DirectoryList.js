import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class DirectoryList extends Component{
    static defaultProps = {
        directories: [],
        onSelect: () => {}
    }

    render(){
        console.log(props)
        const {props} = this;
        return (
            <View style={styles.directoriesList} >
                {props.directories.map((directory, index) => <Text style={styles.directory} key={index} onPress={() => {props.onSelect(directory)}} >{directory.name}</Text>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    directoriesList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    directory: {
        backgroundColor: '#0062ac',
        color: 'white',
        padding: 5,
        margin: 2
    }
})