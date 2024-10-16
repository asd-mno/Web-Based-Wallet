import { createContext, ReactNode, useState } from 'react';


interface KeysContextType {
    publicKey: Array<string>;
    privateKey: Array<string>;
    setPublicKey: React.Dispatch<React.SetStateAction<Array<string>>>;
    setPrivateKey: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export const KeysContext = createContext<KeysContextType>({
    publicKey: [],
    privateKey: [],
    setPublicKey: () => {},
    setPrivateKey: () => {},
});

export const KeysProvider = ({ children }: { children: ReactNode }) => {
    const [publicKey, setPublicKey] = useState<Array<string>>([]);
    const [privateKey, setPrivateKey] = useState<Array<string>>([]);

    return (
        <KeysContext.Provider value={{ publicKey, privateKey, setPublicKey, setPrivateKey }}>
            {children}
        </KeysContext.Provider>
    );
};
