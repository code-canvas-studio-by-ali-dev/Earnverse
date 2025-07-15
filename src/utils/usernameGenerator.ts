type GenerateUsernameParams = {
    email: string;
    firstName: string;
    lastName: string;
    userId: string; // UUID or some ID string
    count?: number; // optional incremental value (like 1, 10, 20, etc)
};

export function generateUsername({
    email,
    firstName,
    lastName,
    userId,
    count = 1,
}: GenerateUsernameParams): string {
    // Extract number from email or fallback
    const emailNumbers = email.match(/\d+/g);
    const emailNumberPart = emailNumbers ? emailNumbers.join("") : "8824";

    // Clean names
    const cleanFirst = firstName.trim().toLowerCase().replace(/\s+/g, "");
    const cleanLast = lastName.trim().toLowerCase().replace(/\s+/g, "");

    // Get last digit of userId
    const lastDigit = userId.replace(/\D/g, "").slice(-1) || "0";

    // Format username
    return `user_${emailNumberPart}_${cleanFirst}_${cleanLast}_${lastDigit}_${count}`;
}
