# Google Photos Clone
Developing a Google Photos Clone using ReactJs and Firebase

### Currenly Working on 👇 
- [ ] Deleting Album
- [x] ~Downloading Photo~
- [x] Setting up React Router
- [x] ~Uploading Images to firebase~
- [x] ~Create Album Modal~

### Technology Used
* **React** (FrontEnd)
   * **Material-UI** - For Icons and prebuilt Components (package)
   * **react-router-dom** - To manage routing between different pages(Homepage, Albumpage)
   * **Redux** - For managing Global States (State management Library)
* **Firebase** - Baas (Backend as a Service)
    * **Firestore** - NoSQL database
    * **Authentication** - Google Authentication
    * **Storage** - Cloud Storage for uploading and saving Images


### To run this on Local machine
* Clone the repo, install all the dependcies from package.json
* Create a firebase project and replace all the Project keys in **'src/firebase.js'**
* Turn on Google Authentication in your firebase authentication console
* Run app by typing `npm start`in command line