# Google Photos Clone

A Google Photos Clone built with ReactJs🚀 and Firebase🔥

**Click [Here](https://photos-clone.web.app/) to View the Website**

### Features

- Google Login
- Upload multiple Photos at once
- Create new Album
- Delete Photos and Albums
- Download Photos

### Preview

<img src="./public/preview.gif" />

### Technology Used

- **React** (FrontEnd)
  - **Material-UI**
  - **react-router-dom**
  - **Redux**
- **Firebase** - Baas (Backend as a Service)
  - **Firestore**
  - **Authentication** (Google Authentication)
  - **Cloud Storage**

### To run this on Local machine

- Clone the repo, and cd into it
- Install all the dependcies from package.json
- Create a firebase project and enable Google login
- Create a file **src/firebase.js** and place firebase project Keys inside as shown in [src/firebase.example.js](https://github.com/mani-barathi/Google-Photos-Clone/blob/master/src/firebase.example.js)
- Run app by typing `npm start` in command line
- Make sure to read the **Note** section below

### Note

- All the functions which does the database transactions are created in a custom hook and imported into components. Check `src\hooks\useFirestore.js`
- You will have to create **Indexes** in firestore, as HomePage, AlbumPage uses **Nested Queries** to fetch data from Firestore. While running the application for first time there will be an error in console stating you to create an Index in Firestore. That Error will provide a link to create an Index in Firestore , you can click on the link and create an Index. (This Error will be solved after that particular Index is created)
- To Download Photo diretly from firebase storage in javacript as a **Blob** type, you have to change **CORS** policy in **google cloud console**, to know more check the below links
  - [Firebase Docs](https://firebase.google.com/docs/storage/web/download-files)
  - [StackOverFlow Answers](https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin)
