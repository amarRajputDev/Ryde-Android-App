import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import React ,{ useEffect, useState } from 'react';
import {View, Button, Alert} from 'react-native';
import CustomButton from './CustomButton';

export default function Payment() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false)


  const confirmHandler = async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
    // Make a request to your own server.
    const response = await fetch(`${API_URL}/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    }});
    // Call the `intentCreationCallback` with your server response's client secret or error
    const { client_secret, error } = await response.json();
    if (client_secret) {
      intentCreationCallback({clientSecret: client_secret});
    } else {
      intentCreationCallback({error});
    }
  }


  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: 'USD',
        },
        confirmHandler: confirmHandler
      }
    });
    if (error) {
      // handle error
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);






  const didTapCheckoutButton = async () => {
    // implement later
  }

  const openPaymentSheet= async() =>{

    await  initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
     setSuccess(true)
    }
  }
  return (
    <>
      <CustomButton
        title='Confirm Ride'
        Bstyles={{height :50  , width : 300 , marginTop : 20, borderRadius : 50, marginBottom : 20 , marginHorizontal : "auto"  } } 
        Tstyles={{color: 'white', fontFamily: 'Jakarta-Bold', fontWeight: 'bold'}}
        onPress={openPaymentSheet}
      />
    </>
  );
}