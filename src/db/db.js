import {
    doc,
    // onSnapshot,
    updateDoc,
    setDoc,
    addDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase";

// const dispPretty = (obj) => {
//     console.log(JSON.stringify(obj, null, '\t'));

// }
const playersRef = collection(db, 'players');
const votesRef = collection(db, 'votes');

// ////////// Players //////////////////////////////////////////
// Add player
export const AddplayerDB = async (data) => {
    await addDoc(playersRef, {
        ...data,
        createdAt: serverTimestamp(),
    })
        .then((res) => { })
        .catch((err) => { console.log(err) })
}

//  get all players
const emptyRating = {
    pace: 0,
    shooting: 0,
    passing: 0,
    dribbling: 0,
    defending: 0,
    physicality: 0,
    total: 0,
    vid: false
}
export const getAllPlayers = async (uid) => {
    const players = []
    const querySnapshot = await getDocs(playersRef);


    return getAllVotesUidDB(uid).then((votes) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // players.push({ ...doc.data() });
            const rating = votes.filter(vote => vote.pid === doc.id)

            if (rating.length > 0) {
                players.push({ name: doc.data().name, ...rating[0], total: 0, pid: doc.id });
            } else {
                players.push({ name: doc.data().name, ...emptyRating, pid: doc.id });
            }
        });
        return players
    }).catch((err) => { console.log(err) })
    return players;

}


//  ============== votes
// Add vote
export const AddvoteDB = async (data) => {
    await addDoc(votesRef, {
        ...data,
        createdAt: serverTimestamp(),
    })
        .then((res) => { })
        .catch((err) => { console.log(err) })
}


// get all votes by uid
export const getAllVotesUidDB = async (uid) => {
    const userVotes = []
    const q = query(votesRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        userVotes.push({ ...doc.data(), vid: doc.id });
    });
    return userVotes;
}

// update vote by vid
export const updateVoteDB = async (vId, updatedData) => {
    try {
        const voteRef = doc(votesRef, vId);
        await updateDoc(voteRef, {
            ...updatedData,
            lastUpdate: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
    }
}
