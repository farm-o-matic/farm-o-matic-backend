# farm-o-matic-backend Document
## Install backend server locally
1. Download and upzip the downloaded backend files into your directory.
2. Import the .sql file to your sql workbench
3. Direct to your upzipped code 
4. Install essential libaries 
   ```
   npm install 
   ```
5. Create .env 
   ```
   DATABASE_URL="mysql://root:password@localhost:3306/mydb"
   ```
6. Run following commands
   ```
   npx prisma generate
   ```
7. Start backend server
   ```
   npm start
   ```
##  These are endpoints
### Login
Method: post
Route: /user/register
Request JSON:  ```
               {
               "email": example@gmail.com,
               "password": examplePassword
               }
               ```
Response JSON: ```
               #Correct username and password
               {
               "error": false,
               "description": {
                  "existedUser": true,
                  "correctPassword": true
                }
               }
               ```
Response JSON: ```
               #Incorrect username and password
               {
               "error": true,
               "description": {
                  "existedUser": false,
                  "correctPassword": false
                }
               }
               ```
