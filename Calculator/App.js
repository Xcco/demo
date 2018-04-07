import React from 'react';
import { Font } from 'expo';
import Dimensions from 'Dimensions'
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
        underlayColor="#48586d"
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
      <View style={[styles.setRadius,props.method === '=' && styles.equal]}>
        <Text style={[styles.textInside, styles.functionalText,props.custom]}>{props.method}</Text>
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
  async componentDidMount() {
    await Font.loadAsync({
      customFont : require('./assets/OMNES-LI.ttf'),
    });
    this.setState({ fontLoaded: true })
  }
  handlePress=(num)=>{
    if(this.state.count){
      this.setState({
        count:'',
        method:'',
        frontNum:'',
        backNum:'',
      },()=>{
        this.state.method?this.setState({backNum:this.state.backNum+num.toString()}):this.setState({frontNum:this.state.frontNum+num.toString()})
      })
    }else{
      this.state.method?this.setState({backNum:this.state.backNum+num.toString()}):this.setState({frontNum:this.state.frontNum+num.toString()})
    }
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
  handlePoint=()=>{
    if(this.state.count){
      return
    }
    if(this.state.method){
      if(this.state.backNum){
        this.setState({
          backNum:this.state.backNum+'.'
        })
      }else{
        this.setState({
          backNum:'0.'
        })
      }
    }else{
      if(this.state.frontNum){
        this.setState({
          frontNum:this.state.frontNum+'.'
        })
      }else{
        this.setState({
          frontNum:'0.'
        })
      }
    }
  }
  render() {
    const {frontNum,method,backNum,count,fontLoaded}=this.state
    if(this.state.fontLoaded){
      return (
      <View style={styles.container}>
        {frontNum && 
        <View style={styles.showTab}>
          <Text style={styles.showing}>{frontNum}{method}{backNum}{count?'=':undefined}</Text>
        </View>}
        <View style={styles.result}>
          <Text style={styles.resultText}>{count===Infinity?'em...输入有误':count}</Text>
        </View>
        <View style={styles.board}>
          <View style={styles.rows}>
          <View style={styles.innerRow}>
            <Method onPress={this.handleCalMethod} method={'+'} custom={{marginLeft:10}}/>
            <Method onPress={this.handleCalMethod} method={'-'} custom={{fontSize:60,marginLeft:-5,marginTop:-2}}/>
            <Method onPress={this.handleResult} method={'='} custom={{color:'#1c2938'}}/>
            <Method onPress={this.handleCalMethod} method={'×'}/>
            <Method onPress={this.handleCalMethod} method={'÷'} custom={{fontSize:45,marginTop:-3,marginRight:10}}/>
            </View>
          </View>
          <View style={styles.rows}>
            <Cell onPress={this.handlePress} num={1}/>
            <Cell onPress={this.handlePress} num={2}/>
            <Cell onPress={this.handlePress} num={3}/>
            
          </View>
          <View style={styles.rows}>
            <Cell onPress={this.handlePress} num={4}/>
            <Cell onPress={this.handlePress} num={5}/>
            <Cell onPress={this.handlePress} num={6}/>
          </View>
          <View style={styles.rows}>
            <Cell onPress={this.handlePress} num={7}/>
            <Cell onPress={this.handlePress} num={8}/>
            <Cell onPress={this.handlePress} num={9}/>
          </View>
          <View style={styles.rows}>
            <Cell onPress={this.handlePress} num={0}/>
            <Cell onPress={this.handlePoint} num={'.'}/>
            <Cell onPress={this.handleClear} num={'C'}/>
          </View>
        </View>
      </View>
    )}else{return <View/>}
  }
}
export default App

const deviceWidth = Dimensions.get('window').width
const cellWidth = deviceWidth/3
const cellHeight = Dimensions.get('window').height*0.7/5
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#f1ca69',
    borderWidth:3,
  },
  title: {
    fontFamily: 'PingFang HK',
    fontSize: 39,
    color: 'gray',
    marginBottom: 40,
  },
  board: {
    padding: 1,
    backgroundColor: "#1c2938",
  },
  rows: {
    flexDirection: "row",
  },
  innerRow:{
    flex:1,
    flexDirection: "row",
    backgroundColor:'#48586d',
    borderRadius:100,
    marginTop:10,
    marginBottom:40,
    marginHorizontal:15,
    justifyContent:'space-between'
  },
  cell: {
    height: cellHeight,
    width: cellWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showTab:{
    flex:0,
    alignSelf:'center',
    backgroundColor:'#e3bf64',
    width:deviceWidth-160,
    height:30,
    marginTop:30,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
  },
  showing: {
    flex:1,
    fontSize: 24,
    color:'#fff',
    fontFamily: "Chalkduster",
  },
  result: {
    alignSelf:'stretch',
    alignItems:'center',
  },
  resultText: {
    // borderWidth:3,
    color:'#1c2938',
    fontSize: 80,
    fontFamily: "customFont",
  },
  setRadius: {
    borderRadius:100,
    // backgroundColor:'#f1ca69',
  },
  equal: {
    backgroundColor:'#f1ca69',
  },
  textInside: {
    fontFamily: 'customFont',
    fontSize: 70,
    color:'#959ead',
    // opacity:0.8,
  },
  functionalText: {
    height:60,
    width:60,
    lineHeight:60,
    fontSize: 50,
    textAlign:'center',
    color: "white",
    fontFamily: 'customFont',
    // textAlignVertical:'center',
  },
});
