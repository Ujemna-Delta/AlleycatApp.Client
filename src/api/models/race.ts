export default interface Race {
    id: number;
    name: string;
    description: string;
    beginTime: Date;
    startAddress: string;
    valueModifier: number;
    isActive: boolean;
    isFreeOrder: boolean;
}