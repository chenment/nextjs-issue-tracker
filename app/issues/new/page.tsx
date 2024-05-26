'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller, set } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueShema } from '@/app/validationSchemas'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

type IssueForm = z.infer<typeof createIssueShema>

const newIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueShema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(async (data) => {
        try {
          setSubmitting(true)
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch (error) {
          console.log(error)
          setError('An unexpected error occurred.')
        } finally {
          setSubmitting(false)
        }
      })}>
        <TextField.Root placeholder="Title" {...register('title')}></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field}></SimpleMDE>}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue{isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default newIssuePage
