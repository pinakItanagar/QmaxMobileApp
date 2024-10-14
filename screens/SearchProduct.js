import React, { useEffect, useState, useContext } from 'react';
import { HomePageStyle } from "../assets/css/HomePageStyle"
import Spacer  from "../assets/css/Spacer";
import { Card, ListItem,  Icon } from 'react-native-elements'
import Imageloader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Footer from '../screens/Footer'
import { RegistrationPageStyle } from "../assets/css/RegistrationPageStyle"
import { SelectList } from 'react-native-dropdown-select-list'
import { AuthContext } from '../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { ConfigData } from '../myconfig.json';


import {
    SafeAreaView,
    ScrollView,
    FlatList,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid
  } from 'react-native';

  

 

  


  const SearchProduct = ({navigation}) => {

   const [apiResponse, setAPIResponse] = React.useState(-1); 
   const { appjwt, 
           setAppJWT, 
           setLogin, 
           setProductName,
           setProductCode,
           setProductImage,
           screenContentType,
           setScreenContent,
           selectedTileSize,
           setSelectedTileSize,
           selectedCategoryOne,
           setSelectedCategoryOne,
           selectedProductType,
           setSelectedProductType,
           selectedFinish,
           setSelectedFinish,
           designNo,
           onChangeDesignNo,
           qtyreq,
           setQTYReq
           } = useContext(AuthContext); 
 
          

 
  
  
   const [isSearching, setSearching] = React.useState(false);
  
   const dataTileSize = [
    {key:'0', value:'' },
    {key:'1', value:'8X12' },
    {key:'2', value:'8X40'},
    {key:'3', value:'8X48'},
    {key:'4', value:'10X15'},
    {key:'5', value:'10X18'},
    {key:'6', value:'10X20'},
    {key:'7', value:'12X12'},
    {key:'8', value:'12X18'},
    {key:'9', value:'12X24'},
    {key:'10', value:'12X48'},
    {key:'11', value:'16X16'},
    {key:'12', value:'24X24'},
    {key:'13', value:'24X48'},
    {key:'14', value:'32X64'},
    {key:'15', value:'32X96'},
    
   ];


  


   const dataCategoryOne = [
    {key:'0', value:'' },
    {key:'1', value:'FLOOR TILES' },
    {key:'2', value:'WALL TILES'}
   ];



   const dataProductType = [

        {key:'0', value:'' },
        {key:'1', value:'ALL WALL' },
        {key:'2', value:'BATHROOM TILES'},
        {key:'3', value:'CERAMIC FLOOR'},
        {key:'4', value:'DOUBLE CHARGE'},
        {key:'5', value:'ELEVATION TILES'},
        {key:'6', value:'FULL BODY'},
        {key:'7', value:'KITCHEN TILES'},
        {key:'8', value:'NANO'},
        {key:'9', value:'PARKING OUTDOOR'},
        {key:'10', value:'PGVT'},
        {key:'11', value:'PORCELIAN'}
    
   ];



   const dataFinish = [
    {key:'0', value:'' },
    {key:'1', value:'GLOSSY' },
    {key:'2', value:'MATT'},
    {key:'3', value:'CARVING'},
    {key:'4', value:'RUSTIC MATT'},
    {key:'5', value:'HIGHGLOSS'},
    {key:'6', value:'SUGAR'},
    {key:'7', value:'ROTO SUGAR'}
   ];


   const checkTextInput = () => {
    
      if ((selectedTileSize.length < 2) && (selectedCategoryOne.length < 2) && (selectedProductType.length < 2) && (selectedFinish.length < 2) && (designNo.length < 2)) {
        ToastAndroid.show('Atleast one search criteria required ', ToastAndroid.LONG);
        return false;
      } else {
        return true;
      }
    
   };




  
   let apiUrl = "";
   if(ConfigData.envType === 0) {
      apiUrl = ConfigData.devBaseURL + 'getSearchProductListForDealer.php';
   } else {
      apiUrl = ConfigData.prodBaseURL + 'getSearchProductListForDealer.php';
   }

    const [products, setData] = React.useState([]);
    const [isMoreLoading, setMoreLoading] = React.useState(false);
    const [pageOffset, setPageOffset] = React.useState(0);
   
    
    const searhNow = async () => {
       setSearching(true);
        if(checkTextInput()) {   
           console.log(selectedFinish);
           let regex = /^C\d{3,6}/;
           let found = designNo.match(regex); 
           let part_no = "";
           if(found != null) {
             part_no = designNo;
             console.log("Part No " + part_no);
           }
           
            try {
                const response = await fetch(apiUrl,  {
                    method: 'POST',
                    headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    jwt: appjwt,
                    tileSize: selectedTileSize,
                    categoryType: selectedCategoryOne,
                    finishType: selectedFinish,
                    designNo: designNo,
                    productType: selectedProductType,
                    part_no: part_no,
                    pageOffset: pageOffset,
                    qtyreq: qtyreq
                    })   
                });
                const json = await response.json();
                console.log("SEARCH RESULT " + json.product_list);
                setAPIResponse(json.apiResponse);
                setData(json.product_list);
                setScreenContent(json.apiResponse);
                setSearching(false);
                onChangeDesignNo("");

                if(json.apiResponse === 1) {
                    setScreenContent(1);
                } else if(json.apiResponse === 2) {
                    ToastAndroid.show('Requested item not found !', ToastAndroid.LONG);
                    setScreenContent(0);
                } else if(json.apiResponse === 0) {
                    setLogin(0);
                }


            } catch (error) {
                setSearching(false);
                console.error(error);
            } finally {
                setSearching(false);
              
            }

           
        } else {
            setScreenContent(0);
            setSearching(false); 
        }    
    };
    
   
  



    const placeOrder = (design_number, product_name, product_image) => {
        setProductCode(design_number);
        setProductName(product_name);
        setProductImage(product_image);
        setScreenContent(-1);
        navigation.navigate('Procurement'); 
    };


    const fetchMoreList = async (pageOffset) => {
        setMoreLoading(true);
           let regex = /^C\d{3,6}/;
           let found = designNo.match(regex); 
           let part_no = "";
           if(found != null) {
             part_no = designNo;
             console.log("Part No " + part_no);
           }

        try {
          const response = await fetch(apiUrl,  {
              method: 'POST',
              headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json'
              } ,
              body: JSON.stringify({
                jwt: appjwt,
                pageOffset: pageOffset,
                tileSize: selectedTileSize,
                categoryType: selectedCategoryOne,
                finishType: selectedFinish,
                designNo: designNo,
                part_no: part_no,
                productType: selectedProductType,
                qtyreq: parseInt(qtyreq)
              }) 
            });
          const json = await response.json();
          
          if(json.apiResponse === 0) {
            setAppJWT('');
            setLogin(0);
            setMoreLoading(false);
          } else if (json.apiResponse === 2) {  
            setMoreLoading(false);
            ToastAndroid.show("No more matching products available", ToastAndroid.LONG);
          } else {
            
            
                var finalObj = products.concat(json.product_list);
                setMoreLoading(false);
                setData(finalObj);
                
                setAPIResponse(json.apiResponse);
                setPageOffset(json.pageOffset);
            
        
          }
         
        } catch (error) {
          setMoreLoading(false);
          console.error(error);
        } finally {
          setMoreLoading(false);
        }
      }; 

      const loadMoreData = () => {
        // ToastAndroid.show("Loading more !", ToastAndroid.LONG);
        /*
        if(products.length < 20) {
            ToastAndroid.show("No more matching products available", ToastAndroid.LONG);
        } else {
          fetchMoreList(pageOffset);
        }*/
      } 
   
  
      if((screenContentType === -1 ) || (screenContentType === 0 )) {

    
        
         return(

            <SafeAreaView style={RegistrationPageStyle.appContainer}>
                            <Image source={require('../assets/images/qmax.png')} style={RegistrationPageStyle.imageHeader} /> 
                                
                            <ScrollView  contentInsetAdjustmentBehavior="automatic"    style={RegistrationPageStyle.scrollViewContainer}>
                                        
                                <Text style = {RegistrationPageStyle.orgTitle}>QMAX PRODUCT SEARCH</Text>         
                    
                                <View style={{ width:'98%', padding: 5, margin: 5, flexDirection: 'column'}}>
                                        <SelectList 
                                                setSelected={(val) => setSelectedTileSize(val)} 
                                                data={dataTileSize} 
                                                save="value"
                                                placeholder="Tiles Sizes in (Inch)"
                                                placeholderTextColor="#000" 
                                        />
                                </View> 

                                <View style={{ width:'98%', padding: 5, margin: 5, flexDirection: 'column'}}>
                                        <SelectList 
                                                setSelected={(val) => setSelectedCategoryOne(val)} 
                                                data={dataCategoryOne} 
                                                save="value"
                                                placeholder="Tiles Category"
                                                placeholderTextColor="#000" 
                                        />
                                </View> 


                                <View style={{ width:'98%', padding: 5, margin: 5, flexDirection: 'column'}}>
                                        <SelectList 
                                                setSelected={(val) => setSelectedProductType(val)} 
                                                data={dataProductType} 
                                                save="value"
                                                placeholder="Product Type"
                                                placeholderTextColor="#000" 
                                        />
                                </View> 

                                <View style={{ width:'98%', padding: 5, margin: 5, flexDirection: 'column'}}>
                                        <SelectList 
                                                setSelected={(val) => setSelectedFinish(val)} 
                                                data={dataFinish} 
                                                save="value"
                                                placeholder="Finish Type"
                                                placeholderTextColor="#000" 
                                        />
                                </View>

                                            <TextInput
                                            style={RegistrationPageStyle.inputTxt}
                                            onChangeText={(text) => setQTYReq(text)}
                                            placeholder="Quantity required"
                                            autoCorrect={false}
                                            value={qtyreq}
                                            keyboardType="numeric"
                                            maxLength={4}
                                            placeholderTextColor="#000" 
                                        />
                                

                                           <TextInput
                                            style={RegistrationPageStyle.inputTxt}
                                            onChangeText={(text) => onChangeDesignNo(text)}
                                            placeholder="Design No/Name/Part No"
                                            autoCorrect={false}
                                            value={designNo}
                                            placeholderTextColor="#000" 
                                        />
                                

                              
                                            
                                <TouchableOpacity 
                                            style = {RegistrationPageStyle.submitButton} 
                                            onPress = {() => searhNow()  }
                                            >
                                            <Text style = {RegistrationPageStyle.submitButtonText}> Search Now </Text>
                                </TouchableOpacity>  

                                <Spacer size={80} />

                                      <Spinner
                                        visible={isSearching}
                                        textContent={'Searching the product'}
                                        textStyle={RegistrationPageStyle.spinnerTextStyle}
                                        />        
                                            
                                 
                            
                            </ScrollView>

                           <Spacer size={80} />  
                           {/* <Footer navigation = { navigation } ></Footer> */}
                            
                        </SafeAreaView>

         )
      }  else if(screenContentType === 1 ) {
        
         return (
           
            <SafeAreaView style={HomePageStyle.appContainer}>
             {/*<Image source={require('../assets/images/qmax_banner_v2.png')} style={HomePageStyle.imageHeaderAlt} /> */}

            
         
                <FlatList
                  
                    data = { products }
                    onEndReached={loadMoreData}
                    onEndReachedThreshold ={0.1}
                    renderItem = { ({item}) => (
                        <>
                            <Card>
                            {/*<Card.Title> <Text style={HomePageStyle.productNameText}>{item.product_name}</Text></Card.Title>*/}
                            <Card.Divider/>
                        
                            <View  >
                                
                                    
                                    <Imageloader
                                        style={HomePageStyle.imageProduct}
                                        indicator={ProgressBar}
                                        resizeMode="center"
                                        source={{uri: item.productImage}}
                                    />
                                    <Text style = {HomePageStyle.sectionDescription}>Part No : {item.part_no}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Series : {item.series_type}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Design No./Name : {item.design_no_name}</Text> 
                                    <Text style = {HomePageStyle.sectionDescription}>Size : {item.product_size} mm</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Size in Inch : {item.product_size_inches} "</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Packing per box  : {item.item_per_box}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Sq.ft per box  : {item.sqr_ft_per_box}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Finish Type : {item.finish}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Category : {item.primary_category}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Product Type : {item.secondary_category}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Godown No.1  : {item.godown_1}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Godown No.2  : {item.godown_2}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>Already Booked  : {item.stock_booked}</Text>
                                    <Text style = {HomePageStyle.sectionDescription}>In-Transit  : {item.in_transit}</Text>
                                    <TouchableOpacity
                                        style = {HomePageStyle.submitButton}
                                        onPress = {() => placeOrder(item.part_no, item.product_name, item.productImage) }
                                        >
                                        <Text style = {HomePageStyle.submitButtonText}> Place Order Now </Text>
                                    </TouchableOpacity>
                            </View>  
                        
                            </Card>

                            <Spacer size={40} />
   
                        </> 
                )}
                />  
            
              

                 <Spinner
                            visible={isMoreLoading}
                            textContent={'Loading more product'}
                            textStyle={HomePageStyle.spinnerTextStyle}
                    /> 


               
              <Footer navigation = { navigation } ></Footer>



            </SafeAreaView> 

         )
        

      }
       

      
   
  }

 
  export default SearchProduct;