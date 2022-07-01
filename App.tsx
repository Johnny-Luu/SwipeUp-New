import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Avatar,
  Button,
  Icon,
  IconElement,
  IconRegistry,
  Input,
  List,
  ListItem,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {
  BOT_ID,
  BOT_NAME,
  CHATBOT_AVATAR,
  initialChatbotMessages,
} from './src/bot-data';
import {dialogflowConfig} from './src/dialogflow-config';
import {Data, defaultRes} from './src/hard-data';
import {Message, MESSAGE_TYPE} from './src/interface';
import ReceivedMessage from './src/received-message';
import SentMessage from './src/sent-message';
import styles from './styles';
import {default as customTheme} from './themes/custom-theme.json';
import {customMapping} from './themes/mapping';

const USER_ID = '1';

const App = () => {
  const listRef = useRef<List>();
  const [inputMessage, setInputMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>(
    initialChatbotMessages,
  );

  const sendMessage = () => {
    const mes: Message = {
      id: 'xxx',
      senderId: USER_ID,
      message: inputMessage,
      image: '',
      type: MESSAGE_TYPE.MESSAGE,
      createdAt: new Date().getTime(),
    };
    setMessageList(pre => [...pre, mes]);

    // Dialogflow_V2.requestQuery(
    //   inputMessage,
    //   (result: any) => {
    //     const text = result.queryResult.fulfillmentMessages[0].text.text[0];
    //     console.log(text);

    //     const res: Message = {
    //       id: 'xxx',
    //       senderId: BOT_ID,
    //       message: text,
    //       image: '',
    //       type: MESSAGE_TYPE.MESSAGE,
    //       createdAt: new Date().getTime(),
    //     };
    //     setMessageList(pre => [...pre, res]);
    //   },
    //   error => console.log(error),
    // );

    for (const item of Data) {
      if (inputMessage.toLowerCase().includes(item.keyword)) {
        const res: Message = {
          id: 'xxx',
          senderId: BOT_ID,
          message: item.text,
          image: '',
          type: MESSAGE_TYPE.MESSAGE,
          createdAt: new Date().getTime(),
        };
        setMessageList(pre => [...pre, res]);
        setInputMessage('');
        return;
      }
    }

    const res: Message = {
      id: 'xxx',
      senderId: BOT_ID,
      message: defaultRes,
      image: '',
      type: MESSAGE_TYPE.MESSAGE,
      createdAt: new Date().getTime(),
    };
    setMessageList(pre => [...pre, res]);
    setInputMessage('');
  };

  const renderItem = ({item, index}: any) => {
    // Sent Message
    if (item.senderId !== BOT_ID) {
      if (
        index === 0 ||
        new Date(messageList[index].createdAt).getDay() !==
          new Date(messageList[index - 1].createdAt).getDay()
      ) {
        if (
          index !== messageList.length - 1 &&
          messageList[index].senderId === messageList[index + 1].senderId
        ) {
          return <SentMessage message={item} displayDate />;
        }
        return <SentMessage message={item} displayDate displayTime />;
      } else if (index === messageList.length - 1) {
        return <SentMessage message={item} displayTime />;
      } else {
        return <SentMessage message={item} />;
      }
    }
    // Received Message
    else {
      if (
        index === 0 ||
        new Date(messageList[index].createdAt).getDay() !==
          new Date(messageList[index - 1].createdAt).getDay()
      ) {
        return (
          <ReceivedMessage
            message={item}
            date={messageList[index].createdAt}
            displayTime
            displayAvatar
          />
        );
      } else if (
        messageList[index].senderId !== messageList[index - 1].senderId
      ) {
        return <ReceivedMessage message={item} displayTime displayAvatar />;
      } else {
        return <ReceivedMessage message={item} />;
      }
    }
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
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        customMapping={customMapping}
        theme={{...eva.light, ...customTheme}}>
        <View style={styles.backgroundStyle}>
          <View style={styles.topContainer}>
            <ListItem
              disabled
              style={{width: '100%'}}
              title={BOT_NAME}
              description={'Quickly reply to you'}
              accessoryLeft={<ChatBotAvatar size="large" />}
            />
          </View>

          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
              <List
                style={styles.messageContainer}
                contentContainerStyle={styles.messageContentContainer}
                showsVerticalScrollIndicator={false}
                ref={listRef}
                data={messageList}
                renderItem={renderItem}
                ListHeaderComponent={<View style={{height: 200}} />}
                onLayout={() => listRef.current?.scrollToEnd()}
                onContentSizeChange={() => listRef.current?.scrollToEnd()}
              />
              <View>
                <View style={styles.messageInputContainer}>
                  <Button
                    style={[styles.iconButton, styles.attachButton]}
                    accessoryLeft={PlusIcon}
                  />
                  <Input
                    style={styles.messageInput}
                    placeholder="Message..."
                    value={inputMessage}
                    accessoryRight={MicIcon}
                    onChangeText={setInputMessage}
                  />
                  <Button
                    appearance="ghost"
                    style={[styles.iconButton, styles.sendButton]}
                    accessoryLeft={PaperPlaneIcon}
                    onPress={sendMessage}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ApplicationProvider>
    </>
  );
};

export default App;

const botStyles = StyleSheet.create({
  avatar: {
    marginLeft: 6,
  },
});

interface Props {
  size: string;
}

export const ChatBotAvatar = ({size}: Props) => (
  <Avatar
    style={botStyles.avatar}
    size={size}
    shape="rounded"
    source={CHATBOT_AVATAR}
  />
);

export const PlusIcon = (style: any): IconElement => (
  <Icon {...style} name="plus" />
);

export const MicIcon = (style: any): IconElement => (
  <Icon {...style} name="mic" />
);

export const PaperPlaneIcon = (style: any): IconElement => (
  <Icon {...style} name="paper-plane" />
);

export const SentIcon = (style: any): IconElement => (
  <Icon
    {...style}
    style={{width: 15, height: 15}}
    name="done-all-outline"
    fill="#000"
  />
);
