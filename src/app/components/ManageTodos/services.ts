'use client'

import { CreateTodoInput, UpdateTodoInput, DeleteTodoInput, ListTodosQuery, Todo } from "@/API";
import { GraphQLResult, generateClient } from 'aws-amplify/api'

import * as queries from '@/graphql/queries'
import * as mutations from '@/graphql/mutations'

export async function createTodoMutation (input: CreateTodoInput) {
  const client = generateClient();

  const result = await client.graphql({
    query: mutations.createTodo,
    variables: { input }
  });

  return result.data.createTodo;
}

export async function updateTodoMutation (input: UpdateTodoInput) {
  const client = generateClient();

  const result = await client.graphql({
    query: mutations.updateTodo,
    variables: { input }
  });

  return result.data.updateTodo;
}

export async function deleteTodoMutation (input: DeleteTodoInput) {
  const client = generateClient();

  const result = await client.graphql({
    query: mutations.deleteTodo,
    variables: { input }
  });

  return result.data.deleteTodo;
}

export async function listTodosQuery () {
  const client = generateClient();

  const todos: Todo[] = []
  let nextToken: string | null = null

  do {
    const result = await client.graphql({
      query: queries.listTodos,
      variables: {
        nextToken,
      },
    }) as GraphQLResult<ListTodosQuery>
    if (!result.data.listTodos?.items) throw new Error('No items')

    for (const todo of result.data.listTodos.items) {
      if (!todo) continue
      todos.push(todo)
    }
    nextToken = result.data.listTodos.nextToken ?? null
  } while (typeof nextToken === 'string')

  return todos.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
