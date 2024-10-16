import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Button } from "@/components/ui/button";
import { KeysContext } from "@/context/context";

interface SolanaWalletProps {
    mnemonic: string; // Define the expected type for the mnemonic prop
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [publicKeys, setPublicKeys] = useState<string[]>([]); // State to hold public keys
    const [privateKeys, setPrivateKeys] = useState<string[]>([]);

    const addWallet = () => {
        if (!mnemonic) return; // Ensure mnemonic is defined

        const seed = mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        const phantomPrivateKey = bs58.encode(secret);

        setPublicKeys((prevKeys) => [...prevKeys, keypair.publicKey.toBase58()]); // Store public key as string
        setPrivateKeys((prevKeys) => [...prevKeys, phantomPrivateKey]); // Store private key
        setCurrentIndex((prevIndex) => prevIndex + 1); // Increment the current index
    };

    return (
        <KeysContext.Provider value={{ publicKey: publicKeys, privateKey: privateKeys, setPublicKey: setPublicKeys, setPrivateKey: setPrivateKeys }}>
            <div>
                <Button onClick={addWallet}>
                    Add Wallet
                </Button>
                {publicKeys.map((p, index) => (
                    <div key={index}>
                        {"Public Key -> " + p}
                    </div>
                ))}
                {privateKeys.map((p, index) => (
                    <div key={index}>
                        {"Private Key -> " + p}
                    </div>
                ))}
            </div>
        </KeysContext.Provider>
    );
}
