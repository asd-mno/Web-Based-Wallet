import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";



function toBase64(uint8Array: Uint8Array): string {
    return btoa(String.fromCharCode(...uint8Array));
}


function pub_priKey(setPubKey :(pubKey:string) => void, setPriKey :(priKey:string) => void ) {
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toString();
    const secretKey = keypair.secretKey;

    const secretKeyBase64 = toBase64(secretKey);
    

   // console.log("Public Key:", publicKey);
   // console.log("Private Key (Secret Key):", secretKey);
   //console.log("privateKey -> ", secretKeyBase64);
   

    setPubKey(publicKey);
    setPriKey(secretKeyBase64);

    const message = new TextEncoder().encode("hello world");
    const signature = nacl.sign.detached(message, secretKey);

    const result = nacl.sign.detached.verify(
    message,
    signature,
    keypair.publicKey.toBytes(),
    );
}

export default pub_priKey