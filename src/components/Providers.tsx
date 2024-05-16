'use client'

import { Amplify } from "aws-amplify"
import { Authenticator, Heading, useTheme } from "@aws-amplify/ui-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"

import config from '@/aws-exports'

Amplify.configure(config)


const client = new QueryClient()

export default function Providers ({
  children
}: PropsWithChildren) {
  const theme = useTheme()
  return (
    <QueryClientProvider client={client}>
      <Authenticator
        components={{
          Header: () => (
            <Heading
              level={2}
              textAlign="center"
              paddingBlock={theme.tokens.space.medium}>
                移譲の検証
            </Heading>
          )
        }}>
        {children}
      </Authenticator>
    </QueryClientProvider>
  )
}
