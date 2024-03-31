
  const updateExpense = `UPDATE [dbo].[expenses]
        SET [propertyName] = @propertyName
            ,[month] = @month
            ,[year] = @year
            ,[travel] = @travel
            ,[maintenance] = @maintenance
            ,[commission] = @commission
            ,[insurance] = @insurance
            ,[legal] = @legal
            ,[managementFee] = @managementFee
            ,[mortgageInterest] = @mortgageInterest
            ,[repairs] = @repairs
            ,[supplies] = @supplies
            ,[tax] = @tax
            ,[utilities] = @utilities
            ,[depreciation] = @depreciation
            ,[income] = @income
            ,updatedOn = CURRENT_TIMESTAMP
        WHERE  id = @id`
  const insertExpense = `INSERT INTO [dbo].[expenses]
            ([propertyName]
            ,[month]
            ,[year]
            ,[travel]
            ,[maintenance]
            ,[commission]
            ,[insurance]
            ,[legal]
            ,[managementFee]
            ,[mortgageInterest]
            ,[repairs]
            ,[supplies]
            ,[tax]
            ,[utilities]
            ,[depreciation]
            ,[income], updatedOn)
        VALUES
            (@propertyName ,@month ,@year ,@travel,@maintenance,@commission,@insurance,@legal,@managementFee,@mortgageInterest,@repairs,@supplies,@tax,@utilities,@depreciation,@income, CURRENT_TIMESTAMP);
             SELECT @propertyName as propertyName, @year as year, @month as month;`;        
module.exports = {
  updateExpense: updateExpense,
  insertExpense: insertExpense,
}