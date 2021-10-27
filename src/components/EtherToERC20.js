import React, {Component} from 'react';
import { Button, Form, FormControl,InputGroup } from 'react-bootstrap';
import Web3 from 'web3';
import {tokenABI} from './config' 


const web3                 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'));
// const ownerAddress         = '0x91FE1B041d156567E456a6F85Ad78502aF9CdF81'
// const ownerPrivateKey      = ''

// const tokenAddress         = '0xAB5855380fAC38B1Efc8ee7DDb55D2796e9Ca69e'



class EtherToERC20 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renterAddress    : '',
            rentTime         : 0,
            rentAmount       : 0,
            rentStartTime    : 0,
            rentEndTime      : 0,
            label            : '',
            currentTime      : '',
			ownerAddress     : '',
			tokenAddress     : '',
			ownerPrivateKey  : ''
        }
    }

    async rent(){

        const interval = setInterval(() => {
            this.setState({
                currentTime : Date(),
            })
        }, 1000);

        this.setState({
            label       : 'start to rent token...'
        })

		const tokenContract        = new web3.eth.Contract(tokenABI, this.state.tokenAddress)

        if(this.state.renterAddress == ''||this.state.rentRoomNumber == ''||this.state.rentAmount == ''||this.state.rentTime == ''){
            alert("Please check input data")    
            return 
        } else {
            let tx = {
                    from : this.state.ownerAddress,
                    to   : this.state.tokenAddress,
                    data : tokenContract.methods.transfer(this.state.renterAddress, this.state.rentAmount).encodeABI(),
                    gasPrice : web3.utils.toWei('5', 'Gwei'),
                    gas      : 100000,
                    nonce    : await web3.eth.getTransactionCount(this.state.ownerAddress),
            }   
            const promise = await web3.eth.accounts.signTransaction(tx, this.state.ownerPrivateKey)
            await web3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', async() => {
                
                this.expiry(this.state.renterAddress, this.state.rentTime, this.state.rentAmount)
                
                let startDate = Math.floor(Date.now() / 1000);
                console.log(startDate)
                let endDate   = Math.floor(Date.now() / 1000 + this.state.rentTime / 1)
                console.log(endDate)
                
                let string  = "Rent Time : " +  Date()  + "______" + "Rent time : " +  this.state.rentTime + 'second'
                alert("token is rented successfully")

                this.setState({
                    rentStartTime : startDate,
                    rentEndTime   : endDate,
                    label : string 
                })
            })
        }
    }

    async expiry(renterAddress, rentTime, rentAmount){
		const tokenContract  = new web3.eth.Contract(tokenABI, this.state.tokenAddress)
		console.log("expiry")
        setTimeout( async () => {
            let tx = {
                from     : this.state.ownerAddress,
                to       : this.state.tokenAddress,
                data     : tokenContract.methods.expire(renterAddress, rentAmount).encodeABI(),
                gasPrice : web3.utils.toWei('5', 'Gwei'),
                gas      : 100000,
                nonce    : await web3.eth.getTransactionCount(this.state.ownerAddress),
            }   
            const promise = await web3.eth.accounts.signTransaction(tx, this.state.ownerPrivateKey)
            await web3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', async() => {

                alert("The token is expiried successfully")
                this.setState({
                    label : "The token is expiried successfully"
                })
            })
        }, rentTime * 1000);
    }

    async double(){

		const tokenContract  = new web3.eth.Contract(tokenABI, this.state.tokenAddress)
          let tx = { 
                        from     : this.state.ownerAddress,
                        to       : this.state.tokenAddress,
                        data     : tokenContract.methods.increse('2').encodeABI(),
                        gasPrice : web3.utils.toWei('5', 'Gwei'),
                        gas      : 100000,
                        nonce    : await web3.eth.getTransactionCount(this.state.ownerAddress),
                    }   
                    const promise = await web3.eth.accounts.signTransaction(tx, this.state.ownerPrivateKey)
                    await web3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', async() => {

                        alert("Token is minted successfully")

                    })
    }
    
    async decrease(){
		    const tokenContract  = new web3.eth.Contract(tokenABI, this.state.tokenAddress)
            let tx = {
                        from     : this.state.ownerAddress,
                        to       : this.state.tokenAddress,
                        data     : tokenContract.methods.back().encodeABI(),
                        gasPrice : web3.utils.toWei('5', 'Gwei'),
                        gas      : 100000,
                        nonce    : await web3.eth.getTransactionCount(this.state.ownerAddress),
                    }   
                    const promise = await web3.eth.accounts.signTransaction(tx, this.state.ownerPrivateKey)
                    await web3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', async() => {

                        alert("Token is burned successfully")
                        this.setState({
                            label : "Token is burned successfully"
                        })
                    })
    }
    



    render () {
        const handleRenterAddress =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              renterAddress : addLabel
            }) 
        }   

        const handleOwnerAddress =  (e) => {
            let addLabel  = e.target.value
            this.setState({
                ownerAddress : addLabel
            }) 
        }    

        const handleRentTime =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              rentTime : addLabel
            }) 
        }

        const handleRentAmount =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              rentAmount : addLabel
            }) 
        }    

        const handleOwnerPrivateKey =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              ownerPrivateKey : addLabel
            }) 
        }   

		const handleTokenAddress =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              tokenAddress : addLabel
            }) 
        }  



        return (
            <div>
                <br/><br/>
                <h2>Rent CTO TOKEN</h2>
                <Form><br/><br/>
                <h6>{this.state.currentTime}</h6>
				    <h3>Owner information</h3>
					<InputGroup className="mb-3">
                            <InputGroup.Text>owner address</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="Please input your address" onChange={handleOwnerAddress} defaultValue={this.state.ownerAddress}/>
                    </InputGroup><br/><br/>
                    <InputGroup>
                            <InputGroup.Text>owner private key</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="please input your wallet private key"                onChange={handleOwnerPrivateKey} defaultValue={this.state.ownerPrivateKey}/>
                    </InputGroup><br/><br/>
                    <InputGroup>
                            <InputGroup.Text>token Address</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="please input token address"            onChange={handleTokenAddress} defaultValue={this.state.tokenAddress}/>
                    </InputGroup><br/><br/>

					<h3>Token Rent</h3>
                    <InputGroup className="mb-3">
                            <InputGroup.Text>Renter address</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="Please input your address" onChange={handleRenterAddress} defaultValue={this.state.renterAddress}/>
                    </InputGroup><br/><br/>
                    <InputGroup>
                            <InputGroup.Text>Rent Time (second)</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="Rent time"                 onChange={handleRentTime} defaultValue={this.state.rentTime}/>
                    </InputGroup><br/><br/>
                    <InputGroup>
                            <InputGroup.Text>Rent token amount</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="Amount of token"            onChange={handleRentAmount} defaultValue={this.state.rentAmount}/>
                    </InputGroup><br/><br/>
                    <Form.Group>
                        <Button variant="primary" onClick={() => this.rent()} > Rent   </Button>
                    <h6>{this.state.label}</h6> 
                    </Form.Group><hr/>
                    <InputGroup>                            
                            <Button variant="primary" onClick={() => this.double()}  > 2X   </Button>
                    </InputGroup><br/><br/>
                    <Button variant="primary" onClick={() => this.decrease()} > back to initial value   </Button>
                </Form>
            </div>
        );

    }
}

export default EtherToERC20;