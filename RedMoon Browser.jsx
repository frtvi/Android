import React, { useState } from 'react';
import { View, TextInput, Button, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';  // Certifique-se de que essa dependência esteja instalada

const dnsOptions = {
  'Google Public DNS': '8.8.8.8',
  'Cloudflare DNS': '1.1.1.1',
  'OpenDNS': '208.67.222.222',
  'Quad9 DNS': '9.9.9.9',
};

export default function SecureBrowser() {
  const [url, setUrl] = useState('https://google.com');
  const [inputUrl, setInputUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDns, setSelectedDns] = useState(dnsOptions['Google Public DNS']); // DNS obrigatório

  const handleNavigate = () => {
    const formattedUrl = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
    setUrl(formattedUrl);
  };

  const openDnsModal = () => setModalVisible(true); // Abre o modal
  const closeDnsModal = () => setModalVisible(false); // Fecha o modal

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TextInput
          style={styles.urlInput}
          placeholder="Enter URL"
          value={inputUrl}
          onChangeText={setInputUrl}
          onSubmitEditing={handleNavigate}
        />
        <Button title="Go" onPress={handleNavigate} />
      </View>
      <View style={styles.dnsSettings}>
        <Button title="Escolher DNS" onPress={openDnsModal} />
      </View>
      {/* Modal para escolher o DNS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeDnsModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Escolha o DNS</Text>
          <Picker
            selectedValue={selectedDns}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedDns(itemValue)}
          >
            {Object.keys(dnsOptions).map((key) => (
              <Picker.Item label={key} value={dnsOptions[key]} key={key} />
            ))}
          </Picker>
          <TouchableOpacity onPress={closeDnsModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* WebView */}
      <WebView
        source={{ uri: url }}
        // Você pode implementar configurações de proxy aqui para usar o DNS selecionado
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  navBar: {
    flexDirection: 'row',
    padding: 10,
  },
  urlInput: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
  },
  dnsSettings: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  picker: {
    height: 150,  // Ajuste a altura do Picker para garantir que ele tenha espaço suficiente
    width: 300,   // Ajuste a largura conforme necessário
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginTop: 40,  // Aumentei um pouco a margem superior para descer o botão
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
