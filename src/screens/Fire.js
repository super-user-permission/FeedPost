import firebase from 'firebase';

class Fire {
    constructor() {
        var firebaseConfig = {
            apiKey: "AIzaSyD663Pc4OywV7oSSTRY0-C8M8mv4I_yr2c",
            authDomain: "feedpost-77603.firebaseapp.com",
            databaseURL: "https://feedpost-77603.firebaseio.com",
            projectId: "feedpost-77603",
            storageBucket: "feedpost-77603.appspot.com",
            messagingSenderId: "260503373397",
            appId: "1:260503373397:web:d9e8e21294c517580376dc",
            measurementId: "G-K1HCNS9225"
        };
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }
    }

    addPost = async ({text, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri)

        return new Promise((res, rej) => {
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri
            })
            .then (ref => {
                res(ref);
            })
            .catch(error => {
                rej(error);
            })
        })
    }

    uploadPhoto = async uri => {
        const path = 'photos/${this.uid}/${Date.now()}.jpg'

        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase.storage().ref(path).put(file)

            upload.on("state_changed", snapshot => { }, err => {
                rej(err)
            },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );

        });
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();

export default Fire;