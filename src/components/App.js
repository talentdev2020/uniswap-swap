import React, { Component } from 'react';
import Web3 from 'web3';
import EthSwap from '../abis/EthSwap.json';
import Token from '../abis/Token.json';
import NavBar from './NavBar';
import Main from './Main';
import './App.css';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ethBalance})
    // load token
    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if(tokenData){
    const token = new web3.eth.Contract(Token.abi, tokenData.address)
    this.setState({token})
    let tokenBalance =await token.methods.balanceOf(this.state.account).call()
    this.setState({tokenBalance})
    }else{
      window.alert('Token Contract not deployed to connected network')
    }

    // load ethswap
    const ethSwapData = EthSwap.networks[networkId]
    if(ethSwapData){
    const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
    this.setState({ethSwap})
    this.setState({ loading:false })
    }
  }

  async loadWeb3()  {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  constructor(props){
    super(props)
    this.state = {
      account:'',
      ethBalance: 0,
      token:{},
      tokenBalance:0,
      ethSwap: {},
      loading: true
    }

  }

  render() {
    let content
    if(this.state.loading){
      content = <p id="loader" className="text-center" >Loading...</p>
    }else{
      content = <Main/>
    }
    return (
      <div>
       <NavBar account= {this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                </a>
               {content}
               
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
