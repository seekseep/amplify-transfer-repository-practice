'use client'

import { Button, Flex, View, useAuthenticator, useTheme } from "@aws-amplify/ui-react";

export default function UserMenu() {
  const theme = useTheme()
  const { username, user, signOut,  } = useAuthenticator()
  return (
    <View
      maxWidth={theme.breakpoints.values.large}
      marginInline="auto">
      <Flex direction="row" alignItems="center">
        <View grow={1}>
          {username}
          {user.userId}
        </View>
        <View>
          <Button onClick={() => signOut()}>ログアウト</Button>
        </View>
      </Flex>
    </View>
  )
}
