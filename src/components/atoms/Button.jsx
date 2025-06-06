import React from 'react'

      const Button = ({ children, onClick, className = '', type = 'button', icon: Icon, ...props }) => {
        return (
          <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl transition-all ${className}`}
            {...props}
          >
            {Icon}
            <span>{children}</span>
          </button>
        )
      }

      export default Button