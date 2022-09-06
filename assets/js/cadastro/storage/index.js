import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";
const storage = getStorage();
//Upload de imagens
txtFotoCard.addEventListener('change', (e) => {
    let file = e.target.files[0];
    let fileName = e.target.files[0].name;
    const today = new Date()
    let data = today.toISOString();
    let hj = data.replace(/\.|\:|\-/g, '');
    console.log("aqui:" + hj)
    let newName = fileName.replace('.', "-" + hj + ".")
    const storageRef = ref(storage, `images/${newName}`)
    // // .put(e.target.files[0]);
    // // 'file' comes from the Blob or File API
    // // uploadBytes(storageRef, file).then((snapshot) => {
    console.log("otro" + storageRef);
    // // });
    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg',
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    // const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('URL da img:', downloadURL);
                // // Create file metadata to update
                // const newMetadata = {

                // };
                // // Update metadata properties
                // updateMetadata(storageRef, newMetadata)
                //     .then((metadata) => {
                //         // Updated metadata for 'images/forest.jpg' is returned in the Promise
                //         console.log(metadata)
                //     }).catch((error) => {
                //         // Uh-oh, an error occurred!
                //     });
            });
        }
    );

});