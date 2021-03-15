import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import data from '../../data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';
import {colors, fonts, metrics} from '../utils/Theme';
export default class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const image=this.getImage()
    const {index}=this.props
    const { price, description, name,bgcolor, image} = this.props.item;
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          Navigator.navigate('ProductDetail', {
            item: this.props.item,
            category: this.props.item.categoryid,
          })
        }>
        <View style={[styles.container,{
          // flexDirection: index%2==0 ? 'row-reverse':'row',
          ...this.props.style
          }]}>
          <Image source={image} style={styles.image} />
          <View style={{flex: 1, flexDirection:'column', justifyContent:'center'}}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
            <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">{description}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: metrics.width / 1.3,
    // alignItems: 'flex-end',
    backgroundColor: 'transparent',
    flexDirection:'row',
    marginRight: 20,
    
  },
  image: {
    width: 95,
    height: 95,
    marginRight: 20,
    backgroundColor:'white',
    resizeMode:'contain',
  },

  iconView: {
    backgroundColor: colors.secondary,
    borderBottomEndRadius: 15,
    borderTopStartRadius: 15,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    shadowColor: colors.secondary,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 16,
    fontFamily:fonts.primaryBold,
    fontWeight:'bold',

  },
  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.grey
    
  },
  desc:{
    fontSize: 12,
    fontFamily:fonts.secondary,
    color: colors.grey
  }
});
