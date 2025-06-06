import React from 'react'
      import Heading from '@/components/atoms/Heading'
      import InvestmentCard from '@/components/molecules/InvestmentCard'

      const InvestmentsPage = ({ investments, formatCurrency }) => {
        return (
          <div className="space-y-6">
            <Heading level={2} className="text-2xl">Investment Portfolio</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investments.map(investment => (
                <InvestmentCard
                  key={investment.symbol}
                  investment={investment}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          </div>
        )
      }

      export default InvestmentsPage