import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { Counter } from './features/counter/Counter';
//import MetaMaskSDK from '@metamask/sdk';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from "./components/Home";
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';



function App() {
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");
  const [wallet, setWallet] = useState("");



  axios.post('http://localhost:3001/',{
    msg1 : "This app is created by rgHanks",
    msg2: "Hello rgHanks, Welcome to MERN"
  })
  .then(function (response) {
    // handle success
    setMsg1(response.data.data.msg1);
    setMsg2(response.data.data.msg2);
    console.log(response.data.data.msg1);
    console.log(response.data.data.msg2);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })



  async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
      setWallet(accounts[0]);
  }
  

  const connectWallet = async()=>{
    const provider = await detectEthereumProvider();
  
    if (provider) {
      startApp(provider);
    } else {
      console.log('Please install MetaMask!');
    }
    
    function startApp(provider) {
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }
    }
  
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  
    //console.log((chainId)," chain id");
  window.ethereum.on('chainChanged', handleChainChanged);
  
  function handleChainChanged(chainId) {
    window.location.reload();
  }
  
    let currentAccount = null;
    window.ethereum.request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });
    
      window.ethereum.on('accountsChanged', handleAccountsChanged);
  
      function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
          console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== currentAccount) {
          currentAccount = accounts[0];
        }
      }
   
  
  }
  


useEffect(()=>{

getAccount();

connectWallet();

},[wallet]);


  return (
    <Router>
      
             <div className="App">

              <ul className="App-header">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/header">Header</Link>
              </li>
            </ul> 
       <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/about' element={< About />}></Route>
          <Route exact path='/contact' element={< Contact />}></Route>
          <Route exact path='/header' element={< Header state={{msg1, msg2, wallet}} />} ></Route>
        </Routes>
     

     
      </div>
      
    </Router>
  );
}

export default App;
