export type ChatRole = 'user' | 'model';

export class ChatHistoryItemDto {
  role!: ChatRole;
  content!: string;
}

export class ChatRequestDto {
  message!: string;
  history?: ChatHistoryItemDto[];
}

export class ChatResponseDto {
  reply!: string;
}
