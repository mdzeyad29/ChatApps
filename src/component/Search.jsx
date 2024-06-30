import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from "react";

export const Search = () => {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handlesearch = async () => {
    if (!currentUser) {
      setErr(true);
      console.error("User is not authenticated");
      return;
    }

    setErr(false); // Reset error state before search
    setUser(null); // Reset user state before search

    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr(true);
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handlesearch();
  };

  const handleSelect = async () => {
    if (!currentUser || !user) {
      console.error("Current user or selected user is null");
      return;
    }

    const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    console.log("Combined ID:", combineId);

    try {
      const res = await getDoc(doc(db, "chats", combineId));
      console.log("Chat doc:", res);

      if (!res.exists()) {
        console.log("Chat does not exist, creating new chat");
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        console.log("Updating userChats for currentUser");
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [`${combineId}.userInfo`]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [`${combineId}.date`]: serverTimestamp()
        });

        console.log("Updating userChats for selected user");
        await updateDoc(doc(db, "userChats", user.uid), {
          [`${combineId}.userInfo`]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [`${combineId}.date`]: serverTimestamp()
        });

      }
    } catch (err) {
      console.log("error is this ", err);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <div className='cursor-pointer'>
      <div>
        <input
          type='text'
          placeholder='find the user'
          className='w-full rounded outline-none'
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        />
      </div>
      {
        err && <span>user not found</span>
      }
      {user && (
        <div onClick={handleSelect} className='flex items-center px-1'>
          <img src={user.photoURL} alt='not available' className='object-cover w-10 h-10 bg-blue-500 rounded-full' />
          <div>
            <span className='px-1.5 text-lg'>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
