'use client'

import { Checkbox } from 'car-robots-library'
import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & ComponentPropsWithoutRef<typeof Checkbox>

export const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    name,
  })

  return (
    <Checkbox
      checked={value}
      onCheckedChange={onChange}
      {...field}
      {...props}
    />
  )
}
