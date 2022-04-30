# farm-o-matic-backend Document
## Install backend server locally
1. Download and upzip the downloaded backend files into your directory.
2. Import the included .sql file to your sql workbench
3. CD to the directory of your upzipped code 
4. Install essential libaries 
   ```
   npm install 
   ```
5. Create a new text file in the directory with the following content:
   ```
   DATABASE_URL="mysql://root:password@localhost:3306/mydb"
   ```
   Save the text file then rename it to ".env"
   ```
6. Run following commands
   ```
   npx prisma generate
   ```
7. Start backend server
   ```
   npm start
   ```
##  These are avaliable endpoints
### Login

Method: post

Route: /user/register

Request JSON: 
    
               {
               
               "email": example@gmail.com,
               
               "password": examplePassword
               
               }


