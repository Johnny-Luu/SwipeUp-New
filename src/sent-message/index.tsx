import {Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SentIcon} from '../../App';
import {formatDate, formatTime} from '../received-message';
import styles from './styles';

const SentMessage = ({message, displayDate, displayTime}: any) => {
  const [isShowTime, setIsShowTime] = useState(displayTime);

  const getDisplayDateText = () => {
    const now = new Date();
    const inputDate = new Date(message.createdAt);

    if (inputDate.getDate() === now.getDate()) {
      return 'Today';
    } else if (inputDate.getDate() === now.getDate() - 1) {
      return 'Yesterday';
    } else {
      return formatDate(message.createdAt);
    }
  };

  const changeDisplayTime = () => {
    if (!displayTime) {
      setIsShowTime(!isShowTime);
    }
  };

  return (
    <>
      {displayDate && (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{getDisplayDateText()}</Text>
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.mainTextContainer}>
          <TouchableOpacity
            style={styles.messageContainer}
            onPress={changeDisplayTime}>
            <Text style={styles.messageText}>{message.message}</Text>
          </TouchableOpacity>
          {isShowTime && (
            <View style={styles.statusContainer}>
              <SentIcon />
              <Text style={styles.timeText}>
                {formatTime(message.createdAt)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default SentMessage;
