import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {dialogflowConfig} from './dialogflow-config';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const chabotHandleSendMessage = () => {
    const message = 'Hello';

    Dialogflow_V2.requestQuery(
      message,
      result => {
        console.log(result);
        const text = result.queryResult.fulfillmentMessages[0].text.text[0];
        console.log(text);
        return text;
      },
      error => console.log(error),
    );
  };

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TouchableOpacity onPress={chabotHandleSendMessage}>
        <Text>Test hello</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
