import type { User } from "$lib/types/authType";
import { writable } from "svelte/store";

export const userStore = writable<User | null>(null);