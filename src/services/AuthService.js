import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import data from '../data';
import storage from '@react-native-firebase/storage';
const usersCollection = firestore().collection('Users');

const createUserInDB = (uid, email, username) =>
  new Promise((resolve, reject) => {
    usersCollection
      .doc(uid)
      .set({
        email,
        username,
        name: username,
        freePoints: 10,
        paidPoints: 0,
        games: [],
        clicks: 0,
        gamesWon: 0,
      })
      .then(res => resolve(true))
      .catch(e => reject(e));
  });

export default class AuthService {
  static getOwnUid = () => auth().currentUser.uid;

  static getUserObj = () =>
    new Promise(resolve => {
      usersCollection
        .doc(AuthService.getOwnUid())
        .get()
        .then(doc => resolve(data.getDataFromFirebaseDoc(doc)))
        .catch(e => {
          console.log(e);
          resolve(false);
        });
    });

  static updateUser = ({name, profilePicture}) =>
    new Promise(resolve => {
      const updateObj = {};
      if (name) {
        updateObj.name = name;
        updateObj.username = name;
      }
      if (profilePicture) {
        updateObj.profilePicture = profilePicture;
      }
      usersCollection
        .doc(AuthService.getOwnUid())
        .update(updateObj)
        .then(() => resolve(true))
        .catch(e => resolve(false));
    });

  static updateProfilePicture = profilePicture =>
    new Promise(resolve => {
      const path = `ProfileImages/${this.getOwnUid()}`;
      storage()
        .ref(path)
        .putFile(profilePicture)
        .then(() => storage().ref(path).getDownloadURL())
        .then(async url => {
          const res = await this.updateUser({profilePicture: url});
          if (res) return resolve(url);
          else resolve(false);
        })
        .catch(e => {
          console.log(e);
          resolve(false);
        });
    });

  static login(email, password) {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => resolve(user))
        .catch(e => reject(e.code));
    });
  }

  static signup(email, password, username) {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res =>
          createUserInDB(res.user.uid, email, username)
            .then(() => resolve(true))
            .catch(e => reject(e.code)),
        )
        .catch(e => reject(e.code));
    });
  }
  static logout() {
    return new Promise((resolve, reject) => {
      auth()
        .signOut()
        .then(e => resolve(true))
        .catch(e => reject(e.code));
    });
  }

  /**TODO: set up password reset here */
  static sendPasswordResetEmail(email) {
    return new Promise((resolve, reject) => {
      auth()
        .sendPasswordResetEmail(email, {
          url: 'https://oneupworkoutapp.page.link/confirmcode',
          handleCodeInApp: true,
          android: {
            installApp: true,
            packageName: 'com.onebutton',
          },
          iOS: {bundleId: 'TODO: add bundleId here'},
        })
        .then(e => resolve(true))
        .catch(e => reject(e.code));
    });
  }

  static confirmPasswordReset(code, newPassword) {
    return new Promise((resolve, reject) => {
      auth()
        .confirmPasswordReset(code, newPassword)
        .then(e => resolve(true))
        .catch(e => reject(e.code));
    });
  }

  static verifyPasswordResetCode(code) {
    return new Promise((resolve, reject) => {
      auth()
        .verifyPasswordResetCode(code)
        .then(e => resolve(true))
        .catch(e => reject(e.code));
    });
  }

  static updatePassword(currentPassword, newPassword) {
    return new Promise((resolve, reject) => {
      const credential = auth.EmailAuthProvider.credential(
        auth().currentUser.email,
        currentPassword,
      );
      auth()
        .currentUser.reauthenticateWithCredential(credential)
        .then(res => {
          auth()
            .currentUser.updatePassword(newPassword)
            .then(e => resolve(true))
            .catch(e => reject(e.code));
          resolve(true);
        })
        .catch(e => reject(e.code));
    });
  }

  static getUser = () => auth().currentUser;
}
