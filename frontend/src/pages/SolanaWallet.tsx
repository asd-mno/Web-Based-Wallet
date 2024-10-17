
import { KeysGen } from "@/helpers/Keys";
import { Button } from "@/components/ui/button";

interface SolanaWalletProps {
    mnemonic: string; // Define the expected type for the mnemonic prop
    publicKeys: string[];
    privateKeys: string[];
    setPublicKeys: React.Dispatch<React.SetStateAction<string[]>>;
    setPrivateKeys: React.Dispatch<React.SetStateAction<string[]>>;
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function SolanaWallet({ mnemonic,
    publicKeys,
    privateKeys,
    setPublicKeys,
    setPrivateKeys,
    currentIndex,
    setCurrentIndex, }: SolanaWalletProps) {
   

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
