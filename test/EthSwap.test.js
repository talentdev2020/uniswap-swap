const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('EthSwap',(accounts)=>{
    describe('Token deployment', async () =>{
        it('contract has a name', async () =>{
           let token = await Token.new()
            const name = await token.name()
            assert.equal(name, 'Elisha Token')
        })
    })

    
    describe('EthSwap deployment', async () =>{
        it('contract has a name', async () =>{
           let ethSwap = await EthSwap.new()
            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap Instant Exchange')
        })
        it('contract has tokens', async()=>{
            let token = await Token.new()
            let ethSwap = await EthSwap.new(token)
            await token.transfer(ethSwap.address,'100000000')
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), '100000000')
        })
    })
})