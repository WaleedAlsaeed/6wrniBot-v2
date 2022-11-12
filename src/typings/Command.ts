import { 
    CommandInteractionOptionResolver,
    ChatInputApplicationCommandData,
    PermissionResolvable,
    GuildMember,
    AutocompleteInteraction, 
    ChatInputCommandInteraction
} from 'discord.js';
import { ExtendedClient } from "../structures/Client";


export interface ExtendedInteraction extends ChatInputCommandInteraction {
    member: GuildMember
}

interface RunOptions {
    client: ExtendedClient,
    interaction: ExtendedInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermisstions?: PermissionResolvable[];
    run: RunFunction;
    autocomplete?: (interaction: AutocompleteInteraction, client: ExtendedClient) => {},
    onlyInCommandChannel: boolean
} & ChatInputApplicationCommandData