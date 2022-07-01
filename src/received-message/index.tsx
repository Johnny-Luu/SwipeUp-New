import {Avatar, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BOT_NAME, CHATBOT_AVATAR} from '../bot-data';
import styles from './styles';

const ReceivedMessage = ({message, date, displayTime, displayAvatar}: any) => {
  const [isShowTime, setIsShowTime] = useState(displayTime);

  const getDisplayDateText = () => {
    const now = new Date();
    const inputDate = new Date(date);

    if (inputDate.getDate() === now.getDate()) {
      return 'Today';
    } else if (inputDate.getDate() === now.getDate() - 1) {
      return 'Yesterday';
    } else {
      return formatDate(date);
    }
  };

  const changeDisplayTime = () => {
    if (!displayTime) {
      setIsShowTime(!isShowTime);
    }
  };

  const getMessageTitle = () => {
    return BOT_NAME + formatTime(message.createdAt);
  };

  return (
    <>
      {date && (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{getDisplayDateText()}</Text>
        </View>
      )}

      <View style={styles.container}>
        <Avatar
          style={displayAvatar ? styles.avatar : [styles.avatar, {opacity: 0}]}
          size="medium"
          borderRadius={4}
          source={CHATBOT_AVATAR}
        />

        <View style={styles.mainContainer}>
          {isShowTime && (
            <Text style={styles.timeText}>{getMessageTitle()}</Text>
          )}
          <TouchableOpacity
            style={styles.messageContainer}
            onPress={changeDisplayTime}>
            <Text>{message.message}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ReceivedMessage;

export const formatTime = (time: number) => {
  const date = new Date(time);
  const originHour = date.getHours();
  const originMinute = date.getMinutes();

  const suffix = originHour >= 12 ? 'PM' : 'AM';
  const hours = originHour >= 12 ? originHour - 12 : originHour;
  const minutes = originMinute < 10 ? `0${originMinute}` : originMinute;

  const formattedTime = `${hours}:${minutes} ${suffix}`;
  return formattedTime;
};

export const formatDate = (time: number) => {
  const date = new Date(time);
  const originDay = date.getDate();
  const originMonth = date.getMonth() + 1;
  const originYear = date.getFullYear();

  const day = originDay < 10 ? `0${originDay}` : originDay;
  const month = originMonth < 10 ? `0${originMonth}` : originMonth;

  const formattedDate = `${day}/${month}/${originYear}`;
  return formattedDate;
};
