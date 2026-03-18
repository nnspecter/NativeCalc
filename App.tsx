import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';

type ButtonType = string;

export default function App() {
  const [calcState, setCalcState] = useState<string>("");
  const [history, setHistory] = useState<string[] | []>([]);

  const numbers = ["0", "1","2","3","4","5","6","7","8","9"]
  const operators = ["/", "x", "+", "-", "%"]
  const buttons: ButtonType[] = [
    "C","<","%", "/",
    "7","8","9", "x",
    "4","5","6", "-",
    "1","2","3", "+",
    "0", "=", ",",
  
  ];
  

  const handleButtonPress = (item: ButtonType) => {
    if(item == "C"){
      setCalcState("");
      return;
    }

    if(operators.includes(item)){    
      setCalcState(prev => numbers.includes(prev.at(-1) ?? "") ? 
        (item=="x" ? prev + "*": prev + item) :
          (item=="-" ? prev + item : prev));
      return
    }

      if(item == "<"){
      setCalcState(prev => prev.slice(0, -1));
      return
    }

    if(item == ","){
      setCalcState(prev => 
        !numbers.includes(prev.at(-1) ?? "") ? prev :
        prev.at(-1) !== "," ? prev + "," : prev 
      );
      return;
    }

    if (item === "=") {
      try {
        const result = eval(calcState);
        if(history.length >= 4){ 
          setHistory(prev=> prev.slice(1))
        }
        setHistory(prev => [...prev, calcState+"="+String(result)])
        setCalcState(String(result));
      } catch {
        setCalcState("");
      }
      return;
    }
    setCalcState(prev => prev + item )
  }


  
  return (
    <View style={styles.container}>
        <View style={styles.historyList}>
          {history.map((item, index)=> 
            <Text key={"history"+index} style={{textAlign: "right", fontSize: 20}}>{item}</Text>
          )}
        </View>
        
        <Text style={{textAlign: "center", height: 100, fontSize: 40}}>{calcState}</Text>
        <View style={styles.keyboard}>
          <FlatList
            numColumns={4}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-end", // прижимает кнопки к низу
              paddingHorizontal: 10,
              paddingBottom: 20, // отступ снизу
              
            }}
            data={buttons}
            renderItem={({item}) => 
              <Pressable 
                style={styles.button}
                onPress={() => handleButtonPress(item)}>
                  <Text>{item}</Text>
              </Pressable>}
          />
        </View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  historyList : {
    flex: 1,
    marginRight: 20,
    paddingTop: 40,
    overflow: "hidden",
    maxHeight: 300,
  },

  display: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
  },
  
  keyboard: {
    flex: 1,
    justifyContent: "flex-end",
  },

  
  button: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    alignItems: "center"
  },

  buttons: {
    flex: 1,
    flexDirection: "row"

  },
  
  buttonC: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    maxHeight: 40,
  },
  buttonText: {
    fontSize: 24
  }
});
