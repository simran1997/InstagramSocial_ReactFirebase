import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { storage, db } from './Firebase'
import firebase from 'firebase';
import './ImageUpload.css'

function ImageUpload({username}) {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)


    const handleFile = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        //for progress bar
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100                
                )
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {
                //complete function, i.e, what to do after successful upload
            storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                //post image or complete post to db
                db.collection('posts').add(
                    {timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageURL: url,
                    username: username
                }
                )
                setProgress(0)
                setCaption('')
                setImage(null)
            })
            }
            
        )
    }

    return (
        <div className="imageUpload">
            <progress className="imageUpload__progress" value={progress} max="100"/>
            <input type="text" placeholder="Enter caption.."  value={caption} onChange={(event) => setCaption(event.target.value)}/>
            <input type="file" onChange={handleFile} />
            <Button disabled={!image} onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
