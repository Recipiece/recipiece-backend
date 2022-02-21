import { Email } from './email';

export class SharedShoppingListEmail extends Email {
  constructor(to: string, private readonly listId: string, private readonly owner: string) {
    super(to, 'Shopping List Access Granted');
  }

  public getContent(): string {
    const listUrl = `${this.generateHost()}/shopping-lists/view/${this.listId}`;
    return `
Hello! ${this.owner} has shared their shopping list with you.
You may view and make changes to the list in conjunction with them now,
until they remove your access.
The shopping list is available at
<br/><br/>
${listUrl}
<br/><br/>
and is visible in the <i>Lists Shared With You<i> section of your shopping lists
on Recipiece.
<br/><br/>
${this.generateSendoff()}
  `.trim();
  }
}
