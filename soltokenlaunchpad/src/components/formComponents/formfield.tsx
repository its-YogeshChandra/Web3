
interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  helperText?: string
  children: React.ReactNode
}

export default function FormField({
  label,
  required,
  error,
  helperText,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block font-medium text-sm">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-error text-sm">{error}</p>}
      {!error && helperText && <p className="text-text/50 text-sm">{helperText}</p>}
    </div>
  )
}
