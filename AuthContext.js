import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [appjwt, setAppJWT] = useState('');
    const [isLogin, setLogin] = useState(0);
    const [productName, setProductName] =  useState('');
    const [productCode, setProductCode] =  useState('');
    const [productImage, setProductImage] =  useState('');
    const [productSearchResult, setProductSearchResult] =  useState('');
    const [pageOffset, setPageOffSet] =  useState('');
    const [screenContentType, setScreenContent] = React.useState(-1);
    const [selectedTileSize, setSelectedTileSize] = React.useState("");
    const [selectedCategoryOne, setSelectedCategoryOne] = React.useState("");
    const [selectedProductType, setSelectedProductType] = React.useState("");
    const [selectedFinish, setSelectedFinish] = React.useState("");
    const [designNo, onChangeDesignNo] = React.useState("");
    const [orderListRefresh, setOrderListRefresh] = React.useState("");
    const [qtyreq, setQTYReq] = React.useState(0);
    const [scan, setQRCodeScan] = React.useState(false); 
    const [scanResult, setScanResult] = React.useState(false); 
    const [userAndroidID, setUserAndroidID] = React.useState("");

    return(
        <AuthContext.Provider value={{appjwt, setAppJWT, 
                                      isLogin, setLogin, 
                                      productName, setProductName, 
                                      productCode, setProductCode,  
                                      productImage, setProductImage,
                                      screenContentType, setScreenContent,
                                      selectedTileSize, setSelectedTileSize,
                                      selectedCategoryOne, setSelectedCategoryOne,
                                      selectedProductType, setSelectedProductType,
                                      selectedFinish, setSelectedFinish,
                                      designNo, onChangeDesignNo,
                                      orderListRefresh, setOrderListRefresh,
                                      qtyreq, setQTYReq,
                                      scan, setQRCodeScan,
                                      scanResult, setScanResult,
                                      userAndroidID, setUserAndroidID
                                      }}>
            {children}
        </AuthContext.Provider>

    );
}

