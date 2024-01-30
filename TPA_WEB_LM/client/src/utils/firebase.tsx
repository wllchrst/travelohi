
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../settings/firebase-config';

export class FirebaseUtil {
    static async PostImage(file : File){
        const imageRef = ref(storage, "images/" + file.name)
        await uploadBytes(imageRef, file)
        const url = await getDownloadURL(imageRef)
        return url
    }
}
