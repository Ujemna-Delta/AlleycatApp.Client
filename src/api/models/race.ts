export default interface Race {
    id: string;
    name: string;
    description: string;
    beginTime: Date;
    startAddress: string;
    valueModifier: number;
    isActive: boolean;
    isFreeOrder: boolean;
}