import React, { Component } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

export default class ActivityIndicatorTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        }
    }

    render() {
        return (
            <ActivityIndicator animating={this.state.isShow} color="green" size="large"></ActivityIndicator>
        );
    }
}