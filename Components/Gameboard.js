import { useEffect, useState } from "react";
import {Text, View, Pressable} from "react-native";
import Header from "./Header.js";
import Footer from "./Footer.js";
import styles from '../Style/styles';
import {Container, Row, Col} from "react-native-flex-grid";
import MaterialCommunityIcons from '@expo/vector-icons';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMIT
  } from '../Constants/Game.js';

let board =[];

export default Gameboard = ({navigation, route}) => {

const [playerName, setPlayerName] = useState('');
const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
const [status, setStatus] = useState('Throw dices'); 
const [gameEndStatus, setGameEndStatus] = useState(false);
//Are dices selected or not?
const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
//dice spots (1, 2, 3, 4, 5, 6) for each dice
const [diceSpots, useDiceSpots] = useState(new Array(NBR_OF_DICESs).fill(0));
const [selectedDicePoints, setSelectedDicePoints]= useState(new Array(MAX_SPOT).fill(false));
const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

useEffect(() => {
    if (playerName === '' && route.params?.player) {
        setPlayerName(route.params.player);
    }
}, [])


const row = [];
for (let dice = 0; dice < NBR_OF_DICES; dice++) {
  row.push(
    <col key={"row" + dice}
    >
    <Pressable 
        key={"row" + dice}
        onPress={() => selectDice(i)}
        >
      <MaterialCommunityIcons>
        //name={board[dice]}
        name={"dice-1"}
        key={"row" + dice}
        size={50} 
        color={getDiceColor(dice)}
        
      </MaterialCommunityIcons>
    </Pressable>
    </col>
  );
}

const pointsRow = [];
for  (let spot = 0; spot < MAX_SPOT; spot++){
    pointsRow.push(
        <Col key={"pointsRow" + spot}>
        <text key={"pointsRow" + spot}>{getSpotTotal(spot)}</text>
        </Col>
    );
}

const pointsToSelectRow = [];
for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
    <Col key={"buttonsRow" + diceButton}>
    <Pressable key={"buttonsRow" + diceButton}>
        onPress={()=> selectDicePoints(diceButton)}

        <MaterialCommunityIcons key={"buttonsRow" + diceButton}
        name={"numeric-" + (diceButton + 1) + "-circle"}
        size={35}
        color={getDicePointsColor(diceButton)}
        >
        </MaterialCommunityIcons>
    </Pressable>
    </Col>
    );
}

const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

function getDiceColor(i) {
    return selectedDices [i] ? "black" : "steelblue"
}

function getDicePointsColor(i) {
    return selectedDicePoints[i] ? "black" : "steelblue"
}

const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
    let selected = [...selectedDices]
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal];
    if (!selectedPoints[i]){
    selectedPoints[i] = true;
    let nbrOfDices = 
        diceSpots.reduce
        ((total, x) => (x === (i + 1) ? total + 1 : total), 0);
    points[i] = nbrOfDices * (i + 1);
    setDicePointsTotal(points);
    setSelectedDicePoints(selectedPoints)
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    return points[i];
    }
    else{
        setStatus('You already selected points for' + (i+1));
    }
}
    else {
        setStatus("Throw" + NBR_OF_THROWS + "times before setting points.")
    }
}

const dicesRow = [];



    const throwDices = () => {
        let spots = [...dicespots];
        for (let i = 0; i < NBR_OF_DICES; i++) {
          if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
            spots[i] = randomNumber;
            board[i] = 'dice-' + randomNumber;
          }
        }
        setDiceSpots(spots);
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
      }

function getSpotTotal(i) {
    return dicePointsTotal[i];
}


    return(
        <>
        <Header />
        <view>
            <Text>Gameboard will be here...</Text>
            <Container fluid>
                <Row>{dicesRow}</Row>
            </Container>
            <text>Throws left : {nbrOfThrowsLeft}</text>
            <Pressable>
            onPress={() => throwDices}
            <text>THROW DICES</text>
            </Pressable>
            <Container>
                <Row>{pointsRow}</Row>
            </Container>
            <Container>
                <Row>{pointsToSelectRow}</Row>
            </Container>
            <Text>Player: {playerName} </Text>
        </view>
        <Footer />
        </>
    )
}