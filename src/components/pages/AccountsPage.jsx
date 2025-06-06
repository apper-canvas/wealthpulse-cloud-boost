import React from 'react'
      import Heading from '@/components/atoms/Heading'
      import AccountCard from '@/components/molecules/AccountCard'

      const AccountsPage = ({ accounts, formatCurrency }) => {
        return (
          <div className="space-y-6">
            <Heading level={2} className="text-2xl">Accounts</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map(account => (
                <AccountCard
                  key={account.id}
                  name={account.name}
                  type={account.type}
                  balance={account.balance}
                  lastSync={account.lastSync}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          </div>
        )
      }

      export default AccountsPage