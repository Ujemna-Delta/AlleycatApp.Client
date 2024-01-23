import User from "./user.ts";

export default interface Race {
    id: number;
    name: string;
    description: string;
    beginTime: Date;
    startAddress: string;
    valueModifier: number;
    isActive: boolean;
    isFreeOrder: boolean;
    leagueId: number | null;
    leagueName: string | null;
    attendeesCount: number;
    attendees: User[] | null;
}