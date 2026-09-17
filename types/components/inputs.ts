export interface IGenericInputProps {
  onValueChange: (newValue: string) => void,
  onValidityChange: (valid: boolean) => void,
}

export interface IGenericCalendarInputProps {
  onSelected: (value: number) => void,
}
