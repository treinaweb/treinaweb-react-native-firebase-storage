import React, {Component} from 'react';
import {Platform, StyleSheet, Text, SafeAreaView, ScrollView, Button, RefreshControl} from 'react-native';

import {FirebaseStorage} from './app/services/FirebaseStorage';
import DirectoryList from './app/components/DirectoryList';
import Breadcrumb from './app/components/Breadcrumb';
import ImageList from './app/components/ImageList';
import ImageDialog from './app/components/ImageDialog';

export default class App extends Component {

  state = {
    isLoading: false,
    currentImage: {},
    currentDirectory: {},
    imageList: [],
    directoryList: [],
    isDialogOpen: false
  }

  componentDidMount(){
    this.listContent();
  }

  listContent = async (directory) => {
    try{
      this.setState({isLoading: true});
      const {imageList, directoryList, currentDirectory} = await FirebaseStorage.listAll(directory);
      this.setState({imageList, directoryList, currentDirectory, isLoading: false});
      return {imageList, directoryList, currentDirectory}
    }catch(error){
      console.log('error', error);
    }
  }

  onRefresh = () => {
    this.listContent(this.state.currentDirectory);
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
  
  removeImage = async (image) => {
    await FirebaseStorage.removeImage(image);
    this.onRefresh();
    this.onCloseDialog();
  }

  render() {
    const {state} = this;
    
    return (
      <SafeAreaView style={styles.container}>
        <Breadcrumb onSelect={this.listContent} directory={state.currentDirectory} />

        <ScrollView 
          style={styles.scrollView}
          refreshControl={<RefreshControl
              refreshing={state.isLoading}
              onRefresh={this.onRefresh}
            />}
          >
          <DirectoryList onSelect={this.listContent} directories={state.directoryList} />
          <ImageList images={state.imageList} onSelect={this.onSelectImage} />
        </ScrollView>

        <Button title="Add" />

        <ImageDialog image={state.currentImage} isOpen={state.isDialogOpen} onClose={this.onCloseDialog} onRemove={this.removeImage} />
        
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
