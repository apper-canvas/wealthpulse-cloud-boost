import React from 'react'

      const Input = ({ type = 'text', value, onChange, placeholder, className = '', ...props }) => {
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white ${className}`}
            {...props}
          />
        )
      }

      export default Input