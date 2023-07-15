Run Python script python3 -m http.server in order to see a preview of the project.

# Milestone-Project-2

Github Repo Link [Milestone Project 2](https://github.com/T-KibCode/Milestone-Project-2)

# Introduction
This project is the second one I've undertaken as part of the Full Stack Software Diploma course at [Codeinstitute.net](https://www.CodeInstitute.net).

This Project is going to be to create a 2-Player 2D fighting game similar to street fighter from the pre 2001 era and back, harkening back to these old school games. This was done as a passion project that the younger version of me would have been proud of.

I also designed so that if two friends wanted to play a quick match with, they could have a quick session playing the game before getting on with any other tasks. 

I believe that two dimensional fighting games encourage reactive and critical thinking within players.

This is because within the parameters of this particular gaming medium, we find ourselves trying to read our opponenets habits, and in turn, predictiing their movements so that we can gain an advantage within the match, whether that be in moving to dodge their movesset, or making false moves in order to lay a trap for an opponents that is trying to read us as the player!

# User Experience/User Interface (UX/UI)

<details>
  
  <summary>User Experience/User Interface (UX/UI)</summary>
  
  ### User Stories
  
  ##### First Time Visitor Goals
  As a first time visitor I want:  
  - the control inputs for the game to be clear.  
  - to be immidately engaged and inherently understand what the game is trying to acheive.  
  - the game to function correctly and gameplay to be intuitive.  
  - to be able to play the game on various compatiable different devices in line with the game design.  
  
  ##### Return/frequent Visitor Goals.
  As a return/frequent visitor I want:  
  - to play with friends in a couch co-op setup similar to the older arcade games in order to have that rapport with the opponent within the room. 
  
  ##### Website's Owner Goals.
  As the developer I want:
  - to provide a fun game.
  - to provide a game to stimulate mental function.
  - to encourage continued use of the game.


#### Colour Scheme 
Due to having some free assets that I aqquired online from website [https://itch.io/](https://itch.io/),  I had a clear colour pallette style within the canvas window that I wanted to be the main focus with a combination of Blue, Pinks, soft Reds and other colors in the Pastel style.

[/assets/colorpallete.png]

With this in mind, the background colour was going to be fairly static in theme with this and I ended up on a pastel pink background color With the game instructions placed above the canvas with the prompt of clicking into the canvas window to load the game. 

##### Wireframes
  Unfortuntely in this case, I cannot produce a wireframe due to a last minute pivot on my project in this case. 
  I've had to take this as a hard lesson in why having a strict intial plan will pay off in the length of the project as this will undoubtedly lose me marks.
  However in the self reflection of the project, I believe it is nessercary to show the growth and personal accountability that I need when moving forward in this field, even more so with the projects and work ahead. 



</details> 

<details>
##### Features

 
  <summary>Features</summary>
  
  ### Responsive  Website
  The website is only set to appear and work on a laptop, or desktop device. And as such, due to the design of the game and my limited knowledge whist creating the game, a conscience decision was made to design the game to only load on devices of this kind. This is due to the game being a two player game required to end User's to play the game against eachother. 

  When an Attempt is made to try and access the game from a Mobile or Tablet device , the website will look at the view port and ask that the player access the website from the desired device as the game may not work as intended and for the best experience, it is to be acceesed in the intended manner. 
    
    
  ### Instruction Page 
  On loading there is listed instructions above the canvas with the four button controls for both players to use ( A,W,D,Space-Bar. and ArrowLeft, ArrowUp, ArroRight, Arrow Down Respectively.)
    
    
  ### Timer
  The timer in the game runs within a loop that checks to determine whether either players health has reduced in to zero therefore stopping the timer, or checks the health of both players at the end of the match to determine who posses mmore health and will then declare this person the victor. 
    
   
    
  ### Victory message
  When a player fufills one of the win conditions of the game a victory message will appear declaring that player the victor whetehr that be at the end of the timer or a unanimous victory before the timer has run down. 

  In the event that the players Health bar matches, it will be declared a draw once the timer has run down to zero.

  
  ### Possible Future Features
  It was my original intent to Allow the game to use an opaque overlay in order to be able to play the devce on mobile devices. 

  However during the design process, it became very quickly apprant that allowing the website in a mobile or tablet function would be extremely difficult due to having to map a button overlay on top, and as I had originally designed the game to be playable by two human players without a CPU controlled enemy, I was unfortunately unable to integrate a method to do this over mobile/tablet devices due to not having designed a CPU based opponent in the code. 

  Due to a lack of time, this was not a function that I was able to integrate at this moment in time, however I do plan to revisit this once the course has been completed to be able to design a very basic CPU opponent within the game function and allow players to be able to have a choice between a second player or a CPU opponent. 

  Ideally, being able to reproduce this game within an app format with an Overlay of controls would allow for us to expand and allow for network play, whether that be remote or using the internet respectively. This would provide the option to expand the project in order to play with multiple friends using multiple devices.

  However, this would require creating a backend system, and having server space in order to accomedate the use of the game, whilst also having space to introduce new features, such as user accounts, top scores and options to save certain user settings such as toggling HUD UI options as an exmaple. 
  
  </details>    

# Technologies Used
<details>
  <summary>Technologies Used</summary>
  
  #### Languages Used
  
  - HTML5
  - CSS
  - Javascript

#### Applications Used

 - [GitHub](https://github.com/) GitHub is used to store the projects code.
 - [Chrome Developer Tools](https://developer.chrome.com/docs/devtools/) used for layout and responsive testing.
 - [W3 Validator](https://jigsaw.w3.org/css-validator/) used to test html and css code.
 - [Jshint](https://jshint.com/) used to validate Javascript code.
 
#### Sprite Assets 

 - [Itch.io](https://itch.io/) Itch.IO used for getting free to use free lisence sprite assets created by users. 

</details>  

# Deployment
  <details>
    
  <summary>Deployment</summary>
  
  This project was built on the Gitpod IDE using the Code Institute template found here:<br>https://github.com/Code-Institute-Org/gitpod-full-template

  I have attempted to deploy this project to github pages, but unfortuntely, it has not been recognised with the Jeykll system built into Github pages and therefore will not deploy. 

  However if the folling script is run "Run Python script python3 -m http.server" in order to see a preview of the project, you will be able to access the game in its current form.

 #### Automated Testing
  I did not have the expertise to use a unit-testing framework such as Jasmine or Jest.   

#### Main takeaways

In performing this project I have realised that a strong system in the intial concept phase is needed to bring all idea's to fruition in a reasonable time frame and capacity. 
with that being said, I am now looking ahead to the next project in order to plan and deliver my wireframes for the project this week so I can start to implement the knowledge of studying python for backend use as soon as possible prior to the April 28th project deadline. 

This has been a harsh lesson for me to learn in this course, but balancing both the expected delivery of this project and the increasing workload/knowledge base nessercary to be a fullstack developer has really hit home during this process, and irrespective of personal commitments, I hope to look back on this project as a catiounary tale to my futureself about planning, due dilligence, and ensuring that following systematic steps in the future, will allow me to show the nesscary skills that are needed/expected in this industry. 


#### Specal Thanks

I would like to thank my Tutor Mohamed for allowing an extension on my work due to a technical issue with Github in my repository, and allowing me the time to go back and recreate my work which I had lost in this instance whilst balancing some personal affairs in the process.

I would also like to thank my Mentor/Alumni from Code Institute Ronan as he made it clear to me, just how integral a great Readme file can be to code enviroment for anyone who comes afterwards to take a look to examine the work and how when working in a group setting, this key piece of documentation can be the strong foundation for a team in a wider enviroment. 

