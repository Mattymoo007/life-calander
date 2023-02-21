type User = {
  id: string;
  name?: string | null;
  dateBirth?: Date | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  birthDate?: Date | null;
  accounts?: Account[];
  sessions?: Session[];
};
