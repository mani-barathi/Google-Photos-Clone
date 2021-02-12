# Google Photos Clone
Developing a Google Photos Clone using ReactJs and Firebase

### Currenly Working on 👇 
- [x] ~Moving all database function to custom Hooks~
- [x] ~Deleting Album~
- [x] ~Downloading Photo~
- [x] ~Setting up React Router~
- [x] ~Uploading Images to firebase~

### Preview
<img src="./public/preview.gif" />

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


### Note
* All the functions which does the database transactions are created in a custom hook and imported into components. Check `src\hooks\useFirestore.js`
* You will have to create Indexes in firestore, as HomePage, AlbumPage uses Nested Queries to fetch data from Firestore. While running the application for first time there will be an error in console stating you to create an Index in Firestore. That Error will provide a link to create an Index in Firestore , you can click on the link and create an Index. (This Error will be solved after that particular Index is created)
* To Download Photo diretly from firebase storage in javacript as a Blob type, you have to change CORS policy in google cloud console, to know more check the below links
    * [Firebase Docs](https://firebase.google.com/docs/storage/web/download-files)
    * [StackOverFlow Answers](https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin)