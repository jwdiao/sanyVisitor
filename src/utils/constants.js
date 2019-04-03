import {Dimensions, Platform, StyleSheet} from "react-native";

export const DIMENSION_RATIO = Dimensions.get('window').height / 667

export const isSmallScreen = Dimensions.get('screen').width < 375

export const inputHeight = Platform.OS === 'ios' ? 80 : 50

export const FONT_SIZE_10 = isSmallScreen ? 10 : 12
export const FONT_SIZE_12 = isSmallScreen ? 12 : 14
export const FONT_SIZE_14 = isSmallScreen ? 14 : 16
export const FONT_SIZE_16 = isSmallScreen ? 16 : 20
export const FONT_SIZE_18 = isSmallScreen ? 18 : 22
export const FONT_SIZE_20 = isSmallScreen ? 20 : 24
export const FONT_SIZE_24 = isSmallScreen ? 24 : 30
export const FONT_SIZE_34 = isSmallScreen ? 34 : 40
export const FONT_SIZE_50 = isSmallScreen ? 50 : 60

export const CommonStyles = StyleSheet.create({
  iconView: {
    height: 20,
    width: 20,
    alignItems: 'center',
  },
  rootView: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerView: {
    height: 160 * DIMENSION_RATIO,
    backgroundColor: '#24C6AE',
    justifyContent: 'center',
  },
  patientInfoView: {
    height: 160 * DIMENSION_RATIO,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 20 * DIMENSION_RATIO,
    marginBottom: 50 * DIMENSION_RATIO,
  },
  patientIllnessInfo: {
    fontSize: 14,
    height: 20 * DIMENSION_RATIO,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  iconsBarView: {
    height: 100 * DIMENSION_RATIO,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: -50 * DIMENSION_RATIO,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOpacity: 1,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 36,
    height: 36,
  },
  iconUnpressedTextStyle: {
    fontSize: FONT_SIZE_12,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#686868',
    marginBottom: 4 * DIMENSION_RATIO,
  },
  iconPressedTextStyle: {
    fontSize: FONT_SIZE_12,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#1379C9',
    marginBottom: 4 * DIMENSION_RATIO,
  },
})