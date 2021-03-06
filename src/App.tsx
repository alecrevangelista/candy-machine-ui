import "./App.css";
import logo from './img/logo.png'
import twitter from './icons/twitter.svg'
import discord from './icons/discord.svg'
import menu from './icons/menu.svg'
import gif from './gif/bayc.gif'
import AOS from 'aos'
import 'aos/dist/aos.css';

import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolflareWebWallet,
  getSolletWallet,
  getSolletExtensionWallet,
  getSolongWallet,
  getLedgerWallet,
  getSafePalWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

AOS.init();

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getSolflareWebWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
      getSolongWallet(),
      getLedgerWallet(),
      getSafePalWallet(), ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button" >
          <img src="/icons/close.svg" alt="" onClick={toggleMenu}/>
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src={logo} alt="" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              Link 1
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              Link 2
            </a>
          </li>
          <li>
            <a href="/#link3" onClick={toggleMenu}>
              Link 3
            </a>
          </li>
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              Link 4
            </a>
          </li>
          <li>
            <div className="social-icons">
              <img className="nav-social" src={twitter} alt="" />
              <img className="nav-social" src={discord} alt="" />
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src={menu} alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src={logo} alt="" />
          {/* <a className="hide-800" href="/#link1">
            Link 1
          </a>
          <a className="hide-800" href="/#link2">
            Link 2
          </a>
          <a className="hide-800" href="/#link3">
            Link 3
          </a>
          <a className="hide-800" href="/#link4">
            Link 4
          </a> */}
          <div className="social-icons hide-800">
            <img className="nav-social" src={twitter} alt="" />
            <img className="nav-social" src={discord}alt="" />
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
          <header className="card" id="link1">
            <div style={{ padding: "0 24px 0 24px 0" }}>
              <h3 className="text-secondary-color">Welcome To</h3>
              {/* <h2></h2>
              <h2></h2>
              <div>
                </div> */}
              <h1 className="pb-3">CALD LABs</h1>
              {/* <p className="text-secondary-color">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                scelerisque ipsum non est porta mollis. Donec sapien sapien, dictum
                eget enim sed, hendrerit semper orci. Donec ante magna, consequat at
                eros ac, eleifend dictum sem. Nam vitae condimentum lorem.
                Vestibulum molestie dui turpis, tincidunt porta sem congue nec.
              </p> */}

              <img src={gif} alt="" />     
            </div>
            <div>
              <ThemeProvider theme={theme}>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>
                      
                        <Minter
                          candyMachineId={candyMachineId}
                          
                          connection={connection}
                          startDate={startDateSeed}
                          txTimeout={txTimeout}
                          rpcHost={rpcHost}
                        />
                      
                    </WalletDialogProvider>
                  </WalletProvider>
                </ConnectionProvider>
              </ThemeProvider>
            </div>
          </header>

          {/* <div id="link2" className="container">
            Project Summary: ............
          </div> */}

          <div data-aos="fade-right" id="link3" className="container card">
            <h1 className="pb-3">Project: ............</h1>
          </div>

          <div className="roadmap"> 
            <h3 data-aos="fade-right" className="heading-medium">Road Map</h3>

            <div data-aos="fade-left" className="container card rm">
              <h1>............</h1>
            </div>

            <div data-aos="fade-left" className="container card rm">
              <h1>............</h1>
            </div>

            <div data-aos="fade-left" className="container card rm">
              <h1>............</h1>
            </div>        
          </div> 

          <details open>
            <summary>FAQ 1</summary>
            <div className="faq__content">
              <p>Answer 1</p>
            </div>
          </details>
          <details>
            <summary>FAQ 2</summary>
            <div className="faq__content">
              <p>Answer 2</p>
            </div>
          </details>
          <details>
            <summary>FAQ 3</summary>
            <div className="faq__content">
              <p>Answer 3</p>
            </div>
          </details>

        

      </div>
    </div>
  );
};

export default App;
