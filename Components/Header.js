import React from 'react'
import { Text, View, } from 'react-native'
import styles from '../Style/styles'

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        Yahtzee
      </Text>
    </View>
  )
}