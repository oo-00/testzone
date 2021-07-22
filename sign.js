var Web3 = require('web3');
var web3 = new Web3();
const { getMessage } = require('eip-712');

typedData = {
  "types": {
    "EIP712Domain": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "version",
        "type": "string"
      }
    ],
    "Vote": [
        {
            "name": "from",
            "type": "address"
        },
        {
            "name": "space",
            "type": "string"
        },
        {
            "name": "timestamp",
            "type": "uint64"
        },
        {
            "name": "proposal",
            "type": "string"
        },
        {
            "name": "choice",
            "type": "uint32"
        },
        {
            "name": "metadata",
            "type": "string"
        }
    ]
  },
  "primaryType": "Vote",
  "domain": {
      "name": "snapshot",
      "version": "0.1.4"
  },
  "message": {
      "space": "weenus",
      "proposal": "QmNZwbCbQoFghhWfzGHeXVimmh4kTNJNCDjZDym4yQTaGV",
      "choice": 1,
      "metadata": "{}",
      "from": "0x67D0656CEd89095Ba2A01a97601497795B9eC8FA",
      "timestamp": 1626953154
  }
}

function signMsg(msgParams, from) {
  web3.currentProvider.sendAsync({
    method: 'eth_signTypedData',
    params: [msgParams, from],
    from: from,
  }, function (err, result) {
    if (err) return console.error(err)
    if (result.error) {
      return console.error(result.error.message)
    }
    const recovered = sigUtil.recoverTypedSignature({
      data: msgParams,
      sig: result.result
    })
    if (recovered === from ) {
      alert('Recovered signer: ' + from)
    } else {
      alert('Failed to verify signer, got: ' + result)
    }
  })
}


var msg = getMessage(typedData).toString('hex');
console.log(msg);

var sign = web3.eth.accounts.sign(msg, '<redacted key>');

console.log(sign);
