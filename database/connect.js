// Establishing connection with the database
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, child, get, query, orderByChild, equalTo,endAt} = require("firebase/database");

const firebaseConfig = {
    apiKey: "AIzaSyA0gOvfNBq33B1ylt5NwpjT5IVzGf1pZkA",
  authDomain: "phonemartapi.firebaseapp.com",
  projectId: "phonemartapi",
  storageBucket: "phonemartapi.appspot.com",
  messagingSenderId: "700557804686",
  appId: "1:700557804686:web:ddd2e79988e17dba5db5df"
};


const app = initializeApp(firebaseConfig);


const database = getDatabase(app);


const dbRef = ref(database);

// Getting data from the database
const getdetail = async (dbRef) => {
    var val;
    let snapshot = await get(child(dbRef, "list/"));
    if (snapshot.exists()) {
        val = await snapshot.val();
        return val;
    } else {
        console.log("No data available");
        val = null;
        return val;
    }
}

const getSearchResult = async (key, val) => {
    var value;
    var idQuery;
    const dataRef = ref(database, "list/");
    let mod_key = key.charAt(0).toUpperCase() + key.slice(1);

    if(mod_key==="Brand"){
        idQuery = query(dataRef, orderByChild(mod_key), equalTo(val.charAt(0).toUpperCase() + val.slice(1)));
    }else if(mod_key==="Memory"){
        idQuery = query(dataRef, orderByChild(mod_key), equalTo(val+" GB"));
    }else if(mod_key==="Rating"){
        idQuery = query(dataRef, orderByChild(mod_key), equalTo(parseFloat(val)));
    }else if(mod_key==="Storage"){
        idQuery = query(dataRef, orderByChild(mod_key), equalTo(val+" GB"));
    }else{
        return null;
    }

    let snapshot = await get(idQuery);
    if (snapshot.exists()) {
        value = await snapshot.val();
        return Object.values(value);
    } else {
        console.log("No data available");
        value = null;
        return value;
    }
}


const getPriceFilter = async (val) => {
    const dataRef = ref(database, "list/");
    var value;
    let myQuery = query(dataRef, orderByChild("Selling Price"), endAt(parseInt(val)));

    let snapshot = await get(myQuery);
    if (snapshot.exists()) {
        value = await snapshot.val();
        return Object.values(value);
    } else {
        console.log("No data available");
        value = null;
        return value;
    }
}


module.exports = { getdetail, dbRef, getSearchResult ,getPriceFilter};
