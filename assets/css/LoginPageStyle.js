import { StyleSheet , Dimensions} from "react-native";

  const win = Dimensions.get('window');
  const { width, height } = Dimensions.get("window");
  const LoginPageStyle = StyleSheet.create({

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

    submitButton: {
      backgroundColor: '#AA4A44',
      padding: 12,
      margin: 15,
      height: 50,
      borderRadius: 15,
      alignItems:'center'
   },


   registerButton: {
    backgroundColor: '#7b1d92',
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


  versionNoText:{
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    alignSelf: "center"
  },

   orgTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    alignSelf: "center"
    },

    image: {
        display: 'flex',
        justifyContent: 'center',
        width: '95%',
        height: win.width/2,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop:'25%' 
    },


    splashimage: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
      height: win.width/2,
      resizeMode: "contain",
      alignSelf: "center",
      marginTop:'50%' 
  },


    forgotPswdLink: {
      display: 'flex',
      color: 'blue',
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginRight:'5%',
      fontWeight: '600',
      fontSize: 18,
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
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },

    spinnerTextStyle: {
      color: '#FFF'
    },

    backgroundVideo: {
      height: height,
      position: "absolute",
      top: 0,
      left: 0,
      alignItems: "center",
      bottom: 0,
      right: 0  
      
    },

    videoView: {
      justifyContent:'center', 
      alignItems: 'center', 
     },


  });



export { LoginPageStyle }