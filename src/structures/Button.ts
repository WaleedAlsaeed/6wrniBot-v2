import { ButtonInteraction } from "discord.js";

export class RoleButton {
    constructor(
        public name: string,
        public run: (interaction: ButtonInteraction) => any
    ) { }
}