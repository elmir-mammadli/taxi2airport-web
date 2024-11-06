export interface ChatIcon {
  icon: string;
  link: string;
  text: string;
  function?: () => void
};
export const chatIcons: ChatIcon[] = [
  {
    icon: 'logos:whatsapp-icon',
    link: 'https://wa.me/420773150831',
    text: 'Whatsapp'

  },
  {
    icon: 'logos:telegram',
    link: 'https://t.me/+420773150831',
    text: 'Telegram'
  }
]
