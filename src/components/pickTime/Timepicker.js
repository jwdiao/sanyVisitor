/**
 * Bootstrap of PickerTest
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
	StyleSheet
} from 'react-native';

import Picker from 'react-native-picker';
export default class Timepicker extends Component {

    constructor(props, context) {
        super(props, context);
    }

    _createDateData() {
        let date = [];
        for(let i=1970;i<2020;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    _showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
			pickerConfirmBtnText:'完成',
			pickerCancelBtnText:'取消',
			pickerTitleText:null,
			pickerBg:[255,255,255,1],
            pickerFontColor: [255, 0 ,0, 1],
			pickerToolBarBg:[169,169,169,.1],
			pickerFontColor:[0,0,0,1],
			pickerConfirmBtnColor:[0,0,0,1],
			pickerCancelBtnColor:[0,0,0,1],
			pickerFontSize:19,
			pickerToolBarFontSize:15,
			selectedValue:['2012年','12月','15日'],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }
    render() {
        return (
            <View style={{height: Dimensions.get('window').height}}>
                <TouchableOpacity style={{marginTop: 40, marginLeft: 20}} onPress={this._showDatePicker.bind(this)}>
                    <Text>DatePicker</Text>
                </TouchableOpacity>
				<View style={styles.line}></View>
                <TextInput 
                    placeholder="test picker with input"
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 10,
                        padding: 5
                    }}
                />
				
				
            </View>
        );
    }
};
const styles = StyleSheet.create({
  
});