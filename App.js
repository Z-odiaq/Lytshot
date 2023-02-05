import {
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import React, { useState, Component, useEffect } from "react";

export default function App() {

  const link = "https://prnt.sc/";
  let [tail, setTail] = useState(link+"fv8sf0");
  let [settings, setsettings] = useState(false);
  let [manuel, setmanuel] = useState(false);
  let [histM, setHistM] = useState(false);
  let [history, sethistory] = useState([]);
  let [temp, setTemp] = useState("");

  function getRandom() {

    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    sethistory([...history, link + result]);
    return result;
  }
  useEffect( () => {
    setTail(link+getRandom())
  }, []);


  return (
    <View style={{
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Modal transparent={true} visible={manuel} onRequestClose={() => { setsettings(!settings);}}>
        <View style={{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }}>
          <TextInput
            style={{
              height: 50,
              margin: 18,
              padding:16,
              borderColor:"grey",
              borderRadius:15,
              borderWidth: 1,
            }}
            onChangeText={(val) => setTemp(val)}
            value={temp}
            maxLength={6}
            placeholder={"Must be " + 6 + " characters"}
          />
          <TouchableOpacity onPress={() => {temp !=""? setmanuel(!manuel)  : temp.length<6? setmanuel(!manuel)  : setTail(temp),setmanuel(!manuel)}}
           style = {{backgroundColor:"#00000099",padding:8, marginHorizontal:2, borderRadius:10, justifyContent:"center"}}>
            <Text style = {{color:"#fff"}}> Go </Text>
         </TouchableOpacity>
        </View>
      </Modal>
      <Modal transparent={true} visible={histM} onRequestClose={() => { setHistM(!histM);}}>
        <View style={{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }}>
          <ScrollView>
            {history.map((item, key) => (
              <Text selectable={true} key={key} style={{fontSize : 20, margin:5}} onPress={() => {setTail(item);setHistM(!histM);}} >
                {" "}
                {item}{" "}
              </Text>
            ))}
          </ScrollView>
          <View style={{ flexDirection: "row", bottom: 10 }}>

            <TouchableOpacity onPress={() => setHistM(!histM)} style = {{backgroundColor:"#00000099",padding:8, marginHorizontal:2, borderRadius:10, justifyContent:"center"}}>
            <Text style = {{color:"#fff"}}> Close </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => sethistory([])} style = {{backgroundColor:"#00000099",padding:8, marginHorizontal:2, borderRadius:10, justifyContent:"center"}}>
            <Text style = {{color:"#fff"}}> Clear </Text>
         </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ flex: 1, width: "100%" }}>
        <Text  style={{ alignSelf:"center" }}>Link: {tail}</Text>
        <WebView
          style={{ flex: 1, marginVertical: 10 }}
          source={{ uri: tail }}
        />
      </View>

      <View style={{ position: "absolute", flexDirection: "row", bottom: 10 }}>
      <TouchableOpacity onPress={() => setmanuel(!manuel)} style = {{backgroundColor:"#00000099",padding:8, marginHorizontal:2, borderRadius:10, justifyContent:"center"}}>
            <Text style = {{color:"#fff"}}>Manuel</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => {setTail(link+getRandom());}} style = {{backgroundColor:"#00000099",padding:8, marginHorizontal:2, borderRadius:10, justifyContent:"center"}}>
            <Text style = {{color:"#fff"}}>Generate</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => setHistM(!histM)} style = {{backgroundColor:"#00000099",paddingHorizontal:8, padding:2, borderRadius:10, justifyContent:"center"}}>
            <Text style = {{color:"#fff"}}>History</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => setTail(history[history.length-2])} style = {{backgroundColor:"#00000099",padding:8, marginHorizontal:2, borderRadius:10, justifyContent:"center"}}>
            <Text style = {{color:"#fff"}}>back</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

