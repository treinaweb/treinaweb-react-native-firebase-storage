import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';


export default class Breadcrumb extends Component{
    static defaultProps = {
        directory: {},
        onSelect: ()=>{}
    }

    listDirectories = (directory) => {
        if(directory.parent){
            return [ ...this.listDirectories(directory.parent), directory];
        }
        return [directory];
    }

    render(){
        const directories = this.listDirectories(this.props.directory);
        return (
            <View style={styles.breadcrumb} >
                {
                    directories.map((directory, index) => {
                        if(index === 0){
                            return <Text style={styles.breadcrumbItem} key={index} onPress={() => this.props.onSelect(directory)}>Root</Text>
                        }else if(index === directories.length - 1){
                            return <Text style={[styles.breadcrumbItem, styles.currentItem]} key={index} > > {directory.name}</Text>
                        }
                        return <Text style={styles.breadcrumbItem} key={index} onPress={() => this.props.onSelect(directory)}> > {directory.name}</Text>
                    })
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    breadcrumb: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ccc',
        paddingTop: 5,
        paddingBottom: 5
    },
    breadcrumbItem: {
        padding: 2,
    },
    currentItem: {
        fontWeight: 'bold'
    }
})