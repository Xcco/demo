import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  TouchableHighlight,
  ListView,
  Image,
} from 'react-native';


function Cell(props) {
  return(
    <TouchableHighlight
        onPress={()=>props.onPress(props.num)}
        underlayColor="transparent"
        activeOpacity={0.8}>
        <View style={styles.cell}>
          <Text style={styles.textInside}>{props.num}</Text>
        </View>
      </TouchableHighlight>
  )
}
function Method(props) {
  return(
    <TouchableHighlight
      onPress={()=>props.onPress(props.method)}
      underlayColor="transparent"
      activeOpacity={0.8}>
      <View style={[styles.cell, styles.functionalButton]}>
        <Text style={[styles.textInside, styles.functionalText]}>{props.method}</Text>
      </View>
    </TouchableHighlight>
  )
}

class App extends React.Component {
  constructor(){
    super()
    this.state={
      count:'',
      method:'',
      frontNum:'',
      backNum:'',
    }
  }
  handlePress=(num)=>{
    this.state.method?this.setState({backNum:num}):this.setState({frontNum:num})
  }
  handleCalMethod=(m)=>{
    this.state.count
    ?this.setState({
      frontNum:this.state.count,
      backNum:'',
      count:'',
      method:m})
    :this.setState({method:m})
  }
  handleResult=()=>{
    if(this.state.method !== ''){
      switch (this.state.method) {
        case '+':
        console.log(parseFloat(this.state.frontNum))
        console.log(parseFloat(this.state.backNum))
        this.setState({count:parseFloat(this.state.frontNum)+parseFloat(this.state.backNum)})
        break
        case '-':
        this.setState({count:parseFloat(this.state.frontNum)-parseFloat(this.state.backNum)})
        break
        case '×':
        this.setState({count:parseFloat(this.state.frontNum)*parseFloat(this.state.backNum)})
        break
        case '÷':
        this.setState({count:parseFloat(this.state.frontNum)/parseFloat(this.state.backNum)})
        break
        default:
      }
    }
  }
  handleClear=()=>{
    this.setState({
      count:'',
      method:'',
      frontNum:'',
      backNum:'',
    })
  }
  render() {
    const {frontNum,method,backNum,count}=this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>计算器</Text>
        <Text style={styles.showing}>{frontNum}{method}{backNum}{count?'=':undefined}</Text>
        <Text style={styles.showing}>{count===Infinity?'em...输入有误':count}</Text>
        <View style={styles.board}>
          <View style={styles.rows}>
            <Cell onPress={this.handlePress} num={1}/>
            <Cell onPress={this.handlePress} num={2}/>
            <Cell onPress={this.handlePress} num={3}/>
            <Method onPress={this.handleCalMethod} method={'+'}/>
          </View>
          <View style={styles.rows}>
            <Cell onPress={this.handlePress} num={4}/>
            <Cell onPress={this.handlePress} num={5}/>
            <Cell onPress={this.handlePress} num={6}/>
            <Method onPress={this.handleCalMethod} method={'-'}/>
          </View>
          <View style={styles.rows}>
            <Cell onPress={this.handlePress} num={7}/>
            <Cell onPress={this.handlePress} num={8}/>
            <Cell onPress={this.handlePress} num={9}/>
            <Method onPress={this.handleCalMethod} method={'×'}/>
          </View>
          <View style={styles.rows}>
            <TouchableHighlight
              onPress={this.handleClear}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={[styles.cell, styles.functionalButton]}>
                <Text style={[styles.textInside, styles.functionalText]}>AC</Text>
              </View>
            </TouchableHighlight>

            <Cell onPress={this.handlePress} num={0}/>
            <TouchableHighlight
              onPress={this.handleResult}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={[styles.cell, styles.functionalButton]}>
                <Text style={[styles.textInside, styles.functionalText]}>=</Text>
              </View>
            </TouchableHighlight>
            <Method onPress={this.handleCalMethod} method={'÷'}/>
          </View>
        </View>
        
      </View>
    );
  }
}
export default App

const styles = StyleSheet.create({
  hi: {
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontFamily: 'PingFang HK',
    fontSize: 39,
    color: 'gray',
    marginBottom: 40,
  },
  board: {
    padding: 1,
    backgroundColor: "#000000",
    borderRadius: 5,
  },
  rows: {
    flexDirection: "row",
  },
  cell: {
    height: 80,
    width: 80,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showing: {
    height:30,
    marginTop: 30,
    fontSize: 20,
    fontFamily: "Chalkduster",
  },
  textInside: {
    fontFamily: 'Arial',
    fontSize: 30,
  },
  functionalButton: {
    backgroundColor: "#ef7b18",
  },
  functionalText: {
    color: "white",
  },
});
