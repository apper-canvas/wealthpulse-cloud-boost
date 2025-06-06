import React from 'react'

      const Select = ({ value, onChange, options, className = '', ...props }) => {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      }

      export default Select