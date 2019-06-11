import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Dialog from "react-native-dialog";

import {FirebaseStorage} from '../services/FirebaseStorage';

export default class ImageDialog extends Component{
    static defaultProps = {
        isOpen: false,
        image: {},
        onClose: () => {},
        onRemove: () => {}
    }

    cutTitle = (title) => {
        const limit = 30;
        if(title.length > limit){
            title = title.substring(0, limit) + '...';
        }
        return title;
    }

    onRemove = () => {
        this.props.onRemove(this.props.image);
    }

    download = () => {
        FirebaseStorage.downloadImage(this.props.image);
    }

    render(){
        const {isOpen, image, onClose} = this.props;
        return(
            <View>
                <Dialog.Container visible={isOpen} >
                    <Dialog.Title>{this.cutTitle(image.name || '')}</Dialog.Title>
                    <View style={styles.imageContainer} >
                        <Image style={styles.image} source={{uri: image.uri}} />
                    </View>
                    <Dialog.Button label="Close" onPress={onClose} />
                    <Dialog.Button label="Delete" onPress={this.onRemove} />
                    <Dialog.Button label="Download" onPress={this.download} />
                </Dialog.Container>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    imageContainer:{
        alignItems: 'center'
    },
    image: {
        width: 250,
        height: 250
    }
})