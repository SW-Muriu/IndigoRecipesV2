# IndigoRecipesV2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

**Introduction******
Welcome to the Recipe Sharing Platform, a dynamic web application built using Angular 15 that allows users to create, share, and explore a wide variety of recipes. This platform is designed to provide an engaging and social experience for culinary enthusiasts, enabling users to share their culinary creations, follow other users, and discover new recipes.

**Features**
1. User Registration and Authentication
  - User Registration: Allows users to create an account by providing their name, email, and password.
  - Login: Secure login using registered email and password with error handling for incorrect credentials.
  - User Account Management: Users can update their account information, including contact details.

![image](https://github.com/user-attachments/assets/6d7bf7df-c966-4402-932a-8c62789cf394)


![image](https://github.com/user-attachments/assets/a78f146b-1ec4-4261-ae7a-a38f8800487f)

2. Recipe Management
  - Create New Recipes: Users can create recipes with a title, description, ingredients, preparation instructions, and optional images.
  - View Recipes: Users can browse and search for recipes, viewing details such as title, ingredients, instructions, and images.
  - Update Recipes: Users can edit their recipes, updating any aspect of it. Only the creator of a recipe can edit it.
  - Delete Recipes: Users can delete their own recipes.
  - Categorize Recipes: Users can categorize recipes by cuisine, meal type (e.g., breakfast, lunch, dinner), dietary restrictions (e.g., vegan, gluten-free), and other relevant tags.

![image](https://github.com/user-attachments/assets/4eb6c21a-87af-404c-abe8-c6fd42dc9d07)

![image](https://github.com/user-attachments/assets/4fce5f65-ff2f-4150-8584-7269038d25d4)


3. Social Features
  - Follow Users: Users can follow others whose recipes they enjoy.
  - Like & Comment: Users can like and comment on recipes to provide feedback or appreciation.
  - Share Recipes: Recipes can be shared on social media platforms or via email.
![image](https://github.com/user-attachments/assets/94fe2900-3668-4861-aeb2-01cba6e8934a)
4. User Profiles
  - Profile Management: Users can view and update personal information such as name, bio, profile picture, and view their created recipes.
5. Search and Filtering
  - Search Recipes: Users can search for recipes based on title, ingredients, cuisine, meal type, dietary restrictions, and user ratings.
  - Filter Recipes: Users can filter search results to find recipes that meet specific criteria.
6. Recipe Recommendations
  - Personalized Suggestions: The platform provides recipe recommendations based on user preferences.

![image](https://github.com/user-attachments/assets/50519ca6-d36f-4516-92e1-9a9ef1b097e6)


    
**Non-functional Requirements**
1. Accessibility and Usability
  - Keyboard Navigation: Full support for keyboard navigation.
  - Screen Reader Support: Optimized for screen readers.
  - High Contrast Mode: Optional high contrast mode for better visibility.
2. Security
  - Authentication & Authorization: Secure user authentication and authorization to protect user data.
3. Performance
  - Optimized Performance: Fast load times and smooth user experience, even with large data sets and high user traffic.
4. Responsive Design
Cross-Device Compatibility: The application is fully responsive, working seamlessly across desktops, tablets, and mobile devices.

**Technology Stack**
  Framework: Angular 16 or higher
  UI Component Library: Angular Material
  Styling: Sass
  Testing: Jest
  
**Prerequisites**
Before you begin, ensure you have met the following requirements:
  - Node.js (version 14.x or higher)
  - Angular CLI (version 15.x or higher)
  - Scss (for styling)
  - Jest (for unit testing)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
The Backend is done using java spring boot attached in a different repository. Contact me for access. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via jest. 
The test coverage is 97%, with unit test and integration test done using jest unit testing. 

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
#This is the second version. An update of the previous Indigo Recipes Application, implemented using angular 17, and its new attributes
