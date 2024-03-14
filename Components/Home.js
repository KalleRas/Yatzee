import { useState } from "react"
import { Pressable, TextInput, Text, Keyboard, View } from "react-native";
import materialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header.js'
import Footer from './Footer.js'
import styles from '../Style/styles.js'
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT
} from '../Constants/Game.js';


export default Home = ({ navigation }) => {
    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);
    const handlePlayerName  = (value) => {
        if (value.trim().lenght > 0){
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }


    return(
        <>
        <header />
        <view>
            <materialCommunityIcons
            name="information"
            size={90}
            color="grey"
            />
            
            {!hasPlayerName ?
            <>
            <text>For scoreboard enter your name...</text>
            <TextInput onChange={setPlayerName} autoFocus={true} />
            <Pressable>
            onPress={() => handlePlayerName(playerName)}
            <text>OK</text>
            </Pressable>
            </>
            :
            <>
            <Text>Rules of the game</Text>
            <text multiline="True">
                Rules
            </text>
            <text multiline="True">The game consists of a number of rounds. In each round, a player gets three rolls of the dice, although they can choose to end their turn after one or two rolls. After the first roll the player can save any dice they want and re-roll the other dice. This procedure is repeated after the second roll. The player has complete choice as to which dice to roll. It is possible to re-roll both dice that were or were not rolled before</text>
            <text>Good luck{playerName}</text>
            <Pressable>
                onPress={() => navigation.navigate('Gameboard', {player: playerName})}
                <text>PLAY</text>
            </Pressable>
            </>
            }
        </view>
        <Footer/>
        </>
    )
}