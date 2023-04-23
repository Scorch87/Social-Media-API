# Community Social Media API
## Description
This is an experimental API for a social media application that uses a NoSQL database. The goal was to use express.js for routing, a MongoDB database, and mongoose ODM. I've included a video demonstrating the HTTP requests that are possible through the routes that  have been constructed.
## Table of Contents:
1. [Installation Instructions](#installation)
            
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Testing Instructions](#testing)
            
5. [Questions](#questions)
6. [Licensing](#license)
<a name="installation"></a>
            
## Installation
Install express and mongoose and make sure they exist in the package.json dependencies. Run npm i. Users will need a MongoDB server run by Compass.
<a name="usage"></a>
            
## Usage
This application demonstrates the ability to create, change and remove USERS through 5 different routes:  
1. POST - Create new user
2. GET - Get all users
3. GET - Get single user by id
4. PUT - Update user information
5. DELETE - Delete a user  


These routes use both request body parameters and parameters from the API calls. Furthermore, there are two FRIEND routes that can be used to either add or remove a friend:  
 1. POST- Add a new friend
 2. DELETE - Remove a friend  


 Users can also post 'thoughts', delete thoughts, and retreive thoughts:  
 1. POST - Create new thought, this also adds the thought onto a user's array of thoughts.
 2. DELETE- Delete a thought this also removes the thought from a user's array of thoughts
 3. GET - Get all thoughts
 4. GET - Get a single thought by id search

 Lastly, Reactions can be posted off each thought, and these can be subsequently deleted as well:  
1. POST- Create a reaction- using a subdocument functionality, these are thoughts embedded within other thoughts
2. DELETE - Delete a reaction from a thought

## Usage Video: https://drive.google.com/file/d/15xoKITLN8gTCD2bxIBSBaca0NKN-2iPp/view?usp=sharing
<a name="contributing"></a>
            
## Contributing
This project is currently closed to contributions.
<a name="testing"></a>
            
## Testing
No seed file exists, users must test by crafting a seed script or by manually entering data by using the various API calls available.
<a name="questions"></a>
            
## Questions
GitHub: Scorch87
GitHub Profile: https://github.com/Scorch87
            
Email: pruneda.eli@gmail.com
<a name="license"></a>
            
## License Information
