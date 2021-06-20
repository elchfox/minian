var React = require("react-native");
const { COLORS,SIZES, DIRS } = require("./constants");

var { StyleSheet } = React;
module.exports = StyleSheet.create({

  row: {
    flex: 1,
    flexDirection: "row"
  },
  column: {
    flex: 1,
    flexDirection: "column"
  },
  textCenter:{
    textAlign:'center'
  },
  centerRow:{alignItems:'center'},
  center:{alignItems:'center',justifyContent:'center'},
  rowSpaceAround: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  columnSpaceAround: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  rowSpaceBetween: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  columnSpaceBetween: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },

  spaceAround: {
    justifyContent: "space-around"
  },
  spaceBetween: {
    justifyContent: "space-between"
  },
  shadowPro:{
    shadowColor: "#00000026",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 4,
  },
  inputSearch: {
    width:"100%",paddingHorizontal:10,
    color:COLORS.primary,
    maxHeight:40,
    backgroundColor:COLORS.colorBGsec,
    borderRadius:SIZES.radius
 },

  boxShadow: {
     shadowColor: '#00000082',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 8
  },

  boxShadowC: {
    shadowColor: "#00000040",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8
  },
  input:{
    height: 40,
    borderRadius: SIZES.radius,
    backgroundColor: '#eee'
  },
  textArea: {
    borderRadius: SIZES.radius,
    backgroundColor: '#eee',
    height: 150,
    textAlignVertical:'top'
   
  },
  wapperHomePage:{
    flex:1,
    backgroundColor:COLORS.colorBG
  },
  spaceBTW_M: DIRS.rtl === "left"  ? {marginRight: SIZES.margin} :  {marginLeft: SIZES.margin},
  spaceBTW_P: DIRS.rtl === "left"  ? {paddingRight: SIZES.margin} :  {paddingLeft: SIZES.margin},
  spaceBTW_P_L: DIRS.rtl === "left"  ? {paddingLeft: SIZES.margin} :   {paddingRight: SIZES.margin},
  spaceBTW15: DIRS.rtl === "left"  ? {marginRight: SIZES.padding} :  {marginLeft: SIZES.padding}
});
