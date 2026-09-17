export interface IGenericInputProps {
  onValueChange: (newValue: string) => void,
  onValidityChange: (valid: boolean) => void,
}

export interface IGenericCalendarInputProps {
  onSelected: (value: number) => void,
  selectedYear?: number,
  selectedMonth?: number,
  selectedDay?: number,
  label?: string,
}
