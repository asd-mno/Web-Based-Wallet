import { useState } from "react";
import { KeysGen } from "@/helpers/Keys";
import { Button } from "@/components/ui/button";

interface SolanaWalletProps {
    mnemonic: string; // Define the expected type for the mnemonic prop
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [publicKeys, setPublicKeys] = useState<string[]>([]); // State to hold public keys
    const [privateKeys, setPrivateKeys] = useState<string[]>([]); // State to hold private Keys

    const addWallet = () => {
        if (!mnemonic) return;  // Ensure mnemonic is defined

       const keyPair = KeysGen({ mnemonic, currentIndex });
       if (!keyPair) return;
       const { publicKey, privateKey } = keyPair;

        setPublicKeys((prevKeys) => [...prevKeys, publicKey]); // Store public key as string
        setPrivateKeys((prevKeys) => [...prevKeys, privateKey]); // Store private key
        setCurrentIndex((prevIndex) => prevIndex + 1); // Increment the current index
    };

    return (
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
      
    );
}
