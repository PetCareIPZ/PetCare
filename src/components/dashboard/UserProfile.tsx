interface UserProfileProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    id? : string | null;
    emailAddresses?: { emailAddress: string }[];
  } | null;
}

export default function UserProfile({ user }: UserProfileProps) {
  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-semibold mb-2">Profil użytkownika</h2>
      <p><strong>Imię:</strong> {user.firstName}</p>
      <p><strong>Nazwisko:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.emailAddresses?.[0]?.emailAddress}</p>
      <p><strong>clerkId: </strong> {user.id}</p>
    </div>
  );
}
