
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
  
  const updateHomeExpense = `UPDATE [dbo].[homeExpenses]
  SET [propertyName] = @propertyName
      ,[month] = @month
      ,[year] = @year
      ,[travel] = @travel
      ,[maintenance] = @maintenance
      ,[commission] = @commission
      ,[insurance] = @insurance
      ,[mortgageInterest] = @mortgageInterest
      ,[repairs] = @repairs
      ,[supplies] = @supplies
      ,[tax] = @tax
      ,[utilities] = @utilities
      ,[income] = @income
      ,[comment] = @comment
      ,autoInsurance = @autoInsurance
      , hydro = @hydro
      ,gas = @gas
      ,water = @water
      ,waterHeaterRental = @waterHeaterRental
      ,mobile = @mobile
      ,youtube = @youtube
      ,netflix = @netflix
      ,others = @others
      ,internet = @internet
      ,updatedOn = CURRENT_TIMESTAMP
  WHERE  id = @id`
  const insertHomeExpense = `INSERT INTO [dbo].[homeExpenses]
            ([propertyName]
            ,[month]
            ,[year]
            ,[travel]
            ,[maintenance]
            ,[commission]
            ,[insurance]
            ,[mortgageInterest]
            ,[repairs]
            ,[supplies]
            ,[tax]
            ,[utilities]
            ,[income], comment,
            autoInsurance ,
              hydro,
              gas ,
              water, 
              waterHeaterRental , 
              mobile , 
              youtube,
              netflix,
              others ,
              internet,			updatedOn)
        VALUES
            (@propertyName ,@month ,@year ,@travel,@maintenance,@commission,@insurance,
              @mortgageInterest,@repairs,@supplies,@tax,@utilities,
              @income, @comment, @autoInsurance ,
            @hydro,
            @gas ,
            @water, 
            @waterHeaterRental , 
            @mobile , 
            @youtube,
            @netflix,
            @others ,
            @internet,CURRENT_TIMESTAMP);
            SELECT  IDENT_CURRENT('homeExpenses') as id ;`;            
module.exports = {
  updateExpense: updateExpense,
  insertExpense: insertExpense,
  updateHomeExpense: updateHomeExpense,
  insertHomeExpense: insertHomeExpense,
}