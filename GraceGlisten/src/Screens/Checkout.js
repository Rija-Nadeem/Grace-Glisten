import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import { CartItem, Header, Input, Wrapper } from '../Components';
import { colors, fonts, metrics } from '../utils/Theme';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';

import Validation from '../utils/Validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from '../utils/Toast';
import OrderPlaced from '../Components/OrderPlaced';
import { BarIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import { addItem, deleteItem, emptyCart } from '../Redux/actions';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';


class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      visible: false,
      loading: false,
    };
    this.inputs = {};
  }

  onChange(name, val) {
   // console.log({ [name]: val });
    this.setState({ [name]: val });
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  async apiCall() {
    this.setState({ loading: true });
    const res = await fetch('https://reactnativeapps.herokuapp.com/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.fname,
        lastname: this.state.lname,
        phonenumber: this.state.phoneNumber,
        address: this.state.phoneNumber,
        slotdatetime: new Date().toString(),
        email: this.state.email,
        appname: 'Mount Journey',
        item: JSON.stringify(this.props.cart.items),
      }),
    });

    const response = await res.json();
    this.setState({ loading: false });
    if (response.status) this.setState({ visible: true });
    else Toast('Some error occurred');
  }

  onButtonPress() {
    if (!Validation.isValidField(this.state.fname || '')) {
      return Toast('Please Enter Your First Name');
    }
    if (!Validation.isValidField(this.state.lname || '')) {
      return Toast('Please Enter Your Last Name');
    }
    if (!Validation.isValidField(this.state.email || '')) {
      return Toast('Please Enter Email');
    }
    if (!Validation.isEmailValid(this.state.email || '')) {
      return Toast('Please Enter Valid Email');
    }
    if (!Validation.isValidField(this.state.address || '')) {
      return Toast('Please Enter Address');
    }
    if (!Validation.isValidField(this.state.phonenumber || '')) {
      return Toast('Please Enter Valid Phone Number');
    }

    this.apiCall();
  }

  render() {
    return (
      <Wrapper bottom={0}>

          <Header textStyle={{fontWeight:'bold'}} title="Personal Details" />

          <OrderPlaced
            visible={this.state.visible}
            // visible={true}

            onPress={() => {
              this.setState({ visible: false },()=>{
                this.props.emptyCart();
                Navigator.navigateAndReset('Home');

              });
            }}
          />
          <KeyboardAwareScrollView
            bounces={false}
            style={{
              flex: 1,
              paddingHorizontal: metrics.defaultMargin,
              paddingTop:40,
              paddingLeft:metrics.largeMargin
            }}>
              <Fumi
                label={'First Name'}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={colors.secondary}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                labelStyle={{
                  color: colors.primary,
                  paddingTop:0
                }}
                borderColor={'green'}
                color={'blue'}
                inputStyle={{ paddingRight: 36, color: colors.grey, fontWeight: 'normal',fontFamily: fonts.secondary }}
                onChangeText={(text) => {
                  this.onChange('fname', text);
                }}
                onSubmitEditing={() => {
                  this.focusNextField('lname');
                }}
                ref={ref => this.inputs['fname'] = ref}
                value={this.state.fname}
                returnKeyType="next"
              />
              <Fumi
                label={'Last Name'}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={colors.secondary}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                labelStyle={{
                  color: colors.primary,
                  paddingTop:0
                }}
                borderColor={'green'}
                color={'blue'}
                onChangeText={(text) => {
                  this.onChange('lname', text);
                }}
                onSubmitEditing={() => {
                  this.focusNextField('email');
                }}
                style={{
                  marginVertical: 10
                }}
                ref={ref => this.inputs['lname'] = ref}
                value={this.state.lname}
                returnKeyType="next"
                inputStyle={{ paddingRight: 36, color: colors.grey, fontWeight: 'normal',fontFamily: fonts.secondary }}
                />
                <Fumi
                  label={'Email'}
                iconClass={FontAwesomeIcon}
                iconName={'envelope'}
                iconColor={colors.secondary}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                labelStyle={{
                  color: colors.primary,
                  paddingTop:0
                }}
                borderColor={'green'}
                color={'blue'}
                value={this.state.email}
                onChangeText={(text) => {
                  this.onChange('email', text);
                }}
                onSubmitEditing={() => {
                  this.focusNextField('phonenumber');
                }}
                style={{
                  marginVertical: 10
                }}
                ref={ref => this.inputs['email'] = ref}
                inputStyle={{ paddingRight: 36, color: colors.grey, fontWeight: 'normal',fontFamily: fonts.secondary }}
                />
                 <Fumi
                  label={'Phone Number'}
                iconClass={FontAwesomeIcon}
                iconName={'phone'}
                Inputtype='Numeric' 
                iconColor={colors.secondary}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                labelStyle={{
                  color: colors.primary,
                  paddingTop:0
                }}
                borderColor={'green'}
                color={'blue'}
                value={this.state.phonenumber}
                onChangeText={(text) => {
                  this.onChange('phonenumber', text);
                }}
                onSubmitEditing={() => {
                  this.focusNextField('address');
                }}
                style={{
                  marginVertical: 10
                }}
                ref={ref => this.inputs['phonenumber'] = ref}
                inputStyle={{ paddingRight: 36, color: colors.grey, fontWeight: 'normal',fontFamily: fonts.secondary }}
                />
                 <Fumi
                  label={'Address'}
                iconClass={FontAwesomeIcon}
                iconName={'home'}
                iconColor={colors.secondary}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                labelStyle={{
                  color: colors.primary,
                  paddingTop:0
                }}
                borderColor={'green'}
                color={'blue'}
                value={this.state.address}
                onChangeText={(text) => {
                  this.onChange('address', text);
                }}
                // onSubmitEditing={() => {
                //   this.focusNextField('lname');
                // }}
                multiline={true}
                numberOfLines={5}
                // style={{
                //   marginVertical: 10
                // }}
                ref={ref => this.inputs['address'] = ref}
                inputStyle={{ paddingRight: 36, color: colors.grey, fontWeight: 'normal',fontFamily: fonts.secondary }}
                />
           

          </KeyboardAwareScrollView>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <TouchableWithoutFeedback
                onPress={() => {
                  this.onButtonPress();
                }}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <View onPress={this.props.onPress} style={[styles.button, { overflow: 'hidden' }]}>
                    {this.state.loading ? (
                        <View style={styles.bar}>
                          <BarIndicator color={colors.primary} size={24} />
                        </View>
                      ) : (
                          <Text style={styles.buttonText} >Checkout</Text>
                      )}
                  </View>
  
                </View>
              </TouchableWithoutFeedback>
              )}
            </SafeAreaInsetsContext.Consumer>

      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.primaryBold,
    fontSize: 28,
    marginVertical: metrics.defaultMargin,
    fontWeight: 'bold',
  },
  buttonView: {
    // backgroundColor: colors.secondary,
    // flexDirection: 'row',
    // padding: 20,
    // justifyContent: 'space-between',
    // borderTopStartRadius: 30,
    // paddingHorizontal: 30,
    // marginLeft: metrics.defaultMargin,
    // minHeight: 80,

  },
  buttonText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight:'bold',
    fontFamily: fonts.primaryBold,
    textAlign: 'center',
    borderRadius: 20,
    paddingVertical:10
  },
  bar:{
    padding: 12,
    paddingVertical:22,
    borderRadius: 20,
    justifyContent:'center'
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 20,
    width: '80%',
    marginVertical:metrics.defaultMargin

  },
  iconView: {
    backgroundColor: 'rgb(255,255,255)',
    width: 50,
    marginRight: '5%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 28,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: fonts.secondary,
    fontSize: 16,
  },

});

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, { addItem, deleteItem, emptyCart })(
  Checkout,
);
