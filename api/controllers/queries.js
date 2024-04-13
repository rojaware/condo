
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
            ,[comment] = @comment
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
            ,[income], comment, updatedOn)
        VALUES
            (@propertyName ,@month ,@year ,@travel,@maintenance,@commission,@insurance,
             @legal,@managementFee,@mortgageInterest,@repairs,@supplies,@tax,@utilities,
             @depreciation,@income, @comment, CURRENT_TIMESTAMP);
            SELECT  IDENT_CURRENT('expenses') as id ;`;
module.exports = {
  updateExpense: updateExpense,
  insertExpense: insertExpense,
}