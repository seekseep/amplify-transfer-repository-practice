'use client'

import { CreateTodoInput } from "@/API";
import {
  Alert,
  Button,
  Card,
  Divider,
  Flex,
  TextField,
  View,
  useTheme,
  Text,
  Accordion,
  TextAreaField
} from "@aws-amplify/ui-react";

import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useListTodosQuery,
  useUpdateTodoMutation
} from "./hooks";
import { FormProvider, useForm } from "react-hook-form";

export default function ManageTodos() {
  const theme = useTheme();

  const createMethods = useForm<CreateTodoInput>({

  })
  const listQuery = useListTodosQuery()
  const createMutation = useCreateTodoMutation({
    onSuccess: () => {
      listQuery.refetch()
      createMethods.reset()
    }
  })
  const deleteMutation = useDeleteTodoMutation({
    onSuccess: () => {
      listQuery.refetch()
    }
  })

  return (
    <View
      maxWidth={theme.breakpoints.values.large}
      marginInline="auto"
      paddingBlock={theme.tokens.space.medium}>
      <Card variation="outlined">
        <Flex direction="column" gap={theme.tokens.space.medium}>
          <View marginBlockEnd={theme.tokens.space.medium}>
            <FormProvider {...createMethods}>
              <form onSubmit={createMethods.handleSubmit(values=> createMutation.mutate(values))}>
                <Flex direction="row" alignItems="end">
                  <Flex grow={1} direction="column" gap={theme.tokens.space.xs}>
                    <TextField label="名称" labelHidden {...createMethods.register('name', {
                      required: '必須項目です'
                    })} />
                    <Accordion.Container>
                      <Accordion.Item value="Accordion-item" border="0">
                        <Accordion.Trigger padding={theme.tokens.space.xxs}>
                          <Text fontSize={theme.tokens.fontSizes.small}>詳細</Text>
                          <Accordion.Icon />
                        </Accordion.Trigger>
                        <Accordion.Content padding="0">
                          <Flex
                            direction="column"
                            paddingBlockStart={theme.tokens.space.small}
                            paddingBlockEnd="0">
                            <TextAreaField
                              label="詳細" labelHidden
                              placeholder="詳細"
                              {...createMethods.register('description')} />
                          </Flex>
                        </Accordion.Content>
                      </Accordion.Item>
                    </Accordion.Container>
                  </Flex>
                  <View shrink={0}>
                    <Button type="submit" disabled={createMutation.isPending}>
                      {createMutation.isPending ? (
                        "追加中"
                      ) : (
                        "追加する"
                      )}
                    </Button>
                  </View>
                </Flex>
              </form>
            </FormProvider>
          </View>
          <Divider />
          <View>
            {listQuery.isError && (
              <Alert variation="error" heading="読み込みに失敗しました">{listQuery.error.message}</Alert>
            )}
            {listQuery.isLoading && (
              <Alert variation="info" heading="読込中"/>
            )}
            {listQuery.isSuccess && (
              <>
                {listQuery.data.length === 0 && (
                  <Alert variation="info" heading="内容がありません"/>
                )}
                {listQuery.data.length > 0 && (
                  listQuery.data.map(todo => (
                    <View key={todo.id}>
                      <Flex
                        direction="row"
                        alignItems="flex-start"
                        gap={theme.tokens.space.medium}
                        paddingBlock={theme.tokens.space.xxs}>
                        <Flex direction="column" grow="1" gap={theme.tokens.space.xxs}>
                          <Text fontSize={theme.tokens.fontSizes.large}>{todo.name}</Text>
                          {todo.description && <Text>{todo.description}</Text>}
                          <Text
                            variation="tertiary"
                            fontSize={theme.tokens.fontSizes.xs}>
                            {new Date(todo.createdAt).toLocaleDateString()} {new Date(todo.createdAt).toLocaleTimeString()}
                          </Text>
                        </Flex>
                        <Flex shrink="0">
                          <Button
                            size="small"
                            onClick={() => deleteMutation.mutate({ id: todo.id })}>
                              削除
                          </Button>
                        </Flex>
                      </Flex>
                      <Divider />
                    </View>
                  ))
                )}
              </>
            )}
          </View>
        </Flex>
      </Card>
    </View>
  );
}
