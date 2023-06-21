import NodeRSA from "node-rsa";
import {encrypt} from "../../custom_config.json";
const privatekey = encrypt.privatekey;

const decrypt = (data: string): string => {
    
    const prikey = new NodeRSA(privatekey, 'pkcs8-private-pem');
    prikey.setOptions({
        encryptionScheme: "pkcs1"
    })
    return prikey.decrypt(Buffer.from(data, 'base64'), 'utf8');
}   

export default {
    decrypt
}