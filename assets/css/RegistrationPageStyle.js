import { StyleSheet , Dimensions} from "react-native";


  const win = Dimensions.get('window');
  const RegistrationPageStyle = StyleSheet.create({

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
      color:'#000'
    },

    inputTxtDissabled: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: '#fffccc',
      borderColor: '#ccc',
      color:'#000'
    },

    submitButton: {
      backgroundColor: '#AA4A44',
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
    color: '#7b1d92',
    fontSize: 24,
    fontWeight: '600',
    alignSelf: "center"
    },

    imageHeader: {
        display: 'flex',
        justifyContent: 'center',
        width: '45%',
        height: win.width/3,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: -30 
    },

    imageProduct: {
      display: 'flex',
      width: '100%',
      height: 150,
      resizeMode: "cover"
     
  },

    appContainer:{
        flex: 1,
        backgroundColor: '#d5dbdb'        
    },

    scrollViewContainer:{
        flex: 1,
        backgroundColor: '#d5dbdb' ,  
        marginTop: -30      
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
      fontWeight: '600',
    },

    generalText: {
      fontSize: 18,
      fontWeight: '600',
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

    horizontal: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: 10,
      marginTop: "50%" 
    }


  });



export { RegistrationPageStyle }