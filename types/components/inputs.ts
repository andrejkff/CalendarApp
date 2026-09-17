export interface IGenericInputProps {
  onValueChange: (newValue: string) => void,
  onValidityChange: (valid: boolean) => void,
  label?: string;
}

export interface IGenericCalendarInputProps {
  onSelected: (value: number) => void,
}
