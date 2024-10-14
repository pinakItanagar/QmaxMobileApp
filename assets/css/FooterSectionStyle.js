import { StyleSheet , Dimensions} from "react-native";


  const win = Dimensions.get('window');
  const FooterSectionStyle = StyleSheet.create({

    
    footerContainer:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#005F97' ,
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        width : '100%', 
        height: 50      
    },

    iconContainer:{
        flexGrow: 4,
        marginTop: 10, 
        marginLeft: 5,
        alignItems: "center"
    }

   


  });



export { FooterSectionStyle }