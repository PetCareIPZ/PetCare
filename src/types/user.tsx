export interface UserProfileProps {
  user: {
    firstName: string | null;
    lastName: string | null;
    id: string | null;
    emailAddresses: { emailAddress: string }[];
  } | null;
}