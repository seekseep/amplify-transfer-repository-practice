'use client'

import { Text, Button, Flex, View, useAuthenticator, useTheme } from "@aws-amplify/ui-react";

export default function UserMenu() {
  const theme = useTheme()
  const { username, user, signOut,  } = useAuthenticator()
  return (
    <View
      maxWidth={theme.breakpoints.values.large}
      marginInline="auto">
      <Flex direction="row" alignItems="center">
        <View grow={1}>
          <Text fontSize={theme.tokens.fontSizes.small}>{username}</Text>
          <Text fontSize={theme.tokens.fontSizes.xs}>{user.userId}</Text>
        </View>
        <View>
          <Button onClick={() => signOut()}>ログアウト</Button>
        </View>
      </Flex>
    </View>
  )
}
