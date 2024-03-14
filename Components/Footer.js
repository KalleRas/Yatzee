import React from 'react'
import { Text, View } from 'react-native'
import styles from '../Style/styles'

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>
        Author: Kalle Rasvala
      </Text>
    </View>
  )
}
