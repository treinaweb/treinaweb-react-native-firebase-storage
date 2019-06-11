import React, {Component} from 'react';
import {Platform, StyleSheet, Text, SafeAreaView, ScrollView, Button} from 'react-native';

import {FirebaseStorage} from './app/services/FirebaseStorage';
import DirectoryList from './app/components/DirectoryList';
import Breadcrumb from './app/components/Breadcrumb';
import ImageList from './app/components/ImageList';
import ImageDialog from './app/components/ImageDialog';

export default class App extends Component {

  state = {
    currentImage: {},
    currentDirectory: {
      name: 'pasta 3',
      parent: {
        name: 'pasta 2',
        parent: {
          name: 'pasta 1',
          parent: {

          }
        }
      }
    },
    imageList: [
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
      {uri: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/1024x1321/54f0f1d749d57_-_clx0704cover_1.jpg'},
    ],
    directoryList: [
      {name: 'pasta 1'},
      {name: 'pasta 2'},
      {name: 'pasta 3'}
    ],
    isDialogOpen: false
  }

  onSelectImage = (image) => {
    this.setState({
      isDialogOpen: true,
      currentImage: image
    })
  }

  onCloseDialog = () => {
    this.setState({
      isDialogOpen: false,
      currentImage: {}
    })
  }

  render() {
    const {state} = this;
    
    return (
      <SafeAreaView style={styles.container}>
        <Breadcrumb directory={state.currentDirectory} />

        <ScrollView style={styles.scrollView} >
          <DirectoryList directories={state.directoryList} />
          <ImageList images={state.imageList} onSelect={this.onSelectImage} />
        </ScrollView>

        <Button title="Add" />

        <ImageDialog image={state.currentImage} isOpen={state.isDialogOpen} onClose={this.onCloseDialog} />
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    flex: 1,
    marginTop: 10
  }
});
