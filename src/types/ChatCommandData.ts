export interface ChatCommandData {
    type: string;
    name: string;
    description: string;
    role: 'admin' | 'member'
}