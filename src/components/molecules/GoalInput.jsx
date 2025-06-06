import React from 'react'
      import Label from '@/components/atoms/Label'
      import Input from '@/components/atoms/Input'
      import Select from '@/components/atoms/Select'

      const GoalInput = ({ label, type, value, onChange, placeholder, options, min, step, required = false }) => {
        return (
          <div>
            <Label>{label}</Label>
            {type === 'select' ? (
              <Select value={value} onChange={onChange} options={options} required={required} />
            ) : (
              <Input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                step={step}
                required={required}
              />
            )}
          </div>
        )
      }

      export default GoalInput