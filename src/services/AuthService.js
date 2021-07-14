import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');

const createUserInDB = (uid, email, username, picture) =>
  new Promise((resolve, reject) => {
    usersCollection
      .doc(uid)
      .set({
        email,
        username,
        fullName: username,
        profilePicture: picture,
        friends: [],
      })
      .then(res => resolve(true))
      .catch(e => reject(e));
  });

export class AuthService {
  static getOwnUid = () => auth().currentUser.uid;

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
  static sendPasswordResetEmail(email) {
    return new Promise((resolve, reject) => {
      auth()
        .sendPasswordResetEmail(email, {
          url: 'https://oneupworkoutapp.page.link/confirmcode',
          handleCodeInApp: true,
          android: {
            installApp: true,
            packageName: 'com.oneup',
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
