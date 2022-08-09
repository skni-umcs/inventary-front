interface TokenType {
    id?: number;
    name: string;
    token?: string;
    usage?: number;
    quota: number;
}

export default TokenType;