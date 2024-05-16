'use client'

import { UseMutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { createTodoMutation, deleteTodoMutation, listTodosQuery, updateTodoMutation } from "./services";

type MutationOptions<T extends (...args: any) => any> = UseMutationOptions<
  Awaited<ReturnType<T>>,
  Error,
  Parameters<T>[0]
>

export function useCreateTodoMutation (
  options?: MutationOptions<typeof createTodoMutation>
) {
  return  useMutation({
    mutationFn: createTodoMutation,
    ...options
  })
}

export function useListTodosQuery () {
  return useQuery({
    queryKey: ['todos'],
    async queryFn () {
      return await listTodosQuery()
    }
  })
}

export function useUpdateTodoMutation (
  options?: MutationOptions<typeof updateTodoMutation>
) {
  return  useMutation({
    mutationFn: updateTodoMutation,
    ...options
  })
}

export function useDeleteTodoMutation (
  options?: MutationOptions<typeof deleteTodoMutation>
) {
  return  useMutation({
    mutationFn: deleteTodoMutation,
    ...options
  })
}
