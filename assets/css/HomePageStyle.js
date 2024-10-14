import { StyleSheet , Dimensions} from "react-native";


  const win = Dimensions.get('window');
  const HomePageStyle = StyleSheet.create({

    inputTxt: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: '#ffffff',
      borderColor: '#ccc',
    },

    submitButton: {
      backgroundColor: '#AA4Aff',
      padding: 12,
      margin: 15,
      height: 50,
      borderRadius: 15,
      alignItems:'center'
   },

   submitButtonText:{
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
   },

   orgTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    alignSelf: "center"
    },

    imageHeader: {
        display: 'flex',
        justifyContent: 'center',
        width: win.width/1,
        height: win.width/2,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: -8 
    },

    imageHeaderAlt: {
      
      justifyContent: 'center',
      width: '100%',
      height: 50,
      resizeMode: "cover",
      alignSelf: "center",
      marginTop: 0 
  },

    imageProduct: {
      display: 'flex',
      width: '100%',
      height: 300,
      resizeMode: "contain"
     
  },

    appContainer:{
        flex: 1,
        backgroundColor: '#d5dbdb'        
    },

    container:{
        flex:1,
        alignItems: "center"
    },

    whiteText:{
        color: '#FFFFFF'
    },

    darkText:{
        color: '#000000'
    },

    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
   
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600'
    },

    sectionMessage: {
      fontSize: 24,
      fontWeight: '600',
      fontWeight: 'bold',
      color:'#000000'
    },

    productNameText: {
      fontSize: 18,
      fontWeight: '600',
    },

    sectionDescription: {
      marginTop: 8,
      fontSize: 14,
      fontWeight: 'bold',
      color:'#000000'
    },

    textLabelOR: {
      display: 'flex',
      color: 'blue',
      flexDirection: 'row',
      alignSelf: 'center',
    },

    sectionDescriptionLabel: {
      marginTop: 8,
      fontSize: 14,
      fontWeight: 'bold',
      color:'#000000'
    },
    
    highlight: {
      fontWeight: '700',
    },

    horizontal: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: 10,
      marginTop: "50%" 
    },

    spinnerTextStyle: {
      color: '#FFF'
    },


  });



export { HomePageStyle }