import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.config";

const getCaptureStorageRef = (userId: string) => ref(storage, `captures/${userId}`);

export async function uploadCapture(blob: Blob, userId: string) {
    const storageRef = getCaptureStorageRef(userId);

    await uploadBytes(storageRef, blob);
}

export async function getCaptureDownloadUrl(userId: string) {
    const storageRef = getCaptureStorageRef(userId);

    return await getDownloadURL(storageRef)
}