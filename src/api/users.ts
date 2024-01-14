import User from "./models/user.ts";

// const API: string = "https://alleycatapp-persistence.azurewebsites.net/api";
const API: string = "http://localhost:8000/api";

export async function getUsers(): Promise<User[]> {
    const response = await fetch(API + "/users");
    return await response.json();
}