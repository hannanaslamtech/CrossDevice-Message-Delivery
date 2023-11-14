import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import axios from 'axios'; // Import axios

const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('No Data');
  const [error, setError] = useState(null); // Define setError state

  const handleChange = text => {
    setMessage(text);
  };

  const handleButtonClick = () => {
    axios
      .post('http://192.168.0.105:3001/api/sentToWeb', {message})
      .then(function (response) {
        console.log('Success !!', response.data);
      })
      .catch(function (error) {
        console.log('Error !!', error.message);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://192.168.0.105:3001/api/getToApp',
        );
        setResponse(response.data);
        setError('');
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={handleChange}
        placeholder="Type your message here..."
        multiline
        numberOfLines={4}
        style={styles.messageInput}
      />
      <Button
        onPress={handleButtonClick}
        title="Send Message"
        color="#3498db"
      />
      <Text style={styles.messageDisplay}>
        Messages: <Text style={styles.msg}>{response}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  messageInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    textAlignVertical: 'top',
  },
  messageDisplay: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
  msg: {
    color: '#2ecc71',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
